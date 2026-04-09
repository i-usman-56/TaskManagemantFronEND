"use client";

import { useState, useRef } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  X,
  Loader,
  Upload,
  Link as LinkIcon,
  ExternalLink,
  CalendarDays,
  User,
  Tag,
} from "lucide-react";
import { useaddTaskMutation } from "@/hooks/use-task-hook";
import { useBoardColumnsQuery } from "@/hooks/use-board-hook";

const priorityOptions = [
  { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High", color: "bg-red-100 text-red-800" },
  { value: "urgent", label: "Urgent", color: "bg-red-200 text-red-900" },
];

const defaultStatusOptions = [
  { value: "todo", label: "To Do" },
  { value: "inQueue", label: "In Queue" },
  { value: "inProgress", label: "In Progress" },
  { value: "Testing", label: "Testing" },
  { value: "bugFound", label: "Bug Found" },
  { value: "inReveiw", label: "In Review" },
  { value: "Completed", label: "Completed" },
];

interface DocLinkItem {
  title: string;
  url: string;
}

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members?: any[];
  defaultStatus?: string;
  currentUserId: string;
  mode?: "org" | "personal";
}

export default function AddTaskModal({
  open,
  onOpenChange,
  members = [],
  defaultStatus = "todo",
  currentUserId,
  mode = "org",
}: AddTaskModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(defaultStatus);
  const [priority, setPriority] = useState("medium");
  const [duedate, setDuedate] = useState("");
  const [tags, setTags] = useState("");
  const [assignto, setAssignto] = useState(currentUserId);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [docLinks, setDocLinks] = useState<DocLinkItem[]>([]);
  const [showAddLink, setShowAddLink] = useState(false);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const addTaskMutation = useaddTaskMutation();
  const { data: columnsData } = useBoardColumnsQuery();
  const columns = columnsData?.columns || [];

  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus(defaultStatus);
    setPriority("medium");
    setDuedate("");
    setTags("");
    setAssignto(currentUserId);
    setAttachments([]);
    setDocLinks([]);
    setShowAddLink(false);
    setLinkTitle("");
    setLinkUrl("");
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description);
    formData.append("status", status);
    formData.append("priority", priority);
    if (duedate) formData.append("duedate", duedate);

    const tagList = tags
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];
    tagList.forEach((tag) => formData.append("tags[]", tag));

    formData.append("assignto", assignto || currentUserId);
    formData.append("createdBy", currentUserId);

    attachments.forEach((file) => {
      formData.append("attachments", file);
    });

    if (docLinks.length > 0) {
      formData.append("docLinks", JSON.stringify(docLinks));
    }

    addTaskMutation.mutate(formData, {
      onSuccess: () => {
        resetForm();
        onOpenChange(false);
      },
    });
  };

  const handleAddLink = () => {
    if (linkTitle.trim() && linkUrl.trim()) {
      setDocLinks([...docLinks, { title: linkTitle.trim(), url: linkUrl.trim() }]);
      setLinkTitle("");
      setLinkUrl("");
      setShowAddLink(false);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const removeDocLink = (index: number) => {
    setDocLinks((prev) => prev.filter((_, i) => i !== index));
  };

  // Use board columns for status if available
  const statusOpts = columns.length > 0
    ? columns.map((col) => ({ value: col.statusKey, label: col.title, color: col.color }))
    : defaultStatusOptions.map((s) => ({ ...s, color: "#e2e8f0" }));

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) resetForm(); onOpenChange(val); }}>
      <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="sr-only">Create New Task</DialogTitle>
            {/* Title input styled like the detail modal's inline edit */}
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter task title..."
              className="text-xl font-semibold border-none shadow-none px-1 -mx-1 focus-visible:ring-1 focus-visible:ring-primaryBlue placeholder:text-gray-400"
              autoFocus
            />
          </DialogHeader>

          <div className="flex gap-6">
            {/* Left column - matches TaskDetailModal */}
            <div className="flex-1 space-y-6 min-w-0">
              {/* Description */}
              <div>
                <Label className="text-xs text-gray-500 mb-1">Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description..."
                  className="min-h-[80px] text-sm"
                />
              </div>

              {/* Attachments - same header style as TaskDetailModal */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Attachments</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-7 text-xs gap-1 text-primaryBlue hover:text-hoverBlue"
                  >
                    <Upload className="h-3 w-3" />
                    Add
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      setAttachments((prev) => [
                        ...prev,
                        ...Array.from(e.target.files!),
                      ]);
                    }
                  }}
                />
                {attachments.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="relative group aspect-video rounded-lg overflow-hidden border bg-gray-100"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => removeAttachment(index)}
                            className="bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 py-3 text-center border border-dashed rounded-lg">
                    No attachments. Click Add to upload images.
                  </p>
                )}
              </div>

              {/* Doc Links - same style as TaskDetailModal */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Doc Links</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddLink(true)}
                    className="h-7 text-xs gap-1 text-primaryBlue hover:text-hoverBlue"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </Button>
                </div>
                <div className="space-y-1">
                  {docLinks.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 group px-2 py-1.5 rounded hover:bg-gray-50"
                    >
                      <ExternalLink className="h-3 w-3 text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-blue-600 truncate flex-1">
                        {link.title}
                      </span>
                      <button
                        onClick={() => removeDocLink(index)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {showAddLink && (
                    <div className="border rounded-lg p-3 space-y-2 bg-gray-50">
                      <Input
                        placeholder="Link title"
                        value={linkTitle}
                        onChange={(e) => setLinkTitle(e.target.value)}
                        className="h-8 text-sm"
                      />
                      <Input
                        placeholder="https://..."
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        className="h-8 text-sm"
                        onKeyDown={(e) => e.key === "Enter" && handleAddLink()}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleAddLink}
                          className="bg-primaryBlue hover:bg-hoverBlue h-7 text-xs"
                        >
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setShowAddLink(false);
                            setLinkTitle("");
                            setLinkUrl("");
                          }}
                          className="h-7 text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                  {docLinks.length === 0 && !showAddLink && (
                    <p className="text-xs text-gray-400 py-2">
                      No links added yet.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right sidebar - matches TaskDetailModal */}
            <div className="w-[240px] shrink-0 space-y-4">
              {/* Status */}
              <div>
                <Label className="text-xs text-gray-500">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="mt-1 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {statusOpts.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: opt.color }}
                          />
                          {opt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div>
                <Label className="text-xs text-gray-500">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="mt-1 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
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
              {mode === "org" && members.length > 0 && (
                <div>
                  <Label className="text-xs text-gray-500">Assignee</Label>
                  <Select value={assignto} onValueChange={setAssignto}>
                    <SelectTrigger className="mt-1 h-9 text-sm">
                      <SelectValue placeholder="Select assignee">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3" />
                          <span className="truncate">
                            {(() => {
                              const m = members.find((m: any) => m._id === assignto);
                              return m ? `${m.firstName} ${m.lastName}` : "Select";
                            })()}
                          </span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {members.map((member: any) => (
                        <SelectItem key={member._id} value={member._id}>
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            {member.firstName} {member.lastName}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Due Date */}
              <div>
                <Label className="text-xs text-gray-500">Due Date</Label>
                <div className="flex items-center gap-2 mt-1">
                  <CalendarDays className="w-4 h-4 text-gray-400" />
                  <Input
                    type="date"
                    value={duedate}
                    onChange={(e) => setDuedate(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label className="text-xs text-gray-500">Tags</Label>
                <Input
                  placeholder="tag1, tag2, tag3"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="mt-1 h-9 text-sm"
                />
                {tags && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {tags.split(",").map((tag, i) =>
                      tag.trim() ? (
                        <Badge key={i} variant="secondary" className="text-[10px]">
                          <Tag className="w-2 h-2 mr-0.5" />
                          {tag.trim()}
                        </Badge>
                      ) : null
                    )}
                  </div>
                )}
              </div>

              {/* Create Button */}
              <div className="pt-3 border-t">
                <Button
                  onClick={handleSubmit}
                  disabled={!name.trim() || addTaskMutation.isLoading}
                  className="w-full bg-primaryBlue hover:bg-hoverBlue gap-2"
                >
                  {addTaskMutation.isLoading && (
                    <Loader className="h-4 w-4 animate-spin" />
                  )}
                  Create Task
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
