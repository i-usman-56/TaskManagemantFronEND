import apiClient from "../../utils/axios";
import { CommentsResponse, Comment } from "../task/task";

export interface AddCommentResponse {
  success: boolean;
  message: string;
  comment: Comment;
}

export interface EditCommentResponse {
  success: boolean;
  message: string;
  comment: Comment;
}

export interface DeleteCommentResponse {
  success: boolean;
  message: string;
}

export const commentApi = {
  getComments: async (
    taskId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<CommentsResponse> => {
    const response = await apiClient.get<CommentsResponse>(
      `/api/comment/${taskId}`,
      { params: { page, limit } }
    );
    return response.data;
  },

  addComment: async (data: {
    taskId: string;
    content: string;
  }): Promise<AddCommentResponse> => {
    const response = await apiClient.post<AddCommentResponse>(
      `/api/comment/${data.taskId}`,
      { content: data.content }
    );
    return response.data;
  },

  editComment: async (data: {
    commentId: string;
    content: string;
  }): Promise<EditCommentResponse> => {
    const response = await apiClient.patch<EditCommentResponse>(
      `/api/comment/${data.commentId}`,
      { content: data.content }
    );
    return response.data;
  },

  deleteComment: async (commentId: string): Promise<DeleteCommentResponse> => {
    const response = await apiClient.delete<DeleteCommentResponse>(
      `/api/comment/${commentId}`
    );
    return response.data;
  },
};
