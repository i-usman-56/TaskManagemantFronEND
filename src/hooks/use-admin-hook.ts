"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  adminApi,
  AdminQueryParams,
  AdminTaskQueryParams,
} from "@/lib/admin/admin";

export function useAdminUsersQuery(params: AdminQueryParams) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => adminApi.allUsers(params),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: true,
  });
}

export function useAdminOrgsQuery(params: AdminQueryParams) {
  return useQuery({
    queryKey: ["admin-orgs", params],
    queryFn: () => adminApi.allOrganizations(params),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: true,
  });
}

export function useToggleUserStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => adminApi.toggleUserStatus(userId),
    onSuccess: (data) => {
      toast.success(data.message || "User status updated");
      queryClient.invalidateQueries(["admin-users"]);
      queryClient.invalidateQueries(["admin-orgs"]);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to toggle user status.";
      toast.error(errorMessage);
    },
  });
}

export function useAdminTasksQuery(params: AdminTaskQueryParams) {
  return useQuery({
    queryKey: ["admin-tasks", params],
    queryFn: () => adminApi.allTasks(params),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: true,
  });
}
