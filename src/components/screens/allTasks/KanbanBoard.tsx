"use client";

import { useState, useMemo, useCallback } from "react";
import {
  DragDropContext,
  type DropResult,
} from "@hello-pangea/dnd";
import { useQueryClient } from "@tanstack/react-query";
import {
  useKanbanTasksQuery,
  useMyKanbanTasksQuery,
  useUpdatePositionMutation,
} from "@/hooks/use-task-hook";
import { useBoardColumnsQuery } from "@/hooks/use-board-hook";
import { Task, BoardColumnConfig, KanbanResponse } from "@/lib/task/task";
import KanbanColumn from "./KanbanColumn";
import AddColumnDialog from "./AddColumnDialog";
import TaskDetailModal from "./TaskDetailModal";
import { Skeleton } from "@/components/ui/skeleton";


interface KanbanBoardProps {
  searchQuery: string;
  priorityFilter: string;
  onAddTask: (defaultStatus?: string) => void;
  members: any[];
  mode?: "org" | "personal";
  currentUserId?: string;
}

export default function KanbanBoard({
  searchQuery,
  priorityFilter,
  onAddTask,
  members,
  mode = "org",
  currentUserId,
}: KanbanBoardProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Board columns: fetch for both modes (backend supports org and individual users)
  const { data: columnsData, isLoading: columnsLoading } = useBoardColumnsQuery();

  // Use the right kanban query based on mode (only enable the relevant one)
  const orgKanban = useKanbanTasksQuery(undefined, mode === "org");
  const myKanban = useMyKanbanTasksQuery(mode === "personal");

  const kanbanData = mode === "personal" ? myKanban.data : orgKanban.data;
  const tasksLoading = mode === "personal" ? myKanban.isLoading : orgKanban.isLoading;
  const cacheKey = mode === "personal" ? ["my-kanban-tasks"] : ["kanban-tasks", undefined];

  const updatePosition = useUpdatePositionMutation();
  const queryClient = useQueryClient();

  // Always use fetched columns (backend now supports both org and individual users)
  const columns = columnsData?.columns || [];

  const isLoading = columnsLoading || tasksLoading;

  // Build a map of statusKey -> tasks[]
  const tasksByStatus = useMemo(() => {
    const map: Record<string, Task[]> = {};
    if (kanbanData?.columns) {
      for (const col of kanbanData.columns) {
        map[col._id] = col.tasks || [];
      }
    }
    return map;
  }, [kanbanData]);

  // Apply client-side filters
  const filteredTasksByStatus = useMemo(() => {
    const map: Record<string, Task[]> = {};
    for (const [status, tasks] of Object.entries(tasksByStatus)) {
      map[status] = tasks.filter((task) => {
        const matchesSearch =
          !searchQuery ||
          task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPriority =
          !priorityFilter ||
          priorityFilter === "all" ||
          task.priority === priorityFilter;
        return matchesSearch && matchesPriority;
      });
    }
    return map;
  }, [tasksByStatus, searchQuery, priorityFilter]);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) return;
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return;

      const sourceStatus = source.droppableId;
      const destStatus = destination.droppableId;

      // Get current tasks in destination column
      const destTasks = [...(filteredTasksByStatus[destStatus] || [])];
      const sourceTasks =
        sourceStatus === destStatus
          ? destTasks
          : [...(filteredTasksByStatus[sourceStatus] || [])];

      // Remove task from source
      const [movedTask] = sourceTasks.splice(source.index, 1);
      if (!movedTask) return;

      // Insert into destination
      if (sourceStatus === destStatus) {
        sourceTasks.splice(destination.index, 0, movedTask);
      } else {
        destTasks.splice(destination.index, 0, movedTask);
      }

      // Calculate new position
      const targetList =
        sourceStatus === destStatus ? sourceTasks : destTasks;
      const idx = destination.index;
      let newPosition: number;

      if (targetList.length === 1) {
        newPosition = 1000;
      } else if (idx === 0) {
        newPosition = (targetList[1]?.position || 2000) - 1000;
      } else if (idx === targetList.length - 1) {
        newPosition =
          (targetList[targetList.length - 2]?.position || 0) + 1000;
      } else {
        const above = targetList[idx - 1]?.position || 0;
        const below = targetList[idx + 1]?.position || above + 2000;
        newPosition = Math.round((above + below) / 2);
      }

      // Optimistic update
      queryClient.setQueryData(
        cacheKey,
        (old: KanbanResponse | undefined) => {
          if (!old) return old;
          const newColumns = old.columns.map((col) => {
            if (col._id === sourceStatus && sourceStatus !== destStatus) {
              return {
                ...col,
                tasks: col.tasks.filter((t) => t._id !== draggableId),
                count: col.count - 1,
              };
            }
            if (col._id === destStatus) {
              const updatedTask = {
                ...movedTask,
                status: destStatus,
                position: newPosition,
              };
              const tasks = col.tasks.filter((t) => t._id !== draggableId);
              tasks.splice(destination.index, 0, updatedTask);
              return {
                ...col,
                tasks,
                count:
                  sourceStatus === destStatus ? col.count : col.count + 1,
              };
            }
            return col;
          });

          // If destination column doesn't exist yet in data, create it
          if (!old.columns.find((c) => c._id === destStatus)) {
            newColumns.push({
              _id: destStatus,
              tasks: [
                { ...movedTask, status: destStatus, position: newPosition },
              ],
              count: 1,
            });
          }

          return { ...old, columns: newColumns };
        }
      );

      // API call
      updatePosition.mutate({
        id: draggableId,
        status: destStatus,
        position: newPosition,
      });
    },
    [filteredTasksByStatus, queryClient, updatePosition, cacheKey]
  );

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="min-w-[300px] w-[300px]">
            <Skeleton className="h-8 w-full mb-3 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-280px)]">
          {columns.map((column) => (
            <KanbanColumn
              key={column._id}
              column={column}
              tasks={filteredTasksByStatus[column.statusKey] || []}
              onCardClick={handleCardClick}
              onAddTask={onAddTask}
            />
          ))}
          <AddColumnDialog />
        </div>
      </DragDropContext>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          open={modalOpen}
          onOpenChange={(open) => {
            setModalOpen(open);
            if (!open) setSelectedTask(null);
          }}
          members={members}
          currentUserId={currentUserId}
        />
      )}
    </>
  );
}
