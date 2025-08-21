"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  CheckCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Target,
  Activity,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { useCalenderQuery } from "@/hooks/use-calender-query";
import {
  useDashBoardStateQuery,
  useDashBoardTodayQuery,
} from "@/hooks/use-task-hook";
import { useRouter } from "next/navigation";
import { useAccountTypeQuery } from "@/hooks/use-auth-mutations";

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-500";
    case "high":
      return "bg-orange-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-50";
    case "in-progress":
      return "text-blue-600 bg-blue-50";
    case "pending":
      return "text-yellow-600 bg-yellow-50";
    case "overdue":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

// Skeleton Components
const StatsCardSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-8 w-12" />
        </div>
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
    </CardContent>
  </Card>
);

const TaskItemSkeleton = () => (
  <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
    <div className="flex items-center gap-4 flex-1">
      <Skeleton className="w-1 h-12 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-5 w-48 mb-2" />
        <div className="flex items-center gap-3 mt-1">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

const CalendarSkeleton = () => (
  <Card className="mb-6">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-16" />
        <div className="flex items-center gap-1">
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
        </div>
      </div>
      <Skeleton className="h-4 w-24" />
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 p-1"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {Array.from({ length: 42 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-8 rounded" />
        ))}
      </div>
      <div className="pt-3 border-t">
        <Skeleton className="h-9 w-full rounded" />
      </div>
    </CardContent>
  </Card>
);

export default function DashBoardScreen() {
  const router = useRouter();
  const { data } = useAccountTypeQuery();

  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: DashBoardData, isLoading: isDashboardLoading } =
    useDashBoardStateQuery();
  const { data: DashBoardDataToday, isLoading: isTodayLoading } =
    useDashBoardTodayQuery();

  console.log(DashBoardDataToday);

  const { data: calendarData, isLoading: isCalendarLoading } = useCalenderQuery(
    "month",
    currentDate.toISOString().split("T")[0]
  );

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const currentDateStr = current.toISOString().split("T")[0];

      const hasTask =
        calendarData?.tasks?.some(
          (task) => task.dueDate && task.dueDate.startsWith(currentDateStr)
        ) || false;

      const isToday = current.toDateString() === new Date().toDateString();
      const isCurrentMonth = current.getMonth() === month;

      days.push({
        date: new Date(current),
        hasTask,
        isToday,
        isCurrentMonth,
      });

      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigateMonth = (direction: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your projects today.
          </p>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar-hide">
            {/* Stats Cards with Skeleton Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {isDashboardLoading ? (
                // Show skeleton cards while loading
                <>
                  <StatsCardSkeleton />
                  <StatsCardSkeleton />
                  <StatsCardSkeleton />
                  <StatsCardSkeleton />
                  <StatsCardSkeleton />
                  <StatsCardSkeleton />
                </>
              ) : (
                // Show actual data when loaded
                <>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Total Tasks
                          </p>
                          <p className="text-3xl font-bold text-gray-900">
                            {DashBoardData?.stats.totalTasks}
                          </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-full">
                          <Target className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Completed Tasks
                          </p>
                          <p className="text-3xl font-bold text-gray-900">
                            {DashBoardData?.stats.completedTasks}
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-full">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            In Progress
                          </p>
                          <p className="text-3xl font-bold text-gray-900">
                            {DashBoardData?.stats.inProgressTasks}
                          </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-full">
                          <Activity className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Overdue Tasks
                          </p>
                          <p className="text-3xl font-bold text-gray-900">
                            {DashBoardData?.stats.overdueTasks}
                          </p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-full">
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Today's Tasks
                          </p>
                          <p className="text-3xl font-bold text-gray-900">
                            {DashBoardData?.stats.todayTasks}
                          </p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-full">
                          <CalendarDays className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {DashBoardData?.stats.teamMembers && (
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              Team Members
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                              {DashBoardData?.stats.teamMembers}
                            </p>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-full">
                            <Users className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>

            {/* Today's Tasks with Skeleton Loading */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  {isTodayLoading ? (
                    <Skeleton className="h-6 w-32" />
                  ) : (
                    `Today's Tasks (${DashBoardDataToday?.total || 0})`
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isTodayLoading ? (
                    // Show skeleton task items while loading
                    <>
                      <TaskItemSkeleton />
                      <TaskItemSkeleton />
                      <TaskItemSkeleton />
                    </>
                  ) : DashBoardDataToday?.task?.length > 0 ? (
                    // Show actual tasks when loaded
                    DashBoardDataToday.task.map((task) => (
                      <div
                        key={task._id}
                        onClick={() => {
                          data?.accountType === "organization"
                            ? router.push("/dashboard/all-task")
                            : router.push("/dashboard/my-task");
                        }}
                        className="flex items-center justify-between cursor-pointer p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`w-1 h-12 rounded-full ${getPriorityColor(
                              task.priority
                            )}`}
                          ></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {task.name}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge
                                variant="outline"
                                className={getStatusColor(task.status)}
                              >
                                {task.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Show empty state when no tasks
                    <div className="text-center py-8 text-gray-500">
                      <p>No tasks scheduled for today</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
          </div>

          {/* Calendar with Skeleton Loading */}
          <div className="w-80 sticky top-6 h-fit hidden lg:block">
            {isCalendarLoading ? (
              <CalendarSkeleton />
            ) : (
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Calendar</CardTitle>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateMonth(-1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateMonth(1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {monthNames[currentDate.getMonth()]}{" "}
                    {currentDate.getFullYear()}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs font-medium text-gray-500 p-1"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                      <Link
                        key={index}
                        href="/dashboard/calender"
                        className={`
                          relative p-1 text-center text-sm rounded hover:bg-blue-50 transition-colors
                          ${
                            day.isCurrentMonth
                              ? "text-gray-900"
                              : "text-gray-300"
                          }
                          ${
                            day.isToday
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : ""
                          }
                        `}
                      >
                        {day.date.getDate()}
                        {day.hasTask && !day.isToday && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    <Link href="/dashboard/calender">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        View Full Calendar
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
