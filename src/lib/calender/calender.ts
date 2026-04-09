import apiClient from "../../utils/axios";

export interface calendertaskRequest {
  range: string; // today week month
  date: string; //date of today week or moth to get
}
export interface calendertaskResponse {
  success: boolean;
  tasks: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee: string;
    assigneeEmail: string;
    dueDate: string;
    tags: string[];
    image: string | null;
    attachments: string[];
    docLinks: { title: string; url: string }[];
    createdAt: string;
  }[];
}

export const calender = {
  calendertask: async (
    data: calendertaskRequest
  ): Promise<calendertaskResponse> => {
    const response = await apiClient.get<calendertaskResponse>(
      `/api/task/calender-task?range=${data.range}&date=${data.date}`
    );
    return response.data;
  },
};
