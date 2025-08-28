"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Skeleton } from "@/components/ui/skeleton";

import {
  CalendarDays,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  PlayCircle,
  TestTube,
  Eye,
  User,
  ChevronLeft,
  ChevronRight,
  Loader,
  Edit,
  Trash2,
  Calendar,
  Star,
  Tag,
  View,
} from "lucide-react";
import {
  useaddTaskMutation,
  useAllTaskUserQuery,
  usedeleteTaskMutation,
  useeditTaskMutation,
  useUpdateTaskMutation,
} from "@/hooks/use-task-hook";
import { Task, TaskQueryParams } from "@/lib/task/task";
import {
  useAccountTypeQuery,
  useUserInfoQuery,
} from "@/hooks/use-auth-mutations";
import { useOrganizationMembersQuery } from "@/hooks/use-member-query";
import toast from "react-hot-toast";

const statusConfig = {
  todo: { label: "To Do", color: "bg-gray-100 text-gray-800", icon: Circle },
  InProgress: {
    label: "In Progress",
    color: "bg-blue-100 text-blue-800",
    icon: PlayCircle,
  },
  Testing: {
    label: "Testing",
    color: "bg-purple-100 text-purple-800",
    icon: TestTube,
  },
  inReveiw: {
    label: "Review",
    color: "bg-orange-100 text-orange-800",
    icon: Eye,
  },
  Completed: {
    label: "Completed",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle2,
  },
  inQueue: {
    label: "In Queue",
    color: "bg-indigo-100 text-indigo-800",
    icon: Circle,
  },
  bugFound: {
    label: "Bug Found",
    color: "bg-red-100 text-red-800",
    icon: Circle,
  },
};

const priorityConfig = {
  low: { label: "Low", color: "bg-green-100 text-green-800", icon: "🟢" },
  medium: {
    label: "Medium",
    color: "bg-yellow-100 text-yellow-800",
    icon: "🟡",
  },
  high: { label: "High", color: "bg-red-100 text-red-800", icon: "🔴" },
  urgent: {
    label: "Urgent",
    color: "bg-red-200 text-red-900 font-semibold",
    icon: "🔥",
  },
};

//  Skeleton Card Component
function TaskCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-14" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MyTaskScreen() {
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(9);

  // Debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Mutations
  const addTaskMutation = useaddTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const editTaskMutation = useeditTaskMutation();
  const deleteTaskMutation = usedeleteTaskMutation();

  // Sheet states
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isViewSheetOpen, setIsViewSheetOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewTask, setViewTask] = useState<Task | null>(null);

  // New task form state
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    status: "todo" as const,
    priority: "medium" as const,
    duedate: "",
    tags: "",
    image: null as File | null,
    assignto: "",
    createdBy: "",
  });

  // Account and organization data
  const { data: accountData } = useAccountTypeQuery();
  const { data: userData } = useUserInfoQuery();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Build query parameters for API call
  const queryParams: TaskQueryParams = {
    q: debouncedSearchTerm || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    priority: priorityFilter !== "all" ? priorityFilter : undefined,
    page: currentPage,
    limit: pageLimit,
  };

  // Fetch data with dynamic filters
  const {
    data: userTaskData,
    isLoading,
    isFetching,
    refetch,
  } = useAllTaskUserQuery(queryParams);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, statusFilter, priorityFilter]);

  // // Refetch when query params change
  // useEffect(() => {
  //   refetch();
  // }, [queryParams, refetch]);

  const handleAddTask = async () => {
    const taskData = {
      name: newTask.name,
      description: newTask.description,
      image: newTask.image,
      status: newTask.status,
      duedate: newTask.duedate,
      tags: newTask.tags
        ? newTask.tags.split(",").map((tag) => tag.trim())
        : [],
      assignto: userData?.user._id || "",
      createdBy: userData?.user._id || "",
      priority: newTask.priority,
    };

    addTaskMutation.mutate(taskData, {
      onSuccess: () => {
        setNewTask({
          name: "",
          description: "",
          status: "todo",
          priority: "medium",
          duedate: "",
          tags: "",
          image: null,
          assignto: "",
          createdBy: "",
        });
        setIsAddSheetOpen(false);
      },
    });
  };
  const priorityColors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-orange-100 text-orange-800",
    high: "bg-red-100 text-red-800",
    urgent: "bg-purple-100 text-purple-800",
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    // Format date for input field (YYYY-MM-DD)
    const formattedDate = task.duedate
      ? new Date(task.duedate).toISOString().split("T")[0]
      : "";

    setNewTask({
      name: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
      duedate: formattedDate,
      tags: Array.isArray(task.tags) ? task.tags.join(", ") : "",
      image: null,
      assignto: task.assignto._id,
      createdBy: task.createdBy._id,
    });
    setIsEditSheetOpen(true);
  };
  const handleViewTask = (task: Task) => {
    setViewTask(task);
    setIsViewSheetOpen(true);
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    // Prepare form data
    const tags = newTask.tags
      ? newTask.tags.split(",").map((tag) => tag.trim())
      : [];

    const formData = new FormData();
    formData.append("name", newTask.name);
    formData.append("description", newTask.description);
    formData.append("status", newTask.status);
    formData.append("priority", newTask.priority);
    formData.append("duedate", newTask.duedate);
    // Append tags one by one
    tags.forEach((tag) => {
      formData.append("tags[]", tag); // 👈 use `tags[]`
    });

    if (newTask.image) {
      formData.append("image", newTask.image);
    }

    const updateData = {
      id: editingTask._id,
      data: formData,
    };

    editTaskMutation.mutate(updateData, {
      onSuccess: () => {
        setIsEditSheetOpen(false);
        setEditingTask(null);
        setNewTask({
          name: "",
          description: "",
          status: "todo",
          priority: "medium",
          duedate: "",
          tags: "",
          image: null,
          assignto: "",
          createdBy: "",
        });
      },
    });
  };
  const handleUpdatestatusTask = async (id: string, status: string) => {
    updateTaskMutation.mutate({ id, status });
  };

  const handleDeleteTask = (taskId: string, taskName: string) => {
    deleteTaskMutation.mutate({ id: taskId });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const handlePriorityFilter = (value: string) => {
    setPriorityFilter(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(
    (userTaskData?.pagination?.total || 0) / pageLimit
  );

  return (
    <div className="">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-gray-600 mt-1">
              Track and manage your personal tasks and assignments
            </p>
          </div>
          <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
            <SheetTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white overflow-y-scroll w-full lg:w-[40%]">
              <SheetHeader>
                <SheetTitle>Add New Task</SheetTitle>
                <SheetDescription>Create a new personal task</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="name">Task Title</Label>
                  <Input
                    id="name"
                    value={newTask.name}
                    onChange={(e) =>
                      setNewTask({ ...newTask, name: e.target.value })
                    }
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    placeholder="Enter task description"
                    rows={3}
                  />
                </div>
                {/* <div>
                  <Label htmlFor="image">Image File</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        image: e.target.files ? e.target.files[0] : null,
                      })
                    }
                  />
                </div> */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newTask.status}
                      onValueChange={(value: any) =>
                        setNewTask({ ...newTask, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="inProgress">In Progress</SelectItem>
                        <SelectItem value="Testing">Testing</SelectItem>
                        <SelectItem value="inReveiw">Review</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="inQueue">In Queue</SelectItem>
                        <SelectItem value="bugFound">Bug Found</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value: any) =>
                        setNewTask({ ...newTask, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="duedate">Due Date</Label>
                  <Input
                    id="duedate"
                    type="date"
                    value={newTask.duedate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, duedate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={newTask.tags}
                    onChange={(e) =>
                      setNewTask({ ...newTask, tags: e.target.value })
                    }
                    placeholder="Frontend, Design, API"
                  />
                </div>
                <Button
                  onClick={handleAddTask}
                  className="w-full"
                  disabled={addTaskMutation.isLoading}
                >
                  {addTaskMutation.isLoading && (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Task
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Statistics Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-8" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Tasks</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userTaskData?.pagination?.total || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  In Progress
                </CardTitle>
                <PlayCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {userTaskData?.stats?.inProgress || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Testing</CardTitle>
                <TestTube className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {userTaskData?.stats?.testing || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Review</CardTitle>
                <Eye className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {userTaskData?.stats?.review || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {userTaskData?.stats?.completed || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <CalendarDays className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {userTaskData?.stats?.overdue || 0}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search my tasks..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
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
              <Select
                value={priorityFilter}
                onValueChange={handlePriorityFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by priority" />
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

        {/* Task Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <TaskCardSkeleton key={i} />
            ))}
          </div>
        ) : userTaskData?.tasks && userTaskData.tasks.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userTaskData.tasks.map((task) => (
                <Card
                  key={task._id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                          {task.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={
                              statusConfig[task.status]?.color || "bg-gray-100"
                            }
                          >
                            {statusConfig[task.status]?.label || task.status}
                          </Badge>
                          <Badge
                            className={priorityConfig[task.priority]?.color}
                          >
                            <span className="mr-1">
                              {priorityConfig[task.priority]?.icon}
                            </span>
                            {priorityConfig[task.priority]?.label}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => handleViewTask(task)}
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:text-blue-700"
                      >
                        <View className="h-4 w-4" />
                      </Button>

                      {task.createdBy._id === task.assignto._id && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditTask(task)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Task</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{task.name}"?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteTask(task._id, task.name)
                                  }
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {task.description}
                    </p>

                    {/* Tags */}
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {task.tags.slice(0, 3).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {task.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{task.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Due Date */}
                    {task.duedate && (
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span
                          className={`text-sm ${
                            isOverdue(task.duedate) &&
                            task.status !== "Completed"
                              ? "text-red-600 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          Due: {formatDate(task.duedate)}
                          {isOverdue(task.duedate) &&
                            task.status !== "Completed" &&
                            " (Overdue)"}
                        </span>
                      </div>
                    )}
                    {/* Status Dropdown */}
                    <div className="mb-4">
                      <Select
                        defaultValue={task.status}
                        onValueChange={(value) =>
                          handleUpdatestatusTask(task._id, value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="inProgress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Testing">Testing</SelectItem>
                          <SelectItem value="inReveiw">Review</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="inQueue">In Queue</SelectItem>
                          <SelectItem value="bugFound">Bug Found</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Assignee */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={task.createdBy.profilePic || ""}
                            alt={`${task.createdBy.firstName} ${task.createdBy.lastName}`}
                          />
                          <AvatarFallback className="text-xs bg-primaryBlue text-white">
                            {getUserInitials(
                              task.createdBy.firstName,
                              task.createdBy.lastName
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">
                          {task.createdBy.firstName} {task.createdBy.lastName}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(task.createdAt)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="icon"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-600 py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-medium mb-1">No tasks found</p>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters or create a new task to get
                  started.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Task Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="bg-white overflow-y-scroll w-full lg:w-[40%]">
          <SheetHeader>
            <SheetTitle>Edit Task</SheetTitle>
            <SheetDescription>Update task details</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 mt-6">
            <div>
              <Label htmlFor="edit-name">Task Title</Label>
              <Input
                id="edit-name"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
                placeholder="Enter task title"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                placeholder="Enter task description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={newTask.status}
                  onValueChange={(value: any) =>
                    setNewTask({ ...newTask, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="inProgress">In Progress</SelectItem>
                    <SelectItem value="Testing">Testing</SelectItem>
                    <SelectItem value="inReveiw">Review</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="inQueue">In Queue</SelectItem>
                    <SelectItem value="bugFound">Bug Found</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: any) =>
                    setNewTask({ ...newTask, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-duedate">Due Date</Label>
              <Input
                id="edit-duedate"
                type="date"
                value={newTask.duedate}
                onChange={(e) =>
                  setNewTask({ ...newTask, duedate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-tags">Tags (comma separated)</Label>
              <Input
                id="edit-tags"
                value={newTask.tags}
                onChange={(e) =>
                  setNewTask({ ...newTask, tags: e.target.value })
                }
                placeholder="Frontend, Design, API"
              />
            </div>
            {/* <div>
              <Label htmlFor="edit-image">Update Image (optional)</Label>
              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    image: e.target.files ? e.target.files[0] : null,
                  })
                }
              />
            </div> */}
            <Button
              onClick={handleUpdateTask}
              className="w-full"
              disabled={editTaskMutation.isLoading}
            >
              {editTaskMutation.isLoading && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Task
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <Sheet
        open={isViewSheetOpen}
        onOpenChange={(open) => setIsViewSheetOpen(open)} // <-- FIX
      >
        <SheetContent className="bg-white">
          <>
            <SheetHeader>
              <SheetTitle>{viewTask?.name}</SheetTitle>
              <SheetDescription>{viewTask?.description}</SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-4">
              <div className="flex gap-2">
                <Badge className={priorityColors[viewTask?.priority]}>
                  {viewTask?.priority}
                </Badge>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Assignee:</strong> {viewTask?.assignto.firstName}
                  {viewTask?.assignto.lastName}
                </p>
                <p>
                  <strong>Due Date:</strong> {formatDate(viewTask?.duedate)}
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {viewTask?.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </>
        </SheetContent>
      </Sheet>
    </div>
  );
}
