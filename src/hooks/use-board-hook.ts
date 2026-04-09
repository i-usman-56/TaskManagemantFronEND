"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { boardApi } from "@/lib/board/board";

export function useBoardColumnsQuery() {
  return useQuery({
    queryKey: ["board-columns"],
    queryFn: () => boardApi.getColumns(),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
}

export function useCreateColumnMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; color?: string }) =>
      boardApi.createColumn(data),
    onSuccess: (data) => {
      toast.success(data.message || "Column created");
      queryClient.invalidateQueries(["board-columns"]);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to create column.";
      toast.error(errorMessage);
    },
  });
}

export function useUpdateColumnMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; title?: string; color?: string }) =>
      boardApi.updateColumn(data),
    onSuccess: (data) => {
      toast.success(data.message || "Column updated");
      queryClient.invalidateQueries(["board-columns"]);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update column.";
      toast.error(errorMessage);
    },
  });
}

export function useDeleteColumnMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => boardApi.deleteColumn(id),
    onSuccess: (data) => {
      toast.success(data.message || "Column deleted");
      queryClient.invalidateQueries(["board-columns"]);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to delete column.";
      toast.error(errorMessage);
    },
  });
}

export function useReorderColumnsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columns: { id: string; position: number }[]) =>
      boardApi.reorderColumns(columns),
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to reorder columns.";
      toast.error(errorMessage);
      queryClient.invalidateQueries(["board-columns"]);
    },
  });
}
