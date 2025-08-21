"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { useCalenderQuery } from "@/hooks/use-calender-query";

type TaskPriority = "low" | "medium" | "high" | "urgent";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  assignee: string;
  dueDate: Date;
  tags: string[];
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
      priority: task.priority as TaskPriority,
      assignee: task.assignee,
      dueDate: new Date(task.dueDate),
      tags: task.tags || [],
    })) || [];

  const getTodayTasks = () => {
    const today = new Date();
    console.log(tasks);
    return tasks
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
          <h2 className="text-3xl font-bold mb-2">{formatDate(new Date())}</h2>
          <p className="text-muted-foreground">
            {todayTasks.length > 0
              ? `${todayTasks.length} tasks scheduled for today`
              : "No tasks scheduled for today"}
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
                <Sheet key={task.id}>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">
                              {task.title}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {task.description}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            <Badge className={priorityColors[task.priority]}>
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {task.assignee}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {task.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {task.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{task.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  <SheetContent className="bg-white">
                    <SheetHeader>
                      <SheetTitle>{task.title}</SheetTitle>
                      <SheetDescription>{task.description}</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      <div className="flex gap-2">
                        <Badge className={priorityColors[task.priority]}>
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <strong>Assignee:</strong> {task.assignee}
                        </p>
                        <p>
                          <strong>Due Date:</strong> {formatDate(task.dueDate)}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
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
                <Sheet key={task.id}>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow bg-slate-50/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Due: {formatDate(task.dueDate)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge
                              className={`${
                                priorityColors[task.priority]
                              } text-xs`}
                            >
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  <SheetContent className="bg-white">
                    <SheetHeader>
                      <SheetTitle>{task.title}</SheetTitle>
                      <SheetDescription>{task.description}</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      <div className="flex gap-2">
                        <Badge className={priorityColors[task.priority]}>
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <strong>Assignee:</strong> {task.assignee}
                        </p>
                        <p>
                          <strong>Due Date:</strong> {formatDate(task.dueDate)}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
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
                    <Sheet key={task.id}>
                      <SheetTrigger asChild>
                        <div
                          className={`text-xs p-1 rounded cursor-pointer ${
                            priorityColors[task.priority]
                          }`}
                        >
                          {task.title}
                        </div>
                      </SheetTrigger>
                      <SheetContent className="bg-white">
                        <SheetHeader>
                          <SheetTitle>{task.title}</SheetTitle>
                          <SheetDescription>
                            {task.description}
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-4">
                          <div className="flex gap-2">
                            <Badge className={priorityColors[task.priority]}>
                              {task.priority}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <p>
                              <strong>Assignee:</strong> {task.assignee}
                            </p>
                            <p>
                              <strong>Due Date:</strong>{" "}
                              {formatDate(task.dueDate)}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Tags:</p>
                            <div className="flex flex-wrap gap-2">
                              {task.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
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
                      <Sheet key={task.id}>
                        <SheetTrigger asChild>
                          <div
                            className={`text-xs p-1 rounded cursor-pointer truncate ${
                              priorityColors[task.priority]
                            }`}
                          >
                            {task.title}
                          </div>
                        </SheetTrigger>
                        <SheetContent className="bg-white">
                          <SheetHeader>
                            <SheetTitle>{task.title}</SheetTitle>
                            <SheetDescription>
                              {task.description}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-6 space-y-4">
                            <div className="flex gap-2">
                              <Badge className={priorityColors[task.priority]}>
                                {task.priority}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <p>
                                <strong>Assignee:</strong> {task.assignee}
                              </p>
                              <p>
                                <strong>Due Date:</strong>{" "}
                                {formatDate(task.dueDate)}
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold mb-2">Tags:</p>
                              <div className="flex flex-wrap gap-2">
                                {task.tags.map((tag) => (
                                  <Badge key={tag} variant="outline">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
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
    </div>
  );
}
