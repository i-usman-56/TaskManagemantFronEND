"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Task, BoardColumnConfig } from "@/lib/task/task";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  column: BoardColumnConfig;
  tasks: Task[];
  onCardClick: (task: Task) => void;
  onAddTask: (statusKey: string) => void;
}

export default function KanbanColumn({
  column,
  tasks,
  onCardClick,
  onAddTask,
}: KanbanColumnProps) {
  return (
    <div className="bg-gray-50 rounded-xl min-w-[300px] w-[300px] flex flex-col max-h-full">
      {/* Column header */}
      <div
        className="px-3 pt-3 pb-2 rounded-t-xl"
        style={{ borderTop: `3px solid ${column.color}` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-gray-700">
              {column.title}
            </h3>
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 bg-white"
            >
              {tasks.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-gray-400 hover:text-primaryBlue"
            onClick={() => onAddTask(column.statusKey)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Cards area */}
      <Droppable droppableId={column.statusKey}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto px-2 pb-2 space-y-2 min-h-[60px] transition-colors ${
              snapshot.isDraggingOver ? "bg-blue-50/50" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <KanbanCard
                key={task._id}
                task={task}
                index={index}
                onClick={() => onCardClick(task)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
