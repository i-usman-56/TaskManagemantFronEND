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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useOrganizationMembersQuery } from "@/hooks/use-member-query";
import { useUserInfoQuery } from "@/hooks/use-auth-mutations";
import {
  useAddMemberMutation,
  usedeleteMemberMutation,
  useeditMemberMutation,
} from "@/hooks/use-member-mutations";

interface Member {
  userid: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
  };
  role: string;
  organizationID: string;
  _id: string;
}

const roles = [
  "projectManager",
  "teamLead",
  "developer",
  "qaEngineer",
  "uiuxDesigner",
  "devopsEngineer",
  "client",
  "hrManager",
  "supportEngineer",
  "intern",
];

// Role display mapping
const roleDisplayMap: { [key: string]: string } = {
  projectManager: "Project Manager",
  teamLead: "Team Lead",
  developer: "Developer",
  qaEngineer: "QA Engineer",
  uiuxDesigner: "UI/UX Designer",
  devopsEngineer: "DevOps Engineer",
  client: "Client",
  hrManager: "HR Manager",
  supportEngineer: "Support Engineer",
  intern: "Intern",
};

export default function MemberScreen() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    role: "",
  });

  const { data: userData } = useUserInfoQuery();
  const { data: OrganizationData } = useOrganizationMembersQuery(
    userData?.user.organizationId || ""
  );
  const addMemberMutation = useAddMemberMutation();
  const deleteMemberMutation = usedeleteMemberMutation();
  const editMemberMutation = useeditMemberMutation();

  const resetForm = () => {
    setFormData({
      email: "",
      role: "",
    });
  };

  const handleAddMember = () => {
    if (!formData.email || !formData.role) {
      toast.error("Please fill in all required fields.");
      return;
    }
    addMemberMutation.mutate(
      { email: formData.email, role: formData.role },
      {
        onSuccess: () => {
          resetForm();
          setIsAddSheetOpen(false);
          toast.success("Member added successfully!");
        },
        onError: () => {
          toast.error("Failed to add member. Please try again.");
        },
      }
    );
  };

  const handleEditMember = () => {
    if (!formData.role) {
      toast.error("Please select a role.");
      return;
    }
    editMemberMutation.mutate(
      {
        id: editingMember?.organizationID || "",
        data: {
          memberId: editingMember?.userid._id || "",
          role: formData.role,
        },
      },
      {
        onSuccess: () => {
          resetForm();
          setIsEditSheetOpen(false);
          setEditingMember(null);
          toast.success("Member updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update member. Please try again.");
        },
      }
    );
  };

  const handleDeleteClick = (member: Member) => {
    setMemberToDelete(member);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setMemberToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      deleteMemberMutation.mutate(
        {
          id: memberToDelete.organizationID,
          data: { memberId: memberToDelete.userid._id },
        },
        {
          onSuccess: () => {
            toast.success("Member deleted successfully!");
            setIsDeleteDialogOpen(false);
            setMemberToDelete(null);
          },
          onError: () => {
            toast.error("Failed to delete member. Please try again.");
            setIsDeleteDialogOpen(false);
            setMemberToDelete(null);
          },
        }
      );
    }
  };

  const openEditSheet = (member: Member) => {
    // Close any open dialogs first
    setIsDeleteDialogOpen(false);
    setMemberToDelete(null);

    setIsEditSheetOpen(true);
    setFormData({
      email: member.userid.email,
      role: member.role,
    });
    setEditingMember(member);
  };

  const handleEditSheetClose = () => {
    setIsEditSheetOpen(false);
    setEditingMember(null);
    resetForm();
  };

  const handleAddSheetClose = () => {
    setIsAddSheetOpen(false);
    resetForm();
  };

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      "Project Manager": "bg-blue-100 text-blue-800",
      Developer: "bg-green-100 text-green-800",
      "UI/UX Designer": "bg-purple-100 text-purple-800",
      "QA Engineer": "bg-orange-100 text-orange-800",
      "Team Lead": "bg-red-100 text-red-800",
      "DevOps Engineer": "bg-yellow-100 text-yellow-800",
      Client: "bg-indigo-100 text-indigo-800",
      "HR Manager": "bg-pink-100 text-pink-800",
      "Support Engineer": "bg-cyan-100 text-cyan-800",
      Intern: "bg-gray-100 text-gray-800",
    };
    const displayRole = roleDisplayMap[role] || role;
    return colors[displayRole] || "bg-gray-100 text-gray-800";
  };

  const getDisplayRole = (role: string) => {
    return roleDisplayMap[role] || role;
  };

  const handleAddSheetOpenChange = (open: boolean) => {
    setIsAddSheetOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleEditSheetOpenChange = (open: boolean) => {
    setIsEditSheetOpen(open);
    if (!open) {
      setEditingMember(null);
      resetForm();
    }
  };

  const handleDeleteDialogOpenChange = (open: boolean) => {
    setIsDeleteDialogOpen(open);
    if (!open) {
      setMemberToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center lg:gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="lg:text-3xl font-bold text-foreground">
                Team Members
              </h1>
              <p className="text-muted-foreground">
                Manage your team members and their roles
              </p>
            </div>
          </div>

          <Sheet open={isAddSheetOpen} onOpenChange={handleAddSheetOpenChange}>
            <SheetTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Member
              </Button>
            </SheetTrigger>

            <SheetContent className="bg-white w-full lg:w-[40%]">
              <SheetHeader>
                <SheetTitle>Add New Member</SheetTitle>
                <SheetDescription>
                  Add a new team member to your project.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
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
                    disabled={addMemberMutation.isLoading}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                    disabled={addMemberMutation.isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {getDisplayRole(role)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddMember}
                  className="flex-1"
                  disabled={addMemberMutation.isLoading}
                >
                  {addMemberMutation.isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Member"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAddSheetClose}
                  className="flex-1 bg-transparent"
                  disabled={addMemberMutation.isLoading}
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
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-[24px] font-montreal font-medium text-muted-foreground">
                    Total Members
                  </p>
                </div>
                <p className="text-[24px] font-montreal font-semibold text-muted-foreground">
                  {OrganizationData?.totalMembers}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
          {OrganizationData?.Members?.map((member) => (
            <Card
              key={member._id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        className="capitalize"
                        src={member.userid.profilePic || "/placeholder.svg"}
                        alt={`${member.userid.firstName} ${member.userid.lastName}`}
                      />
                      <AvatarFallback className="bg-primaryBlue capitalize  text-white font-creato font-medium">
                        {member.userid.firstName[0]}
                        {member.userid.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {member.userid.firstName} {member.userid.lastName}
                      </CardTitle>
                      <Badge className={`text-xs ${getRoleColor(member.role)}`}>
                        {getDisplayRole(member.role)}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white" align="end">
                      <DropdownMenuItem onClick={() => openEditSheet(member)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(member)}
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
                    <span className="truncate">{member.userid.email}</span>
                  </div>
                  {member.userid.phoneNumber && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>
                        {member.userid.countryCode}
                        {member.userid.phoneNumber}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Sheet */}
        <Sheet open={isEditSheetOpen} onOpenChange={handleEditSheetOpenChange}>
          <SheetContent className="bg-white w-full lg:w-[40%]">
            <SheetHeader>
              <SheetTitle>Edit Member</SheetTitle>
              <SheetDescription>
                Update member information and role.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="editEmail">Email *</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={formData.email}
                  disabled={true}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john.doe@company.com"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="editRole">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                  disabled={editMemberMutation.isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {getDisplayRole(role)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleEditMember}
                className="flex-1"
                disabled={editMemberMutation.isLoading}
              >
                {editMemberMutation.isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Member"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleEditSheetClose}
                className="flex-1 bg-transparent"
                disabled={editMemberMutation.isLoading}
              >
                Cancel
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={handleDeleteDialogOpenChange}
        >
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600">
                Delete Member
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-medium">
                  {memberToDelete?.userid.firstName}{" "}
                  {memberToDelete?.userid.lastName}
                </span>
                ? This action cannot be undone and will permanently remove this
                member from your organization.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={handleDeleteCancel}
                disabled={deleteMemberMutation.isLoading}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={deleteMemberMutation.isLoading}
              >
                {deleteMemberMutation.isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
