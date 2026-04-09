"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  CalendarDays,
  Trash2,
  Tag,
  User,
} from "lucide-react";
import { Task } from "@/lib/task/task";
import {
  useeditTaskMutation,
  usedeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/hooks/use-task-hook";
import { useBoardColumnsQuery } from "@/hooks/use-board-hook";
import CommentSection from "./CommentSection";
import AttachmentSection from "./AttachmentSection";
import DocLinksSection from "./DocLinksSection";

const priorityOptions = [
  { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High", color: "bg-red-100 text-red-800" },
  { value: "urgent", label: "Urgent", color: "bg-red-200 text-red-900" },
];

interface TaskDetailModalProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: any[];
  currentUserId?: string;
}

export default function TaskDetailModal({
  task,
  open,
  onOpenChange,
  members,
  currentUserId: loggedInUserId,
}: TaskDetailModalProps) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [title, setTitle] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  const editTask = useeditTaskMutation();
  const deleteTask = usedeleteTaskMutation();
  const updateStatus = useUpdateTaskMutation();
  const { data: columnsData } = useBoardColumnsQuery();

  const columns = columnsData?.columns || [];

  useEffect(() => {
    setTitle(task.name);
    setDescription(task.description);
  }, [task]);

  const currentUserId = task.createdBy?._id || "";
  const isTaskCreator = loggedInUserId ? loggedInUserId === task.createdBy?._id : true;

  const saveField = (field: string, value: string) => {
    const formData = new FormData();
    formData.append(field, value);
    editTask.mutate({ id: task._id, data: formData });
  };

  const handleTitleSave = () => {
    if (title.trim() && title !== task.name) {
      saveField("name", title.trim());
    }
    setEditingTitle(false);
  };

  const handleDescSave = () => {
    if (description !== task.description) {
      saveField("description", description);
    }
    setEditingDesc(false);
  };

  const handleStatusChange = (status: string) => {
    updateStatus.mutate({ id: task._id, status });
  };

  const handlePriorityChange = (priority: string) => {
    saveField("priority", priority);
  };

  const handleAssigneeChange = (userId: string) => {
    saveField("assignto", userId);
  };

  const handleDelete = () => {
    deleteTask.mutate(
      { id: task._id },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  const assigneeName = task.assignto
    ? `${task.assignto.firstName || ""} ${task.assignto.lastName || ""}`.trim()
    : "Unassigned";
  const assigneeInitials = assigneeName
    ? assigneeName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const isOverdue =
    task.duedate &&
    new Date(task.duedate) < new Date() &&
    task.status !== "Completed";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="sr-only">Task Details</DialogTitle>
            {/* Title */}
            {editingTitle ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => e.key === "Enter" && handleTitleSave()}
                className="text-xl font-semibold"
                autoFocus
              />
            ) : (
              <h2
                className="text-xl font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 rounded px-1 -mx-1"
                onClick={() => setEditingTitle(true)}
              >
                {task.name}
              </h2>
            )}
          </DialogHeader>

          <div className="flex gap-6">
            {/* Left column - 65% */}
            <div className="flex-1 space-y-6 min-w-0">
              {/* Description */}
              <div>
                <Label className="text-xs text-gray-500 mb-1">
                  Description
                </Label>
                {editingDesc ? (
                  <div>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[80px] text-sm"
                      autoFocus
                    />
                    <div className="flex gap-1 mt-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 text-xs"
                        onClick={() => {
                          setDescription(task.description);
                          setEditingDesc(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="h-6 text-xs bg-primaryBlue hover:bg-hoverBlue"
                        onClick={handleDescSave}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p
                    className="text-sm text-gray-700 whitespace-pre-wrap cursor-pointer hover:bg-gray-50 rounded p-2 -mx-2 min-h-[40px]"
                    onClick={() => setEditingDesc(true)}
                  >
                    {task.description || "Click to add description..."}
                  </p>
                )}
              </div>

              {/* Attachments */}
              <AttachmentSection
                taskId={task._id}
                attachments={task.attachments || []}
                image={task.image}
              />

              {/* Doc Links */}
              <DocLinksSection
                taskId={task._id}
                docLinks={task.docLinks || []}
              />

              {/* Comments */}
              <CommentSection
                taskId={task._id}
                currentUserId={currentUserId}
              />
            </div>

            {/* Right sidebar - 35% */}
            <div className="w-[240px] shrink-0 space-y-4">
              {/* Status */}
              <div>
                <Label className="text-xs text-gray-500">Status</Label>
                <Select
                  value={task.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="mt-1 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map((col) => (
                      <SelectItem key={col.statusKey} value={col.statusKey}>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: col.color }}
                          />
                          {col.title}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div>
                <Label className="text-xs text-gray-500">Priority</Label>
                <Select
                  value={task.priority}
                  onValueChange={handlePriorityChange}
                >
                  <SelectTrigger className="mt-1 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <Badge
                          variant="secondary"
                          className={`${opt.color} text-[10px]`}
                        >
                          {opt.label}
                        </Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Assignee */}
              <div>
                <Label className="text-xs text-gray-500">Assignee</Label>
                {isTaskCreator ? (
                  <Select
                    value={task.assignto?._id || ""}
                    onValueChange={handleAssigneeChange}
                  >
                    <SelectTrigger className="mt-1 h-9 text-sm">
                      <SelectValue placeholder="Select assignee">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-5 h-5">
                            <AvatarImage
                              src={task.assignto?.profilePic || undefined}
                            />
                            <AvatarFallback className="bg-primaryBlue text-white text-[8px]">
                              {assigneeInitials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate">{assigneeName}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((member: any) => {
                        const m = member.userid || member;
                        return (
                          <SelectItem key={m._id} value={m._id}>
                            <div className="flex items-center gap-2">
                              <User className="w-3 h-3" />
                              {m.firstName} {m.lastName}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center gap-2 mt-1 h-9 px-3 rounded-md border bg-gray-50">
                    <Avatar className="w-5 h-5">
                      <AvatarImage
                        src={task.assignto?.profilePic || undefined}
                      />
                      <AvatarFallback className="bg-primaryBlue text-white text-[8px]">
                        {assigneeInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm truncate">{assigneeName}</span>
                  </div>
                )}
              </div>

              {/* Due Date */}
              <div>
                <Label className="text-xs text-gray-500">Due Date</Label>
                <div className="flex items-center gap-2 mt-1">
                  <CalendarDays className="w-4 h-4 text-gray-400" />
                  <Input
                    type="date"
                    defaultValue={
                      task.duedate
                        ? new Date(task.duedate).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => saveField("duedate", e.target.value)}
                    className={`h-9 text-sm ${isOverdue ? "text-red-500" : ""}`}
                  />
                </div>
              </div>

              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <div>
                  <Label className="text-xs text-gray-500">Tags</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {task.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        <Tag className="w-2 h-2 mr-0.5" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Created info */}
              <div className="pt-2 border-t text-xs text-gray-400 space-y-1">
                <p>
                  Created by{" "}
                  <span className="text-gray-600">
                    {task.createdBy?.firstName} {task.createdBy?.lastName}
                  </span>
                </p>
                <p>
                  {new Date(task.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Delete */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 mt-2"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete Task
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Task</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete &quot;{task.name}&quot;?
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
