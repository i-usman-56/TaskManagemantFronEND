import apiClient from "../../utils/axios";

export interface addTaskResponse {
  success: boolean;
  message: string;
}
export interface editTaskResponse {
  success: boolean;
  message: string;
}
export interface deleteTaskResponse {
  success: boolean;
  message: string;
}
export interface updateTaskResponse {
  success: boolean;
  message: string;
}
// 👤 User type (for assignto & createdBy)
export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  isVerified: boolean;
  onBoarding: boolean;
  enable2fa: boolean;
  phone2fa: boolean;
  email2fa: boolean;
  isDelete: boolean;
  role: string;
  organizationId: string;
  organizations: string[];
  createdAt: string;
  updatedAt: string;
  otp: string | null;
  otpExpiry: string | null;
  accountType: string;
  profilePic: string | null;
}

// 📌 Single Task
export interface Task {
  _id: string;
  name: string;
  description: string;
  image: string | null;
  status:
    | "todo"
    | "InProgress"
    | "Completed"
    | "inQueue"
    | "todo"
    | "Testing"
    | "bugFound"
    | "inReveiw"; // ✅ Strong typing
  duedate: string;
  tags: string[];
  assignto: User;
  createdBy: User;
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
}

// 📊 Pagination info
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 📈 Stats
export interface Stats {
  inProgress: number;
  testing: number;
  review: number;
  completed: number;
  overdue: number;
}

// ✅ Final API Response
export interface AllUserTaskResponse {
  success: boolean;
  tasks: Task[];
  pagination: Pagination;
  stats: Stats;
}
export interface DashBoardStatsResponse {
  success: Boolean;
  stats: {
    totalTasks: number;
    teamMembers: number;
    completedTasks: number;
    completionRate: string;
    inProgressTasks: number;
    overdueTasks: number;
    todayTasks: number;
  };
}
export interface DashBoardStatsTodayResponse {
  success: Boolean;
  task: Task[];
  total: number;
}
export interface TaskQueryParams {
  q?: string;
  status?: string;
  priority?: string;
  page?: number;
  limit?: number;
}

export const taskApi = {
  addTask: async (data: FormData): Promise<addTaskResponse> => {
    const response = await apiClient.post<addTaskResponse>(
      "/api/task/add-task",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
  editTask: async (data: {
    id: string;
    data: FormData;
  }): Promise<editTaskResponse> => {
    const response = await apiClient.patch<editTaskResponse>(
      `/api/task/edit-task/${data.id}`,
      data.data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
  deleteTask: async (data: { id: string }): Promise<deleteTaskResponse> => {
    const response = await apiClient.delete<deleteTaskResponse>(
      `/api/task/delete-task/${data.id}`
    );
    return response.data;
  },
  updateStatus: async (data: {
    id: string;
    status: string;
  }): Promise<updateTaskResponse> => {
    const response = await apiClient.patch<updateTaskResponse>(
      `/api/task/update-status-task/${data.id}`,
      { status: data.status }
    );
    return response.data;
  },
  allTaskUser: async (
    queryParams: TaskQueryParams
  ): Promise<AllUserTaskResponse> => {
    // filter out only truthy query params
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    const response = await apiClient.get<AllUserTaskResponse>(
      `/api/task/all-task`,
      { params: filteredParams }
    );

    return response.data;
  },
  allTaskORg: async (
    queryParams: TaskQueryParams
  ): Promise<AllUserTaskResponse> => {
    // filter out only truthy query params
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    const response = await apiClient.get<AllUserTaskResponse>(
      `/api/task/all-task-org`,
      { params: filteredParams }
    );

    return response.data;
  },

  dashBoardStats: async (): Promise<DashBoardStatsResponse> => {
    const response = await apiClient.get<DashBoardStatsResponse>(
      `/api/task/dashboard-stats`
    );
    return response.data;
  },
  dashBoardToday: async (): Promise<DashBoardStatsTodayResponse> => {
    const response = await apiClient.get<DashBoardStatsTodayResponse>(
      `/api/task/dashboard-today-task`
    );
    return response.data;
  },
};
