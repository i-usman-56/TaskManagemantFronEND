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

type TaskStatus = "completed" | "pending" | "upcoming" | "overdue";
type TaskPriority = "low" | "medium" | "high" | "urgent";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: Date;
  tags: string[];
  estimatedHours: number;
}

const dummyTasks: Task[] = [
  {
    id: "1",
    title: "Design Homepage Layout",
    description:
      "Create wireframes and mockups for the new homepage design with modern UI elements",
    status: "completed",
    priority: "high",
    assignee: "Sarah Chen",
    dueDate: new Date(), // Today
    tags: ["Design", "UI/UX", "Frontend"],
    estimatedHours: 8,
  },
  {
    id: "2",
    title: "API Integration",
    description:
      "Integrate payment gateway API and handle error responses properly",
    status: "pending",
    priority: "urgent",
    assignee: "Mike Johnson",
    dueDate: new Date(), // Today
    tags: ["Backend", "API", "Payment"],
    estimatedHours: 12,
  },
  {
    id: "3",
    title: "Code Review Session",
    description:
      "Review pull requests and provide feedback on recent feature implementations",
    status: "upcoming",
    priority: "medium",
    assignee: "Alex Rodriguez",
    dueDate: new Date(), // Today
    tags: ["Review", "Code Quality", "Team"],
    estimatedHours: 3,
  },
  {
    id: "4",
    title: "Database Migration",
    description: "Migrate user data from old system to new PostgreSQL database",
    status: "upcoming",
    priority: "medium",
    assignee: "Alex Rodriguez",
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    tags: ["Database", "Migration", "Backend"],
    estimatedHours: 16,
  },
  {
    id: "5",
    title: "User Authentication",
    description:
      "Implement OAuth 2.0 authentication with Google and GitHub providers",
    status: "pending",
    priority: "high",
    assignee: "David Kim",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
    tags: ["Auth", "Security", "Backend"],
    estimatedHours: 10,
  },
  {
    id: "6",
    title: "Mobile App Testing",
    description:
      "Comprehensive testing of mobile application across different devices",
    status: "overdue",
    priority: "high",
    assignee: "Emma Wilson",
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    tags: ["Testing", "Mobile", "QA"],
    estimatedHours: 6,
  },
  {
    id: "7",
    title: "Performance Optimization",
    description: "Optimize application performance and reduce load times",
    status: "upcoming",
    priority: "medium",
    assignee: "Lisa Zhang",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    tags: ["Performance", "Optimization", "Frontend"],
    estimatedHours: 14,
  },
];

const statusColors = {
  completed: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  upcoming: "bg-blue-100 text-blue-800 border-blue-200",
  overdue: "bg-red-100 text-red-800 border-red-200",
};

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

  const getTodayTasks = () => {
    const today = new Date();
    return dummyTasks.filter(
      (task) => task.dueDate.toDateString() === today.toDateString()
    );
  };

  const getUpcomingTasks = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return dummyTasks.filter(
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

    return dummyTasks.filter((task) => {
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
    return dummyTasks.filter(
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
    const upcomingTasks = getUpcomingTasks();
    const completedToday = todayTasks.filter(
      (task) => task.status === "completed"
    ).length;
    const pendingToday = todayTasks.filter(
      (task) => task.status === "pending"
    ).length;

    return (
      <div className="space-y-6">
        {/* Today's Overview */}
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

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {completedToday}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {pendingToday}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
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

        {/* Today's Date Header */}
        <div className="text-center py-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border">
          <h2 className="text-3xl font-bold mb-2">{formatDate(new Date())}</h2>
          <p className="text-muted-foreground">
            {todayTasks.length > 0
              ? `${todayTasks.length} tasks scheduled for today`
              : "No tasks scheduled for today"}
          </p>
        </div>

        {/* Today's Tasks */}
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
                            <Badge className={statusColors[task.status]}>
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {task.assignee}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {task.estimatedHours}h
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
                        <Badge className={statusColors[task.status]}>
                          {task.status}
                        </Badge>
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
                        <p>
                          <strong>Estimated Hours:</strong>{" "}
                          {task.estimatedHours}h
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

        {/* Upcoming Tasks Preview */}
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
                            <Badge
                              className={`${statusColors[task.status]} text-xs`}
                            >
                              {task.status}
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
                        <Badge className={statusColors[task.status]}>
                          {task.status}
                        </Badge>
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
                        <p>
                          <strong>Estimated Hours:</strong>{" "}
                          {task.estimatedHours}h
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
                            statusColors[task.status]
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
                            <Badge className={statusColors[task.status]}>
                              {task.status}
                            </Badge>
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
                            <p>
                              <strong>Estimated Hours:</strong>{" "}
                              {task.estimatedHours}h
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
                              statusColors[task.status]
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
                              <Badge className={statusColors[task.status]}>
                                {task.status}
                              </Badge>
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
                              <p>
                                <strong>Estimated Hours:</strong>{" "}
                                {task.estimatedHours}h
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
        {/* Header */}
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

          {/* View Toggle */}
          <div className="flex items-center gap-2">
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

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigateDate("prev")}>
            <ChevronLeft className="w-4 h-4 mr-2" />
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
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Calendar Content */}
        <div className="bg-card rounded-lg border p-6">
          {currentView === "today" && renderTodayView()}
          {currentView === "week" && renderWeekView()}
          {currentView === "month" && renderMonthView()}
        </div>
      </div>
    </div>
  );
}
