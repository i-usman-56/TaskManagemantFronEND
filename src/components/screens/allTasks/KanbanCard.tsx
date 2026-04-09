"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, MessageSquare, Paperclip } from "lucide-react";
import { Task } from "@/lib/task/task";

const priorityConfig: Record<
  string,
  { label: string; color: string; dot: string }
> = {
  low: { label: "Low", color: "bg-green-100 text-green-800", dot: "bg-green-500" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-500" },
  high: { label: "High", color: "bg-red-100 text-red-800", dot: "bg-red-500" },
  urgent: { label: "Urgent", color: "bg-red-200 text-red-900", dot: "bg-red-600" },
};

interface KanbanCardProps {
  task: Task;
  index: number;
  onClick: () => void;
}

export default function KanbanCard({ task, index, onClick }: KanbanCardProps) {
  const priority = priorityConfig[task.priority] || priorityConfig.low;
  const isOverdue =
    task.duedate &&
    new Date(task.duedate) < new Date() &&
    task.status !== "Completed";

  const assigneeName = task.assignto
    ? `${task.assignto.firstName || ""} ${task.assignto.lastName || ""}`.trim()
    : "";
  const assigneeInitials = assigneeName
    ? assigneeName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const attachmentCount = (task.attachments?.length || 0) + (task.image ? 1 : 0);

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
        >
          <Card
            className={`p-3 cursor-grab active:cursor-grabbing border-l-4 border-l-primaryBlue hover:shadow-md transition-shadow ${
              snapshot.isDragging ? "shadow-lg rotate-2 opacity-90" : ""
            }`}
          >
            {/* Priority badge */}
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant="secondary"
                className={`text-[10px] px-1.5 py-0 ${priority.color}`}
              >
                {priority.label}
              </Badge>
              {task.tags && task.tags.length > 0 && (
                <div className="flex gap-1">
                  {task.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-primaryBlue/40"
                      title={tag}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Task title */}
            <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
              {task.name}
            </h4>

            {/* Bottom row: indicators + assignee */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                {/* Due date */}
                {task.duedate && (
                  <span
                    className={`flex items-center gap-0.5 ${
                      isOverdue ? "text-red-500 font-medium" : ""
                    }`}
                  >
                    <CalendarDays className="w-3 h-3" />
                    {new Date(task.duedate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}

                {/* Attachments */}
                {attachmentCount > 0 && (
                  <span className="flex items-center gap-0.5">
                    <Paperclip className="w-3 h-3" />
                    {attachmentCount}
                  </span>
                )}

                {/* Comments */}
                {(task.commentCount || 0) > 0 && (
                  <span className="flex items-center gap-0.5">
                    <MessageSquare className="w-3 h-3" />
                    {task.commentCount}
                  </span>
                )}
              </div>

              {/* Assignee avatar */}
              {task.assignto && (
                <Avatar className="w-6 h-6">
                  <AvatarImage src={task.assignto.profilePic || undefined} />
                  <AvatarFallback className="bg-primaryBlue text-white text-[10px]">
                    {assigneeInitials}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
