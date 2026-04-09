"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  ClipboardList,
  CheckCircle2,
  PlayCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Eye,
  ExternalLink,
  Tag,
} from "lucide-react";
import { useAdminTasksQuery } from "@/hooks/use-admin-hook";
import { Task } from "@/lib/task/task";

const statusConfig: Record<string, { label: string; color: string }> = {
  todo: { label: "To Do", color: "bg-gray-100 text-gray-800" },
  inProgress: { label: "In Progress", color: "bg-blue-100 text-blue-800" },
  Testing: { label: "Testing", color: "bg-purple-100 text-purple-800" },
  inReveiw: { label: "Review", color: "bg-orange-100 text-orange-800" },
  Completed: { label: "Completed", color: "bg-green-100 text-green-800" },
  inQueue: { label: "In Queue", color: "bg-indigo-100 text-indigo-800" },
  bugFound: { label: "Bug Found", color: "bg-red-100 text-red-800" },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  low: { label: "Low", color: "bg-green-100 text-green-800" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  high: { label: "High", color: "bg-red-100 text-red-800" },
  urgent: { label: "Urgent", color: "bg-red-200 text-red-900" },
};

export default function AdminTasksScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const limit = 15;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter, priorityFilter]);

  const { data, isLoading } = useAdminTasksQuery({
    q: debouncedSearch || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    priority: priorityFilter !== "all" ? priorityFilter : undefined,
    page: currentPage,
    limit,
  });

  const tasks = data?.tasks || [];
  const pagination = data?.pagination;
  const stats = data?.stats;
  const totalPages = pagination?.totalPages || 1;

  const getInitials = (firstName?: string, lastName?: string) =>
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "?";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
        <p className="text-gray-600 mt-1">
          Overview of all tasks across the platform
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ClipboardList className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-xs text-gray-500">Total Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <PlayCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                  <p className="text-xs text-gray-500">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
                  <p className="text-xs text-gray-500">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="Testing">Testing</SelectItem>
                <SelectItem value="inReveiw">Review</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="inQueue">In Queue</SelectItem>
                <SelectItem value="bugFound">Bug Found</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-1/5" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No tasks found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50/50">
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Task</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Priority</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Assignee</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Creator</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Due Date</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Created</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => {
                    const st = statusConfig[task.status] || { label: task.status, color: "bg-gray-100 text-gray-800" };
                    const pr = priorityConfig[task.priority] || { label: task.priority, color: "bg-gray-100 text-gray-800" };
                    const isOverdue = task.duedate && new Date(task.duedate) < new Date() && task.status !== "Completed";

                    return (
                      <tr key={task._id} className="border-b last:border-0 hover:bg-gray-50/50">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900 truncate max-w-[250px]">{task.name}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary" className={`text-[10px] ${st.color}`}>{st.label}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary" className={`text-[10px] ${pr.color}`}>{pr.label}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          {task.assignto ? (
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={task.assignto.profilePic || undefined} />
                                <AvatarFallback className="bg-primaryBlue text-white text-[8px]">
                                  {getInitials(task.assignto.firstName, task.assignto.lastName)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-600">
                                {task.assignto.firstName} {task.assignto.lastName}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-gray-600">
                            {task.createdBy?.firstName} {task.createdBy?.lastName}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {task.duedate ? (
                            <span className={`text-xs flex items-center gap-1 ${isOverdue ? "text-red-500 font-medium" : "text-gray-600"}`}>
                              <CalendarDays className="w-3 h-3" />
                              {new Date(task.duedate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs gap-1 text-primaryBlue hover:text-hoverBlue"
                            onClick={() => setSelectedTask(task)}
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, pagination?.total || 0)} of{" "}
            {pagination?.total || 0} tasks
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5) {
                if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(pageNum)}
                  className={currentPage === pageNum ? "bg-primaryBlue hover:bg-hoverBlue" : ""}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button variant="outline" size="icon" onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Task Detail Modal (read-only for admin) */}
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={(open) => { if (!open) setSelectedTask(null); }}>
          <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-y-auto p-0">
            <div className="p-6">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  {selectedTask.name}
                </DialogTitle>
              </DialogHeader>

              <div className="flex gap-6">
                {/* Left column */}
                <div className="flex-1 space-y-6 min-w-0">
                  {/* Description */}
                  <div>
                    <Label className="text-xs text-gray-500 mb-1">Description</Label>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap rounded p-2 bg-gray-50 min-h-[40px]">
                      {selectedTask.description || "No description"}
                    </p>
                  </div>

                  {/* Attachments */}
                  {(selectedTask.attachments?.length > 0 || selectedTask.image) && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedTask.image && (
                          <div className="aspect-video rounded-lg overflow-hidden border bg-gray-100">
                            <img src={selectedTask.image} alt="Task" className="w-full h-full object-cover" />
                          </div>
                        )}
                        {selectedTask.attachments?.map((url, i) => (
                          <div key={i} className="aspect-video rounded-lg overflow-hidden border bg-gray-100">
                            <img src={url} alt={`Attachment ${i + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Doc Links */}
                  {selectedTask.docLinks?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Doc Links</h4>
                      <div className="space-y-1">
                        {selectedTask.docLinks.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 text-sm text-blue-600"
                          >
                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right sidebar */}
                <div className="w-[240px] shrink-0 space-y-4">
                  {/* Status */}
                  <div>
                    <Label className="text-xs text-gray-500">Status</Label>
                    <div className="mt-1">
                      <Badge className={`${statusConfig[selectedTask.status]?.color || "bg-gray-100"}`}>
                        {statusConfig[selectedTask.status]?.label || selectedTask.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <Label className="text-xs text-gray-500">Priority</Label>
                    <div className="mt-1">
                      <Badge className={`${priorityConfig[selectedTask.priority]?.color || "bg-gray-100"}`}>
                        {priorityConfig[selectedTask.priority]?.label || selectedTask.priority}
                      </Badge>
                    </div>
                  </div>

                  {/* Assignee */}
                  <div>
                    <Label className="text-xs text-gray-500">Assignee</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={selectedTask.assignto?.profilePic || undefined} />
                        <AvatarFallback className="bg-primaryBlue text-white text-[8px]">
                          {getInitials(selectedTask.assignto?.firstName, selectedTask.assignto?.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-700">
                        {selectedTask.assignto?.firstName} {selectedTask.assignto?.lastName}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 ml-8">
                      {selectedTask.assignto?.email}
                    </p>
                  </div>

                  {/* Due Date */}
                  <div>
                    <Label className="text-xs text-gray-500">Due Date</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <CalendarDays className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${
                        selectedTask.duedate && new Date(selectedTask.duedate) < new Date() && selectedTask.status !== "Completed"
                          ? "text-red-500 font-medium" : "text-gray-700"
                      }`}>
                        {selectedTask.duedate
                          ? new Date(selectedTask.duedate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
                          : "Not set"}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  {selectedTask.tags?.length > 0 && (
                    <div>
                      <Label className="text-xs text-gray-500">Tags</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedTask.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-[10px]">
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
                        {selectedTask.createdBy?.firstName} {selectedTask.createdBy?.lastName}
                      </span>
                    </p>
                    <p className="text-gray-400">{selectedTask.createdBy?.email}</p>
                    <p>
                      {new Date(selectedTask.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
