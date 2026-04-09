"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { taskApi, TaskQueryParams } from "@/lib/task/task";

export function useaddTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => taskApi.addTask(data),
    onSuccess: (data) => {
      toast.success(data.message || "Task Created Successfully");
      queryClient.invalidateQueries(["all-task-user"]);
      queryClient.invalidateQueries(["all-task-org"]);
      queryClient.invalidateQueries(["kanban-tasks"]);
      queryClient.invalidateQueries(["my-kanban-tasks"]);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Registration Failed");
      console.error("Registration error:", error);
    },
  });
}
export function useeditTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; data: FormData }) =>
      taskApi.editTask(data),
    onSuccess: (data) => {
      toast.success(data.message || "Task Updated Successfully");
      queryClient.invalidateQueries(["all-task-user"]);
      queryClient.invalidateQueries(["all-task-org"]);
      queryClient.invalidateQueries(["kanban-tasks"]);
      queryClient.invalidateQueries(["my-kanban-tasks"]);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Registration Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; status: string }) =>
      taskApi.updateStatus(data),
    onSuccess: (data) => {
      toast.success(data.message || "Status Updated Successfully");
      queryClient.invalidateQueries(["all-task-user"]);
      queryClient.invalidateQueries(["all-task-org"]);
      queryClient.invalidateQueries(["kanban-tasks"]);
      queryClient.invalidateQueries(["my-kanban-tasks"]);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Registration Failed");

      console.error("Registration error:", error);
    },
  });
}
export function usedeleteTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string }) => taskApi.deleteTask(data),
    onSuccess: (data) => {
      toast.success(data.message || "Task Deleted Successfully");
      queryClient.invalidateQueries(["all-task-user"]);
      queryClient.invalidateQueries(["all-task-org"]);
      queryClient.invalidateQueries(["kanban-tasks"]);
      queryClient.invalidateQueries(["my-kanban-tasks"]);
      queryClient.invalidateQueries(["dashBoard-user"]);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Registration Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useAllTaskUserQuery(queryParams: TaskQueryParams) {
  return useQuery({
    queryKey: ["all-task-user", queryParams], // cache per org
    queryFn: () => taskApi.allTaskUser(queryParams), // ✅ pass id
    onSuccess: (data) => {
      console.log("Account type:", data);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to fetch organization members.";
      toast.error(errorMessage);
    },
    staleTime: 1000 * 60 * 5, // ✅ cache valid for 5 minutes
    cacheTime: 1000 * 60 * 10, // ✅ keep unused data in cache for 10 minutes
    refetchOnWindowFocus: true, // ✅ don’t refetch when switching tabs
    refetchOnMount: true, // ✅ don’t refetch if cached data exists
    refetchOnReconnect: false, // ✅ don’t refetch when internet reconnects
  });
}
export function useAllTaskORGQuery(queryParams: TaskQueryParams) {
  return useQuery({
    queryKey: ["all-task-org", queryParams], // cache per org
    queryFn: () => taskApi.allTaskORg(queryParams), // ✅ pass id
    onSuccess: (data) => {
      console.log("Account type:", data);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to fetch organization members.";
      toast.error(errorMessage);
    },
    staleTime: 1000 * 60 * 5, // ✅ cache valid for 5 minutes
    cacheTime: 1000 * 60 * 10, // ✅ keep unused data in cache for 10 minutes
    refetchOnWindowFocus: true, // ✅ don’t refetch when switching tabs
    refetchOnMount: true, // ✅ don’t refetch if cached data exists
    refetchOnReconnect: false, // ✅ don’t refetch when internet reconnects
  });
}
export function useDashBoardStateQuery() {
  return useQuery({
    queryKey: ["dashBoard-user"], // cache per org
    queryFn: () => taskApi.dashBoardStats(), // ✅ pass id
    onSuccess: (data) => {
      console.log("Account type:", data);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to fetch organization members.";
      toast.error(errorMessage);
    },
  });
}
export function useDashBoardTodayQuery() {
  return useQuery({
    queryKey: ["dashBoard-user-taday"],
    queryFn: () => taskApi.dashBoardToday(),
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to fetch today's tasks.";
      toast.error(errorMessage);
    },
  });
}

export function useMyKanbanTasksQuery(enabled = true) {
  return useQuery({
    queryKey: ["my-kanban-tasks"],
    queryFn: () => taskApi.myTaskKanban(),
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled,
  });
}

export function useKanbanTasksQuery(params?: { assignto?: string }, enabled = true) {
  return useQuery({
    queryKey: ["kanban-tasks", params],
    queryFn: () => taskApi.allTaskKanban(params),
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled,
  });
}

export function useUpdatePositionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; status: string; position: number }) =>
      taskApi.updatePosition(data),
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update task position.";
      toast.error(errorMessage);
      queryClient.invalidateQueries(["kanban-tasks"]);
      queryClient.invalidateQueries(["my-kanban-tasks"]);
    },
  });
}
