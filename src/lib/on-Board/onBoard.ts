import apiClient from "../../utils/axios";

export interface onBoardRequest {
  tempToken: string;
  accountType: string;
  purposeofUse: string;
  role: string;
  name: string;
  industryType: string;
  address: string;
  contactEmail: string;
  logo: string;
}

export interface onBoardResponse {
  success: true;
  message: string;
  accessToken: string;
  refreshToken: string;
}

export const onBoardApi = {
  onBoarding: async (data: onBoardRequest): Promise<onBoardResponse> => {
    const response = await apiClient.post<onBoardResponse>(
      "/api/auth/onboard-data",
      data
    );
    return response.data;
  },
};
