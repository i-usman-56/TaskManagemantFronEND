"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight,
  Power,
} from "lucide-react";
import {
  useAdminUsersQuery,
  useAdminOrgsQuery,
  useToggleUserStatusMutation,
} from "@/hooks/use-admin-hook";

type TabType = "individual" | "organization";

export default function AdminUsersScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("individual");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;

  const toggleStatus = useToggleUserStatusMutation();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter, activeTab]);

  const queryParams = {
    q: debouncedSearch || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page: currentPage,
    limit,
  };

  const { data: usersData, isLoading: usersLoading } =
    useAdminUsersQuery(queryParams);
  const { data: orgsData, isLoading: orgsLoading } =
    useAdminOrgsQuery(queryParams);

  const isIndividual = activeTab === "individual";
  const data = isIndividual ? usersData : orgsData;
  const isLoading = isIndividual ? usersLoading : orgsLoading;
  const users = data?.users || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "?";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">
          View and manage all platform users
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isIndividual
              ? "bg-primaryBlue text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("individual")}
        >
          <Users className="w-4 h-4" />
          Individual Users
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            !isIndividual
              ? "bg-primaryBlue text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("organization")}
        >
          <Building2 className="w-4 h-4" />
          Organization Users
        </button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, username..."
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50/50">
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                      User
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                      Email
                    </th>
                    {!isIndividual && (
                      <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                        Organization
                      </th>
                    )}
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                      Role
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                      Joined
                    </th>
                    <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b last:border-0 hover:bg-gray-50/50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9">
                            <AvatarImage
                              src={user.profilePic || undefined}
                            />
                            <AvatarFallback className="bg-primaryBlue text-white text-xs">
                              {getInitials(user.firstName, user.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {user.email}
                      </td>
                      {!isIndividual && (
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {(user as any).organizationId?.name || "—"}
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="text-xs">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            user.isActive !== false
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.isActive !== false ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className={`h-8 text-xs ${
                                user.isActive !== false
                                  ? "text-red-600 border-red-200 hover:bg-red-50"
                                  : "text-green-600 border-green-200 hover:bg-green-50"
                              }`}
                            >
                              <Power className="w-3 h-3 mr-1" />
                              {user.isActive !== false
                                ? "Deactivate"
                                : "Activate"}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {user.isActive !== false
                                  ? "Deactivate"
                                  : "Activate"}{" "}
                                User
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to{" "}
                                {user.isActive !== false
                                  ? "deactivate"
                                  : "activate"}{" "}
                                {user.firstName} {user.lastName}? They{" "}
                                {user.isActive !== false
                                  ? "will not be able to log in"
                                  : "will be able to log in again"}
                                .
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => toggleStatus.mutate(user._id)}
                                className={
                                  user.isActive !== false
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-green-600 hover:bg-green-700"
                                }
                              >
                                {user.isActive !== false
                                  ? "Deactivate"
                                  : "Activate"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, pagination?.total || 0)} of{" "}
            {pagination?.total || 0} users
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5) {
                if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2)
                  pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(pageNum)}
                  className={
                    currentPage === pageNum
                      ? "bg-primaryBlue hover:bg-hoverBlue"
                      : ""
                  }
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
