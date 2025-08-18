"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  CalendarDays,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Users,
  PlayCircle,
  TestTube,
  Eye,
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "testing" | "review" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: {
    name: string
    avatar: string
    initials: string
  }
  dueDate: string
  createdAt: string
  tags: string[]
  imageUrl: string
  progress: number
}

const dummyTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description:
      "Create a modern and responsive landing page for the new product launch with hero section and call-to-action",
    status: "in-progress",
    priority: "high",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/professional-woman-diverse.png",
      initials: "SJ",
    },
    dueDate: "2024-01-15",
    createdAt: "2024-01-01",
    tags: ["Design", "Frontend", "UI/UX"],
    imageUrl: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=200&fit=crop",
    progress: 65,
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Set up secure user login and registration system with JWT tokens and password reset functionality",
    status: "testing",
    priority: "urgent",
    assignee: {
      name: "Mike Chen",
      avatar: "/professional-man.png",
      initials: "MC",
    },
    dueDate: "2024-01-20",
    createdAt: "2024-01-02",
    tags: ["Backend", "Security", "Authentication"],
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",
    progress: 85,
  },
  {
    id: "3",
    title: "Write API documentation",
    description: "Document all REST API endpoints with examples, response formats, and error handling guides",
    status: "completed",
    priority: "medium",
    assignee: {
      name: "Emily Davis",
      avatar: "/creative-designer.png",
      initials: "ED",
    },
    dueDate: "2024-01-10",
    createdAt: "2023-12-28",
    tags: ["Documentation", "API", "Technical Writing"],
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=200&fit=crop",
    progress: 100,
  },
  {
    id: "4",
    title: "Fix mobile responsive issues",
    description: "Resolve layout problems on mobile devices for the dashboard and improve touch interactions",
    status: "review",
    priority: "high",
    assignee: {
      name: "Alex Rodriguez",
      avatar: "/professional-tester.png",
      initials: "AR",
    },
    dueDate: "2024-01-05",
    createdAt: "2023-12-20",
    tags: ["Frontend", "Mobile", "Responsive"],
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
    progress: 90,
  },
  {
    id: "5",
    title: "Database optimization",
    description: "Optimize database queries, add proper indexing, and implement caching for better performance",
    status: "in-progress",
    priority: "medium",
    assignee: {
      name: "David Kim",
      avatar: "/team-leader.png",
      initials: "DK",
    },
    dueDate: "2024-01-25",
    createdAt: "2024-01-03",
    tags: ["Backend", "Performance", "Database"],
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop",
    progress: 45,
  },
  {
    id: "6",
    title: "User testing session",
    description: "Conduct usability testing with 10 users, gather feedback, and create improvement recommendations",
    status: "todo",
    priority: "low",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/professional-woman-diverse.png",
      initials: "SJ",
    },
    dueDate: "2024-02-01",
    createdAt: "2024-01-04",
    tags: ["Testing", "UX", "Research"],
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
    progress: 0,
  },
  {
    id: "7",
    title: "Payment integration setup",
    description: "Integrate Stripe payment gateway with subscription management and webhook handling",
    status: "testing",
    priority: "urgent",
    assignee: {
      name: "Mike Chen",
      avatar: "/professional-man.png",
      initials: "MC",
    },
    dueDate: "2024-01-18",
    createdAt: "2024-01-05",
    tags: ["Backend", "Payments", "Integration"],
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
    progress: 75,
  },
  {
    id: "8",
    title: "Email notification system",
    description: "Build automated email notifications for user actions, reminders, and system updates",
    status: "review",
    priority: "medium",
    assignee: {
      name: "Emily Davis",
      avatar: "/creative-designer.png",
      initials: "ED",
    },
    dueDate: "2024-01-22",
    createdAt: "2024-01-06",
    tags: ["Backend", "Email", "Automation"],
    imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=200&fit=crop",
    progress: 80,
  },
]

const statusConfig = {
  todo: { label: "To Do", color: "bg-gray-100 text-gray-800", icon: Circle },
  "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-800", icon: PlayCircle },
  testing: { label: "Testing", color: "bg-purple-100 text-purple-800", icon: TestTube },
  review: { label: "Review", color: "bg-orange-100 text-orange-800", icon: Eye },
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
}

const priorityConfig = {
  low: { label: "Low", color: "bg-green-100 text-green-800" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  high: { label: "High", color: "bg-red-100 text-red-800" },
  urgent: { label: "Urgent", color: "bg-red-200 text-red-900 font-semibold" },
}

export default function AllTaskScreen() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo" as const,
    priority: "medium" as const,
    assignee: "Sarah Johnson",
    dueDate: "",
    tags: "",
    imageUrl: "",
    progress: 0,
  })

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    testing: tasks.filter((t) => t.status === "testing").length,
    review: tasks.filter((t) => t.status === "review").length,
  }

  const handleAddTask = () => {
    const assigneeData = {
      "Sarah Johnson": { avatar: "/professional-woman-diverse.png", initials: "SJ" },
      "Mike Chen": { avatar: "/professional-man.png", initials: "MC" },
      "Emily Davis": { avatar: "/creative-designer.png", initials: "ED" },
      "Alex Rodriguez": { avatar: "/professional-tester.png", initials: "AR" },
      "David Kim": { avatar: "/team-leader.png", initials: "DK" },
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      assignee: {
        name: newTask.assignee,
        avatar: assigneeData[newTask.assignee as keyof typeof assigneeData]?.avatar || "/professional-man.png",
        initials: assigneeData[newTask.assignee as keyof typeof assigneeData]?.initials || "UN",
      },
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString().split("T")[0],
      tags: newTask.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      imageUrl: newTask.imageUrl || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop",
      progress: newTask.progress,
    }

    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      assignee: "Sarah Johnson",
      dueDate: "",
      tags: "",
      imageUrl: "",
      progress: 0,
    })
    setIsAddSheetOpen(false)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsEditSheetOpen(true)
  }

  const handleUpdateTask = () => {
    if (!editingTask) return

    const assigneeData = {
      "Sarah Johnson": { avatar: "/professional-woman-diverse.png", initials: "SJ" },
      "Mike Chen": { avatar: "/professional-man.png", initials: "MC" },
      "Emily Davis": { avatar: "/creative-designer.png", initials: "ED" },
      "Alex Rodriguez": { avatar: "/professional-tester.png", initials: "AR" },
      "David Kim": { avatar: "/team-leader.png", initials: "DK" },
    }

    const updatedTask = {
      ...editingTask,
      assignee: {
        name: editingTask.assignee.name,
        avatar: assigneeData[editingTask.assignee.name as keyof typeof assigneeData]?.avatar || "/professional-man.png",
        initials: assigneeData[editingTask.assignee.name as keyof typeof assigneeData]?.initials || "UN",
      },
    }

    setTasks(tasks.map((t) => (t.id === editingTask.id ? updatedTask : t)))
    setIsEditSheetOpen(false)
    setEditingTask(null)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  return (
    <div className="">
      <div className=" space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
            <p className="text-gray-600 mt-1">Manage and track all your project tasks with progress monitoring</p>
          </div>
          <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
            <SheetTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Add New Task</SheetTitle>
                <SheetDescription>Create a new task and assign it to a team member</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Enter task description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL (optional)</Label>
                  <Input
                    id="imageUrl"
                    value={newTask.imageUrl}
                    onChange={(e) => setNewTask({ ...newTask, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newTask.status}
                      onValueChange={(value: any) => setNewTask({ ...newTask, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="testing">Testing</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={newTask.progress}
                    onChange={(e) => setNewTask({ ...newTask, progress: Number.parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select
                    value={newTask.assignee}
                    onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                      <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                      <SelectItem value="Alex Rodriguez">Alex Rodriguez</SelectItem>
                      <SelectItem value="David Kim">David Kim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={newTask.tags}
                    onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                    placeholder="Frontend, Design, API"
                  />
                </div>
                <Button onClick={handleAddTask} className="w-full">
                  Add Task
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{taskStats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <PlayCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Testing</CardTitle>
              <TestTube className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{taskStats.testing}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Review</CardTitle>
              <Eye className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{taskStats.review}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
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

        {/* Tasks View */}
        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="board">Board View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {filteredTasks.map((task) => {
              const StatusIcon = statusConfig[task.status].icon
              return (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={task.imageUrl || "/placeholder.svg"}
                          alt={task.title}
                          className="w-24 h-16 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{task.title}</h3>
                              <Badge className={priorityConfig[task.priority].color}>
                                {priorityConfig[task.priority].label}
                              </Badge>
                              <Badge className={statusConfig[task.status].color}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusConfig[task.status].label}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{task.description}</p>
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-2" />
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={task.assignee.avatar || "/placeholder.svg"}
                                    alt={task.assignee.name}
                                  />
                                  <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                                </Avatar>
                                <span>{task.assignee.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CalendarDays className="h-4 w-4" />
                                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              {task.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditTask(task)}>Edit Task</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="text-red-600">
                                Delete Task
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="board">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {Object.entries(statusConfig).map(([status, config]) => (
                <div key={status} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <config.icon className="h-5 w-5" />
                    <h3 className="font-semibold">{config.label}</h3>
                    <Badge variant="secondary">{getTasksByStatus(status).length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {getTasksByStatus(status).map((task) => (
                      <Card key={task.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <img
                              src={task.imageUrl || "/placeholder.svg"}
                              alt={task.title}
                              className="w-full h-20 object-cover rounded-md"
                            />
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-sm">{task.title}</h4>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEditTask(task)}>Edit Task</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="text-red-600">
                                    Delete Task
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
                            <div>
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-1" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge className={priorityConfig[task.priority].color} variant="secondary">
                                {priorityConfig[task.priority].label}
                              </Badge>
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={task.assignee.avatar || "/placeholder.svg"}
                                  alt={task.assignee.name}
                                />
                                <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="text-xs text-gray-500">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Task Sheet */}
        <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Edit Task</SheetTitle>
              <SheetDescription>Update task details and assignment</SheetDescription>
            </SheetHeader>
            {editingTask && (
              <div className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="edit-title">Task Title</Label>
                  <Input
                    id="edit-title"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-imageUrl">Image URL</Label>
                  <Input
                    id="edit-imageUrl"
                    value={editingTask.imageUrl}
                    onChange={(e) => setEditingTask({ ...editingTask, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={editingTask.status}
                      onValueChange={(value: any) => setEditingTask({ ...editingTask, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="testing">Testing</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-priority">Priority</Label>
                    <Select
                      value={editingTask.priority}
                      onValueChange={(value: any) => setEditingTask({ ...editingTask, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-progress">Progress (%)</Label>
                  <Input
                    id="edit-progress"
                    type="number"
                    min="0"
                    max="100"
                    value={editingTask.progress}
                    onChange={(e) => setEditingTask({ ...editingTask, progress: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-assignee">Assignee</Label>
                  <Select
                    value={editingTask.assignee.name}
                    onValueChange={(value) =>
                      setEditingTask({ ...editingTask, assignee: { ...editingTask.assignee, name: value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                      <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                      <SelectItem value="Alex Rodriguez">Alex Rodriguez</SelectItem>
                      <SelectItem value="David Kim">David Kim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-dueDate">Due Date</Label>
                  <Input
                    id="edit-dueDate"
                    type="date"
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                  <Input
                    id="edit-tags"
                    value={editingTask.tags.join(", ")}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        tags: e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
                <Button onClick={handleUpdateTask} className="w-full">
                  Update Task
                </Button>
              </div>
            )}
          </SheetContent >
        </Sheet>
      </div>
    </div>
  )
}
