"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  CalendarDays,
  TrendingUp,
  Tag,
  FileText,
  ExternalLink,
  Paperclip,
  Image as ImageIcon,
} from "lucide-react";
import { useCalenderQuery } from "@/hooks/use-calender-query";

type TaskPriority = "low" | "medium" | "high" | "urgent";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: TaskPriority;
  assignee: string;
  assigneeEmail: string;
  dueDate: Date;
  tags: string[];
  image: string | null;
  attachments: string[];
  docLinks: { title: string; url: string }[];
  createdAt: string;
}

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-orange-100 text-orange-800",
  high: "bg-red-100 text-red-800",
  urgent: "bg-purple-100 text-purple-800",
};

type ViewType = "today" | "week" | "month";

export default function CalendarScreen() {
  const [currentView, setCurrentView] = useState<ViewType>("today");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const {
    data: apiData,
    isLoading,
    error,
  } = useCalenderQuery(currentView, currentDate.toISOString().split("T")[0]);

  const tasks: Task[] =
    apiData?.tasks?.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority as TaskPriority,
      assignee: task.assignee,
      assigneeEmail: task.assigneeEmail || "",
      dueDate: new Date(task.dueDate),
      tags: task.tags || [],
      image: task.image || null,
      attachments: task.attachments || [],
      docLinks: task.docLinks || [],
      createdAt: task.createdAt || "",
    })) || [];

  const getTodayTasks = () => {
    return tasks.filter(
      (task) => task.dueDate.toDateString() === currentDate.toDateString()
    );
  };

  const getUpcomingTasks = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return tasks.filter(
      (task) => task.dueDate > today && task.dueDate <= nextWeek
    );
  };

  const getTasksForView = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return tasks.filter((task) => {
      const taskDate = task.dueDate;
      switch (currentView) {
        case "today":
          return taskDate.toDateString() === today.toDateString();
        case "week":
          return taskDate >= startOfWeek && taskDate <= endOfWeek;
        case "month":
          return taskDate >= startOfMonth && taskDate <= endOfMonth;
        default:
          return true;
      }
    });
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getMonthDays = () => {
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startOfMonth.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(
      (task) => task.dueDate.toDateString() === date.toDateString()
    );
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    switch (currentView) {
      case "today":
        newDate.setDate(
          currentDate.getDate() + (direction === "next" ? 1 : -1)
        );
        break;
      case "week":
        newDate.setDate(
          currentDate.getDate() + (direction === "next" ? 7 : -7)
        );
        break;
      case "month":
        newDate.setMonth(
          currentDate.getMonth() + (direction === "next" ? 1 : -1)
        );
        break;
    }
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderTodayView = () => {
    const todayTasks = getTodayTasks();
    console.log("Today Task", todayTasks);
    const upcomingTasks = getUpcomingTasks();
    const urgentToday = todayTasks.filter(
      (task) => task.priority === "urgent"
    ).length;
    const highPriorityToday = todayTasks.filter(
      (task) => task.priority === "high"
    ).length;

    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Clock className="w-8 h-8 animate-spin mx-auto mb-2" />
            <p>Loading calendar tasks...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <p className="text-red-600">Failed to load calendar tasks</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Today's Tasks
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {todayTasks.length}
                  </p>
                </div>
                <CalendarDays className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Urgent</p>
                  <p className="text-2xl font-bold text-red-900">
                    {urgentToday}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">
                    High Priority
                  </p>
                  <p className="text-2xl font-bold text-orange-900">
                    {highPriorityToday}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">
                    Upcoming
                  </p>
                  <p className="text-2xl font-bold text-purple-900">
                    {upcomingTasks.length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center py-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border">
          <h2 className="text-3xl font-bold mb-2">{formatDate(currentDate)}</h2>
          <p className="text-muted-foreground">
            {todayTasks.length > 0
              ? `${todayTasks.length} tasks scheduled for this day`
              : "No tasks scheduled for this day"}
          </p>
        </div>

        {todayTasks.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Today's Tasks
            </h3>
            <div className="grid gap-4">
              {todayTasks.map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]" onClick={() => setSelectedTask(task)}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{task.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                      </div>
                      <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {task.assignee}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {task.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                        {task.tags.length > 2 && <Badge variant="outline" className="text-xs">+{task.tags.length - 2}</Badge>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {upcomingTasks.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Upcoming This Week
            </h3>
            <div className="grid gap-3">
              {upcomingTasks.slice(0, 3).map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow bg-slate-50/50" onClick={() => setSelectedTask(task)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">Due: {formatDate(task.dueDate)}</p>
                      </div>
                      <Badge className={`${priorityColors[task.priority]} text-xs`}>{task.priority}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays();

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const dayTasks = getTasksForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <Card
                key={index}
                className={`min-h-32 ${isToday ? "ring-2 ring-primary" : ""}`}
              >
                <CardHeader className="p-2">
                  <CardTitle className="text-sm text-center">
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                    <br />
                    <span className="text-lg">{day.getDate()}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 space-y-1">
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`text-xs p-1 rounded cursor-pointer ${priorityColors[task.priority]}`}
                      onClick={() => setSelectedTask(task)}
                    >
                      {task.title}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthDays = getMonthDays();
    const currentMonth = currentDate.getMonth();

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center font-semibold text-sm">
              {day}
            </div>
          ))}
          {monthDays.map((day, index) => {
            const dayTasks = getTasksForDate(day);
            const isCurrentMonth = day.getMonth() === currentMonth;
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <Card
                key={index}
                className={`min-h-20 ${!isCurrentMonth ? "opacity-50" : ""} ${
                  isToday ? "ring-2 ring-primary" : ""
                }`}
              >
                <CardContent className="p-1">
                  <div className="text-sm font-semibold mb-1">
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayTasks.slice(0, 2).map((task) => (
                      <div
                        key={task.id}
                        className={`text-xs p-1 rounded cursor-pointer truncate ${priorityColors[task.priority]}`}
                        onClick={() => setSelectedTask(task)}
                      >
                        {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayTasks.length - 2} more
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Calendar className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Calendar</h1>
              <p className="text-muted-foreground">
                Manage your tasks and schedule
              </p>
            </div>
          </div>

          <div className="items-center gap-2 hidden lg:flex">
            <Button
              variant={currentView === "today" ? "default" : "outline"}
              onClick={() => setCurrentView("today")}
            >
              Today
            </Button>
            <Button
              variant={currentView === "week" ? "default" : "outline"}
              onClick={() => setCurrentView("week")}
            >
              Week
            </Button>
            <Button
              variant={currentView === "month" ? "default" : "outline"}
              onClick={() => setCurrentView("month")}
            >
              Month
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigateDate("prev")}>
            <ChevronLeft className="w-4 h-4 lg:mr-2" />
            Previous
          </Button>

          <h2 className="text-xl font-semibold">
            {currentView === "today" && formatDate(currentDate)}
            {currentView === "week" &&
              `Week of ${formatDate(getWeekDays()[0])}`}
            {currentView === "month" &&
              currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
          </h2>

          <Button variant="outline" onClick={() => navigateDate("next")}>
            Next
            <ChevronRight className="w-4 h-4 lg:ml-2" />
          </Button>
        </div>

        <div className="bg-card rounded-lg border p-6">
          {currentView === "today" && renderTodayView()}
          {currentView === "week" && renderWeekView()}
          {currentView === "month" && renderMonthView()}
        </div>
      </div>
      {/* Task Detail Modal — read-only, same two-column layout as create/edit */}
      <Dialog open={!!selectedTask} onOpenChange={(open) => { if (!open) setSelectedTask(null); }}>
        <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-y-auto p-0">
          <div className="p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                {selectedTask?.title}
              </DialogTitle>
            </DialogHeader>

            {selectedTask && (
              <div className="flex gap-6">
                {/* Left column — 65% */}
                <div className="flex-1 space-y-6 min-w-0">
                  {/* Description */}
                  <div>
                    <Label className="text-xs text-gray-500 mb-1">Description</Label>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap rounded p-2 bg-gray-50 min-h-[40px]">
                      {selectedTask.description || "No description"}
                    </p>
                  </div>

                  {/* Attachments */}
                  {(selectedTask.attachments.length > 0 || selectedTask.image) && (
                    <div>
                      <Label className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                        <Paperclip className="w-3 h-3" /> Attachments
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                        {selectedTask.image && (
                          <a href={selectedTask.image} target="_blank" rel="noopener noreferrer" className="group relative aspect-video rounded-lg overflow-hidden border bg-gray-50 hover:shadow-md transition-shadow">
                            <img src={selectedTask.image} alt="Task image" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 drop-shadow transition-opacity" />
                            </div>
                          </a>
                        )}
                        {selectedTask.attachments.map((url, i) => {
                          const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
                          return isImage ? (
                            <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="group relative aspect-video rounded-lg overflow-hidden border bg-gray-50 hover:shadow-md transition-shadow">
                              <img src={url} alt={`Attachment ${i + 1}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 drop-shadow transition-opacity" />
                              </div>
                            </a>
                          ) : (
                            <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors">
                              <FileText className="w-5 h-5 text-gray-400 shrink-0" />
                              <span className="text-sm text-blue-600 truncate">Attachment {i + 1}</span>
                              <ExternalLink className="w-3 h-3 text-gray-400 shrink-0 ml-auto" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Doc Links */}
                  {selectedTask.docLinks.length > 0 && (
                    <div>
                      <Label className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Document Links
                      </Label>
                      <div className="space-y-2 mt-2">
                        {selectedTask.docLinks.map((doc, i) => (
                          <a
                            key={i}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                          >
                            <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-700 group-hover:text-blue-700 truncate">{doc.title}</p>
                              <p className="text-xs text-gray-400 truncate">{doc.url}</p>
                            </div>
                            <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-500 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right sidebar — 35% */}
                <div className="w-[240px] shrink-0 space-y-4">
                  {/* Status */}
                  <div>
                    <Label className="text-xs text-gray-500">Status</Label>
                    <div className="mt-1">
                      <Badge variant="secondary" className="capitalize">
                        {selectedTask.status?.replace(/([A-Z])/g, " $1").trim() || "Todo"}
                      </Badge>
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <Label className="text-xs text-gray-500">Priority</Label>
                    <div className="mt-1">
                      <Badge className={priorityColors[selectedTask.priority]}>
                        {selectedTask.priority}
                      </Badge>
                    </div>
                  </div>

                  {/* Assignee */}
                  <div>
                    <Label className="text-xs text-gray-500">Assignee</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-blue-600 text-white text-[9px]">
                          {selectedTask.assignee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2) || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{selectedTask.assignee}</p>
                        {selectedTask.assigneeEmail && (
                          <p className="text-xs text-gray-400 truncate">{selectedTask.assigneeEmail}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Due Date */}
                  <div>
                    <Label className="text-xs text-gray-500">Due Date</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <CalendarDays className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{formatDate(selectedTask.dueDate)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {selectedTask.tags.length > 0 && (
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
                  {selectedTask.createdAt && (
                    <div className="pt-2 border-t text-xs text-gray-400">
                      <p>
                        Created{" "}
                        {new Date(selectedTask.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
