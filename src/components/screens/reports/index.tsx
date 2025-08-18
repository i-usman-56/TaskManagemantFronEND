"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  AlertTriangle,
  Download,
} from "lucide-react"

// Dummy data for reports
const taskStatusData = [
  { name: "Completed", value: 45, color: "#22c55e" },
  { name: "In Progress", value: 28, color: "#3b82f6" },
  { name: "Testing", value: 12, color: "#f59e0b" },
  { name: "Todo", value: 15, color: "#6b7280" },
]

const weeklyProgressData = [
  { week: "Week 1", completed: 12, created: 15 },
  { week: "Week 2", completed: 18, created: 20 },
  { week: "Week 3", completed: 25, created: 22 },
  { week: "Week 4", completed: 30, created: 28 },
]

const memberProductivityData = [
  { name: "Sarah Chen", completed: 24, inProgress: 6, efficiency: 85 },
  { name: "Mike Johnson", completed: 18, inProgress: 8, efficiency: 78 },
  { name: "Emily Davis", completed: 21, inProgress: 4, efficiency: 92 },
  { name: "Alex Rodriguez", completed: 15, inProgress: 9, efficiency: 72 },
  { name: "Lisa Wang", completed: 19, inProgress: 5, efficiency: 88 },
]

const priorityDistribution = [
  { priority: "Low", count: 25, color: "#10b981" },
  { priority: "Medium", count: 35, color: "#f59e0b" },
  { priority: "High", count: 20, color: "#ef4444" },
  { priority: "Urgent", count: 8, color: "#dc2626" },
]

const monthlyTrends = [
  { month: "Jan", tasks: 45, completed: 38 },
  { month: "Feb", tasks: 52, completed: 45 },
  { month: "Mar", tasks: 48, completed: 42 },
  { month: "Apr", tasks: 61, completed: 55 },
  { month: "May", tasks: 58, completed: 52 },
  { month: "Jun", tasks: 67, completed: 61 },
]

export default function ReportsScreen() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("all")

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Track team performance and project insights</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent  className="bg-white">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="bg-white">
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">186</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8% completion rate
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600 flex items-center gap-1">
                <Award className="h-3 w-3" />
                85% avg efficiency
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                -3 from last week
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="team">Team Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Task Status Distribution</CardTitle>
                <CardDescription>Current status breakdown of all tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    completed: { label: "Completed", color: "#22c55e" },
                    inProgress: { label: "In Progress", color: "#3b82f6" },
                    testing: { label: "Testing", color: "#f59e0b" },
                    todo: { label: "Todo", color: "#6b7280" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {taskStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="flex flex-wrap gap-4 mt-4">
                  {taskStatusData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-600">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Priority Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Priority Distribution</CardTitle>
                <CardDescription>Tasks breakdown by priority level</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    low: { label: "Low", color: "#10b981" },
                    medium: { label: "Medium", color: "#f59e0b" },
                    high: { label: "High", color: "#ef4444" },
                    urgent: { label: "Urgent", color: "#dc2626" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priorityDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="priority" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Tasks completed vs created over the last 4 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  completed: { label: "Completed", color: "#22c55e" },
                  created: { label: "Created", color: "#3b82f6" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="completed" fill="#22c55e" />
                    <Bar dataKey="created" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Member Productivity</CardTitle>
              <CardDescription>Individual performance metrics and efficiency ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {memberProductivityData.map((member) => (
                  <div key={member.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">
                            {member.completed} completed • {member.inProgress} in progress
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          member.efficiency >= 85 ? "default" : member.efficiency >= 75 ? "secondary" : "destructive"
                        }
                      >
                        {member.efficiency}% efficiency
                      </Badge>
                    </div>
                    <Progress value={member.efficiency} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Task Trends</CardTitle>
              <CardDescription>Task creation and completion trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  tasks: { label: "Total Tasks", color: "#3b82f6" },
                  completed: { label: "Completed", color: "#22c55e" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="tasks"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="completed"
                      stackId="2"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Summary</CardTitle>
                <CardDescription>Overall team metrics and achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Tasks Completed</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">186</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Avg. Completion Time</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">3.2d</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Team Efficiency</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">85%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Highest performing team members this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {memberProductivityData
                    .sort((a, b) => b.efficiency - a.efficiency)
                    .slice(0, 3)
                    .map((member, index) => (
                      <div key={member.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.completed} tasks completed</p>
                        </div>
                        <Badge variant="default">{member.efficiency}%</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
