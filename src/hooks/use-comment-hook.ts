"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { commentApi } from "@/lib/comment/comment";

export function useCommentsQuery(taskId: string) {
  return useQuery({
    queryKey: ["comments", taskId],
    queryFn: () => commentApi.getComments(taskId),
    enabled: !!taskId,
    refetchInterval: 10000,
    staleTime: 1000 * 5,
  });
}

export function useAddCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { taskId: string; content: string }) =>
      commentApi.addComment(data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["comments", variables.taskId]);
      queryClient.invalidateQueries(["kanban-tasks"]);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to add comment.";
      toast.error(errorMessage);
    },
  });
}

export function useEditCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      commentId: string;
      content: string;
      taskId: string;
    }) =>
      commentApi.editComment({
        commentId: data.commentId,
        content: data.content,
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["comments", variables.taskId]);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to edit comment.";
      toast.error(errorMessage);
    },
  });
}

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { commentId: string; taskId: string }) =>
      commentApi.deleteComment(data.commentId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["comments", variables.taskId]);
      queryClient.invalidateQueries(["kanban-tasks"]);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to delete comment.";
      toast.error(errorMessage);
    },
  });
}
