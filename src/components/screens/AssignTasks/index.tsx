"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  CalendarDays,
  MoreHorizontal,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Users,
  PlayCircle,
  UserPlus,
  Clock,
  AlertTriangle,
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "unassigned" | "assigned" | "in-progress" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: {
    name: string
    avatar: string
    initials: string
  } | null
  dueDate: string
  createdAt: string
  tags: string[]
  imageUrl: string
  progress: number
  assignedDate?: string
}

const dummyTasks: Task[] = [
  {
    id: "1",
    title: "Design mobile app wireframes",
    description: "Create wireframes for the new mobile application focusing on user experience and navigation flow",
    status: "unassigned",
    priority: "high",
    assignee: null,
    dueDate: "2024-01-20",
    createdAt: "2024-01-08",
    tags: ["Design", "Mobile", "Wireframes"],
    imageUrl: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=200&fit=crop",
    progress: 0,
  },
  {
    id: "2",
    title: "API integration for payment system",
    description: "Integrate third-party payment gateway API with proper error handling and security measures",
    status: "assigned",
    priority: "urgent",
    assignee: {
      name: "Mike Chen",
      avatar: "/professional-man.png",
      initials: "MC",
    },
    dueDate: "2024-01-15",
    createdAt: "2024-01-05",
    assignedDate: "2024-01-08",
    tags: ["Backend", "API", "Payments"],
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
    progress: 25,
  },
  {
    id: "3",
    title: "User feedback analysis report",
    description: "Analyze user feedback from the last quarter and create actionable insights report",
    status: "in-progress",
    priority: "medium",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/professional-woman-diverse.png",
      initials: "SJ",
    },
    dueDate: "2024-01-25",
    createdAt: "2024-01-03",
    assignedDate: "2024-01-06",
    tags: ["Research", "Analysis", "UX"],
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
    progress: 60,
  },
  {
    id: "4",
    title: "Database performance optimization",
    description: "Optimize database queries and implement caching strategies for better performance",
    status: "unassigned",
    priority: "high",
    assignee: null,
    dueDate: "2024-01-30",
    createdAt: "2024-01-07",
    tags: ["Backend", "Database", "Performance"],
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop",
    progress: 0,
  },
  {
    id: "5",
    title: "Social media integration",
    description: "Add social media login and sharing capabilities to the platform",
    status: "assigned",
    priority: "medium",
    assignee: {
      name: "Emily Davis",
      avatar: "/creative-designer.png",
      initials: "ED",
    },
    dueDate: "2024-02-05",
    createdAt: "2024-01-04",
    assignedDate: "2024-01-09",
    tags: ["Frontend", "Integration", "Social"],
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=200&fit=crop",
    progress: 15,
  },
  {
    id: "6",
    title: "Security audit implementation",
    description: "Implement security recommendations from the recent audit including authentication improvements",
    status: "completed",
    priority: "urgent",
    assignee: {
      name: "Alex Rodriguez",
      avatar: "/professional-tester.png",
      initials: "AR",
    },
    dueDate: "2024-01-12",
    createdAt: "2024-01-01",
    assignedDate: "2024-01-02",
    tags: ["Security", "Backend", "Audit"],
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",
    progress: 100,
  },
  {
    id: "7",
    title: "Content management system upgrade",
    description: "Upgrade the CMS to the latest version and migrate existing content safely",
    status: "unassigned",
    priority: "low",
    assignee: null,
    dueDate: "2024-02-15",
    createdAt: "2024-01-06",
    tags: ["CMS", "Upgrade", "Content"],
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=200&fit=crop",
    progress: 0,
  },
  {
    id: "8",
    title: "Email notification templates",
    description: "Design and implement responsive email templates for various notification types",
    status: "in-progress",
    priority: "medium",
    assignee: {
      name: "David Kim",
      avatar: "/team-leader.png",
      initials: "DK",
    },
    dueDate: "2024-01-28",
    createdAt: "2024-01-02",
    assignedDate: "2024-01-05",
    tags: ["Email", "Templates", "Design"],
    imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=200&fit=crop",
    progress: 40,
  },
]

const statusConfig = {
  unassigned: { label: "Unassigned", color: "bg-gray-100 text-gray-800", icon: Circle },
  assigned: { label: "Assigned", color: "bg-blue-100 text-blue-800", icon: UserPlus },
  "in-progress": { label: "In Progress", color: "bg-purple-100 text-purple-800", icon: PlayCircle },
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
}

const priorityConfig = {
  low: { label: "Low", color: "bg-green-100 text-green-800" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  high: { label: "High", color: "bg-red-100 text-red-800" },
  urgent: { label: "Urgent", color: "bg-red-200 text-red-900 font-semibold" },
}

const teamMembers = [
  { name: "Sarah Johnson", avatar: "/professional-woman-diverse.png", initials: "SJ", role: "UI/UX Designer" },
  { name: "Mike Chen", avatar: "/professional-man.png", initials: "MC", role: "Backend Developer" },
  { name: "Emily Davis", avatar: "/creative-designer.png", initials: "ED", role: "Frontend Developer" },
  { name: "Alex Rodriguez", avatar: "/professional-tester.png", initials: "AR", role: "QA Engineer" },
  { name: "David Kim", avatar: "/team-leader.png", initials: "DK", role: "Full Stack Developer" },
]

export default function AssignTaskScreen() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [isAssignSheetOpen, setIsAssignSheetOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedAssignee, setSelectedAssignee] = useState("")

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
    unassigned: tasks.filter((t) => t.status === "unassigned").length,
    assigned: tasks.filter((t) => t.status === "assigned").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  }

  const handleAssignTask = (task: Task) => {
    setSelectedTask(task)
    setSelectedAssignee("")
    setIsAssignSheetOpen(true)
  }

  const handleConfirmAssignment = () => {
    if (!selectedTask || !selectedAssignee) return

    const assigneeData = teamMembers.find((member) => member.name === selectedAssignee)
    if (!assigneeData) return

    const updatedTask = {
      ...selectedTask,
      status: "assigned" as const,
      assignee: {
        name: assigneeData.name,
        avatar: assigneeData.avatar,
        initials: assigneeData.initials,
      },
      assignedDate: new Date().toISOString().split("T")[0],
      progress: selectedTask.status === "unassigned" ? 0 : selectedTask.progress,
    }

    setTasks(tasks.map((t) => (t.id === selectedTask.id ? updatedTask : t)))
    setIsAssignSheetOpen(false)
    setSelectedTask(null)
    setSelectedAssignee("")
  }

  const handleUnassignTask = (taskId: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: "unassigned" as const,
              assignee: null,
              assignedDate: undefined,
              progress: 0,
            }
          : t,
      ),
    )
  }

  const handleUpdateStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: newStatus,
              progress:
                newStatus === "completed" ? 100 : newStatus === "in-progress" ? Math.max(t.progress, 10) : t.progress,
            }
          : t,
      ),
    )
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assign Tasks</h1>
            <p className="text-gray-600 mt-1">Manage task assignments and track team workload distribution</p>
          </div>
        </div>

        {/* Stats Cards */}
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
              <CardTitle className="text-sm font-medium">Unassigned</CardTitle>
              <AlertTriangle className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{taskStats.unassigned}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned</CardTitle>
              <UserPlus className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{taskStats.assigned}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <PlayCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{taskStats.inProgress}</div>
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
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
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

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => {
            const StatusIcon = statusConfig[task.status].icon
            const daysUntilDue = getDaysUntilDue(task.dueDate)
            const isOverdue = daysUntilDue < 0
            const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

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
                            {isOverdue && (
                              <Badge className="bg-red-200 text-red-900">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Overdue
                              </Badge>
                            )}
                            {isDueSoon && !isOverdue && (
                              <Badge className="bg-orange-200 text-orange-900">
                                <Clock className="h-3 w-3 mr-1" />
                                Due Soon
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{task.description}</p>

                          {task.status !== "unassigned" && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-2" />
                            </div>
                          )}

                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            {task.assignee ? (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={task.assignee.avatar || "/placeholder.svg"}
                                    alt={task.assignee.name}
                                  />
                                  <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                                </Avatar>
                                <span>Assigned to: {task.assignee.name}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-gray-400">
                                <Circle className="h-4 w-4" />
                                <span>Unassigned</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <CalendarDays className="h-4 w-4" />
                              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            {task.assignedDate && (
                              <div className="flex items-center gap-1">
                                <UserPlus className="h-4 w-4" />
                                <span>Assigned: {new Date(task.assignedDate).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            {task.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {task.status === "unassigned" ? (
                            <Button onClick={() => handleAssignTask(task)} size="sm">
                              <UserPlus className="h-4 w-4 mr-1" />
                              Assign
                            </Button>
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleAssignTask(task)}>
                                  Reassign Task
                                </DropdownMenuItem>
                                {task.status === "assigned" && (
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(task.id, "in-progress")}>
                                    Start Progress
                                  </DropdownMenuItem>
                                )}
                                {task.status === "in-progress" && (
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(task.id, "completed")}>
                                    Mark Complete
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => handleUnassignTask(task.id)} className="text-red-600">
                                  Unassign Task
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Assignment Sheet */}
        <Sheet open={isAssignSheetOpen} onOpenChange={setIsAssignSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Assign Task</SheetTitle>
              <SheetDescription>
                {selectedTask?.assignee
                  ? "Reassign this task to a different team member"
                  : "Assign this task to a team member"}
              </SheetDescription>
            </SheetHeader>
            {selectedTask && (
              <div className="space-y-6 mt-6">
                {/* Task Details */}
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Task</Label>
                    <div className="mt-1">
                      <h4 className="font-semibold">{selectedTask.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{selectedTask.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Priority</Label>
                      <Badge className={`${priorityConfig[selectedTask.priority].color} mt-1`}>
                        {priorityConfig[selectedTask.priority].label}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Due Date</Label>
                      <p className="text-sm mt-1">{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {selectedTask.assignee && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Currently Assigned To</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={selectedTask.assignee.avatar || "/placeholder.svg"}
                            alt={selectedTask.assignee.name}
                          />
                          <AvatarFallback className="text-xs">{selectedTask.assignee.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{selectedTask.assignee.name}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Team Member Selection */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">Assign To</Label>
                  <div className="space-y-2 mt-2">
                    {teamMembers.map((member) => (
                      <div
                        key={member.name}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedAssignee === member.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedAssignee(member.name)}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                        {selectedAssignee === member.name && <CheckCircle2 className="h-5 w-5 text-blue-500" />}
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={handleConfirmAssignment} className="w-full" disabled={!selectedAssignee}>
                  {selectedTask.assignee ? "Reassign Task" : "Assign Task"}
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
