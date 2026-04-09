import apiClient from "../../utils/axios";
import { Pagination, Task, User } from "../task/task";

export interface AdminQueryParams {
  q?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface AdminTaskQueryParams extends AdminQueryParams {
  priority?: string;
}

export interface AdminUsersResponse {
  success: boolean;
  users: User[];
  pagination: Pagination;
}

export interface AdminTasksResponse {
  success: boolean;
  tasks: Task[];
  pagination: Pagination;
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
}

export interface ToggleStatusResponse {
  success: boolean;
  message: string;
  user: User;
}

export const adminApi = {
  allUsers: async (
    params: AdminQueryParams
  ): Promise<AdminUsersResponse> => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );
    const response = await apiClient.get<AdminUsersResponse>(
      `/api/auth/all-users`,
      { params: filteredParams }
    );
    return response.data;
  },

  allOrganizations: async (
    params: AdminQueryParams
  ): Promise<AdminUsersResponse> => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );
    const response = await apiClient.get<AdminUsersResponse>(
      `/api/auth/all-org`,
      { params: filteredParams }
    );
    return response.data;
  },

  toggleUserStatus: async (
    userId: string
  ): Promise<ToggleStatusResponse> => {
    const response = await apiClient.patch<ToggleStatusResponse>(
      `/api/auth/active-inactive/${userId}`
    );
    return response.data;
  },

  allTasks: async (
    params: AdminTaskQueryParams
  ): Promise<AdminTasksResponse> => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );
    const response = await apiClient.get<AdminTasksResponse>(
      `/api/auth/all-tasks-admin`,
      { params: filteredParams }
    );
    return response.data;
  },
};
