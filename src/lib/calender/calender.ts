import apiClient from "../../utils/axios";

export interface calendertaskRequest {
  range: string; // today week month
  date: string; //date of today week or moth to get
}
export interface calendertaskResponse {
  success: boolean;
  tasks: [
    {
      id: string;
      title: string;
      description: string;
      status: string;
      priority: string;
      assignee: string;
      dueDate: string;
      tags: [string];
    }
  ];
}

export const calender = {
  calendertask: async (
    data: calendertaskRequest
  ): Promise<calendertaskResponse> => {
    const response = await apiClient.get<calendertaskResponse>(
      `${
        data.range === "today"
          ? `/api/task/calender-task?range=${data.range}`
          : `/api/task/calender-task?range=${data.range}&date=${data.date}`
      }`
    );
    return response.data;
  },
};
