"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  CheckCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Target,
  Activity,
  AlertTriangle,
  CalendarDays,
} from "lucide-react"
import Link from "next/link"

// Dummy data
const dashboardStats = {
  totalTasks: 156,
  totalMembers: 12,
  inProgressTasks: 23,
  completedTasks: 89,
  overdueeTasks: 8,
  todayTasks: 7,
}

const todayTasks = [
  {
    id: 1,
    title: "Review UI Design System",
    priority: "high",
    status: "in-progress",
    assignee: { name: "Sarah Chen", avatar: "/professional-woman-diverse.png" },
    dueTime: "2:00 PM",
    progress: 75,
  },
  {
    id: 2,
    title: "Database Migration Script",
    priority: "urgent",
    status: "pending",
    assignee: { name: "Mike Johnson", avatar: "/professional-man.png" },
    dueTime: "4:30 PM",
    progress: 0,
  },
  {
    id: 3,
    title: "Client Presentation Prep",
    priority: "medium",
    status: "in-progress",
    assignee: { name: "Emma Wilson", avatar: "/creative-designer.png" },
    dueTime: "5:00 PM",
    progress: 45,
  },
]

const inProgressTasks = [
  {
    id: 4,
    title: "Mobile App Authentication",
    priority: "high",
    assignee: { name: "Alex Rodriguez", avatar: "/team-leader.png" },
    progress: 60,
    tags: ["Frontend", "Security"],
  },
  {
    id: 5,
    title: "API Documentation Update",
    priority: "medium",
    assignee: { name: "Lisa Park", avatar: "/professional-tester.png" },
    progress: 30,
    tags: ["Documentation", "Backend"],
  },
  {
    id: 6,
    title: "Performance Optimization",
    priority: "low",
    assignee: { name: "David Kim", avatar: "/professional-man.png" },
    progress: 85,
    tags: ["Performance", "Optimization"],
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-500"
    case "high":
      return "bg-orange-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-50"
    case "in-progress":
      return "text-blue-600 bg-blue-50"
    case "pending":
      return "text-yellow-600 bg-yellow-50"
    case "overdue":
      return "text-red-600 bg-red-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

export default function DashBoardScreen() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Generate calendar days with task indicators
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const hasTask = Math.random() > 0.7 // Random task indicator
      const isToday = current.toDateString() === new Date().toDateString()
      const isCurrentMonth = current.getMonth() === month

      days.push({
        date: new Date(current),
        hasTask,
        isToday,
        isCurrentMonth,
      })

      current.setDate(current.getDate() + 1)
    }

    return days
  }

  const calendarDays = generateCalendarDays()
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
  ]

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your projects today.</p>
        </div>

        <div className="flex gap-6">
          {/* Main Content - Left Side (Scrollable) */}
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar-hide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalTasks}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12% from last month
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
                      <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardStats.completedTasks}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        57% completion rate
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
                      <p className="text-sm font-medium text-gray-600">In Progress</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardStats.inProgressTasks}</p>
                      <p className="text-sm text-blue-600 flex items-center mt-1">
                        <Activity className="h-3 w-3 mr-1" />
                        Active work
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
                      <p className="text-sm font-medium text-gray-600">Overdue Tasks</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardStats.overdueeTasks}</p>
                      <p className="text-sm text-red-600 flex items-center mt-1">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Needs attention
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
                      <p className="text-sm font-medium text-gray-600">Today's Tasks</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardStats.todayTasks}</p>
                      <p className="text-sm text-orange-600 flex items-center mt-1">
                        <CalendarDays className="h-3 w-3 mr-1" />
                        Due today
                      </p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-full">
                      <CalendarDays className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Team Members</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalMembers}</p>
                      <p className="text-sm text-purple-600 flex items-center mt-1">
                        <Users className="h-3 w-3 mr-1" />
                        All active
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-full">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Tasks */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  Today's Tasks ({dashboardStats.todayTasks})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-1 h-12 rounded-full ${getPriorityColor(task.priority)}`}></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="outline" className={getStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                            <span className="text-sm text-gray-500">Due: {task.dueTime}</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-gray-500">Progress</span>
                              <span className="text-xs font-medium">{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-1" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {task.assignee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{task.assignee.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* In Progress Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-orange-600" />
                  In Progress Tasks ({dashboardStats.inProgressTasks})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inProgressTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-1 h-12 rounded-full ${getPriorityColor(task.priority)}`}></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-gray-500">Progress</span>
                              <span className="text-xs font-medium">{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-1" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {task.assignee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{task.assignee.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-80 sticky top-6 h-fit">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Calendar</CardTitle>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => navigateMonth(-1)}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigateMonth(1)}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 p-1">
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
                        ${day.isCurrentMonth ? "text-gray-900" : "text-gray-300"}
                        ${day.isToday ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
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
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Full Calendar
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
