"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Users,
  Mail,
  Phone,
} from "lucide-react";
import toast from "react-hot-toast";

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  avatar?: string;
  joinDate: string;
  status: "active" | "inactive";
}

const initialMembers: Member[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    role: "Project Manager",
    avatar: "/professional-man.png",
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@company.com",
    phone: "+1 (555) 234-5678",
    role: "Developer",
    avatar: "/professional-woman-diverse.png",
    joinDate: "2024-02-20",
    status: "active",
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@company.com",
    phone: "+1 (555) 345-6789",
    role: "Designer",
    avatar: "/creative-designer.png",
    joinDate: "2024-01-10",
    status: "active",
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@company.com",
    phone: "+1 (555) 456-7890",
    role: "QA Engineer",
    avatar: "/professional-tester.png",
    joinDate: "2024-03-05",
    status: "inactive",
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Lee",
    email: "david.lee@company.com",
    phone: "+1 (555) 567-8901",
    role: "Team Lead",
    avatar: "/team-leader.png",
    joinDate: "2023-12-01",
    status: "active",
  },
];

const roles = [
  "Project Manager",
  "Developer",
  "Designer",
  "QA Engineer",
  "Team Lead",
  "Analyst",
  "Scrum Master",
];

export default function MemberScreen() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
  });

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
    });
  };

  const handleAddMember = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.role
    ) {
      toast.success("Please fill in all required fields.");
      return;
    }

    const newMember: Member = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      avatar: `/placeholder.svg?height=40&width=40&query=${formData.firstName}+${formData.lastName}`,
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
    };

    setMembers([...members, newMember]);
    resetForm();
    setIsAddSheetOpen(false);

    toast.success("Member deleted successfully!");
  };

  const handleEditMember = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.role ||
      !editingMember
    ) {
      toast.success("Please fill in all required fields.");

      return;
    }

    const updatedMembers = members.map((member) =>
      member.id === editingMember.id
        ? {
            ...member,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
          }
        : member
    );

    setMembers(updatedMembers);
    resetForm();
    setEditingMember(null);
    setIsEditSheetOpen(false);
    toast.success("Member updated successfully!");
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
    toast.success("Member deleted successfully!");
  };

  const openEditSheet = (member: Member) => {
    setEditingMember(member);
    setFormData({
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      phone: member.phone,
      role: member.role,
    });
    setIsEditSheetOpen(true);
  };

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      "Project Manager": "bg-blue-100 text-blue-800",
      Developer: "bg-green-100 text-green-800",
      Designer: "bg-purple-100 text-purple-800",
      "QA Engineer": "bg-orange-100 text-orange-800",
      "Team Lead": "bg-red-100 text-red-800",
      Analyst: "bg-yellow-100 text-yellow-800",
      "Scrum Master": "bg-indigo-100 text-indigo-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Team Members
              </h1>
              <p className="text-muted-foreground">
                Manage your team members and their roles
              </p>
            </div>
          </div>

          <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
            <SheetTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Member
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Add New Member</SheetTitle>
                <SheetDescription>
                  Add a new team member to your project.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      placeholder="John"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john.doe@company.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddMember} className="flex-1">
                  Add Member
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddSheetOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold">{members.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Members
                  </p>
                  <p className="text-2xl font-bold">
                    {members.filter((m) => m.status === "active").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
          {members.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={member.avatar || "/placeholder.svg"}
                        alt={`${member.firstName} ${member.lastName}`}
                      />
                      <AvatarFallback className="bg-primaryBlue text-white font-creato font-medium">
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {member.firstName} {member.lastName}
                      </CardTitle>
                      <Badge className={`text-xs ${getRoleColor(member.role)}`}>
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditSheet(member)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </span>
                    <Badge
                      variant={
                        member.status === "active" ? "default" : "secondary"
                      }
                    >
                      {member.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Sheet */}
        <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Edit Member</SheetTitle>
              <SheetDescription>
                Update member information and role.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editFirstName">First Name *</Label>
                  <Input
                    id="editFirstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="John"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editLastName">Last Name *</Label>
                  <Input
                    id="editLastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editEmail">Email *</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john.doe@company.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editPhone">Phone</Label>
                <Input
                  id="editPhone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editRole">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleEditMember} className="flex-1">
                Update Member
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditSheetOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
