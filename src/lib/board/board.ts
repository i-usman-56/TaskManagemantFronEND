import apiClient from "../../utils/axios";
import { BoardColumnConfig, BoardColumnsResponse } from "../task/task";

export interface ColumnResponse {
  success: boolean;
  message: string;
  column: BoardColumnConfig;
}

export interface DeleteColumnResponse {
  success: boolean;
  message: string;
}

export interface ReorderResponse {
  success: boolean;
  message: string;
}

export const boardApi = {
  getColumns: async (): Promise<BoardColumnsResponse> => {
    const response = await apiClient.get<BoardColumnsResponse>(
      `/api/board/columns`
    );
    return response.data;
  },

  createColumn: async (data: {
    title: string;
    color?: string;
  }): Promise<ColumnResponse> => {
    const response = await apiClient.post<ColumnResponse>(
      `/api/board/columns`,
      data
    );
    return response.data;
  },

  updateColumn: async (data: {
    id: string;
    title?: string;
    color?: string;
  }): Promise<ColumnResponse> => {
    const response = await apiClient.patch<ColumnResponse>(
      `/api/board/columns/${data.id}`,
      { title: data.title, color: data.color }
    );
    return response.data;
  },

  deleteColumn: async (id: string): Promise<DeleteColumnResponse> => {
    const response = await apiClient.delete<DeleteColumnResponse>(
      `/api/board/columns/${id}`
    );
    return response.data;
  },

  reorderColumns: async (
    columns: { id: string; position: number }[]
  ): Promise<ReorderResponse> => {
    const response = await apiClient.patch<ReorderResponse>(
      `/api/board/columns/reorder`,
      { columns }
    );
    return response.data;
  },
};
