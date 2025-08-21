import apiClient from "../../utils/axios";

export interface addMemberRequest {
  email: string;
  role: string;
}
export interface addMemberResponse {
  success: Boolean;
  message: string;
}

export interface organizationResponse {
  success: Boolean;
  Members: [
    {
      userid: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        profilePic: string;
        countryCode: string;
      };
      role: string;
      organizationID: string;

      _id: string;
    }
  ];
  totalMembers: number;
}
export interface organizationRequest {
  id: string;
}
export interface editOrganizationRequest {
  id: string;
  data: {
    role: string;
    memberId: String;
  };
}
export interface deleteOrganizationRequest {
  id: string;
  data: { memberId: string };
}
export interface editOrganizationResponse {
  success: Boolean;
  message: string;
}
export interface deleteOrganizationResponse {
  success: Boolean;
  message: string;
}

export const organizationMembers = {
  organizationMembers: async (
    data: organizationRequest
  ): Promise<organizationResponse> => {
    const response = await apiClient.get<organizationResponse>(
      `/api/organization/${data.id}`
    );
    return response.data;
  },
  editOrganizationMember: async (
    data: editOrganizationRequest
  ): Promise<editOrganizationResponse> => {
    const response = await apiClient.post<editOrganizationResponse>(
      `/api/organization/${data.id}`,
      data.data
    );
    return response.data;
  },
  deleteOrganizationMember: async (
    data: deleteOrganizationRequest
  ): Promise<deleteOrganizationResponse> => {
    const response = await apiClient.delete<deleteOrganizationResponse>(
      `/api/organization/${data.id}`,
      { data: data.data }
    );
    return response.data;
  },
  addMember: async (data: addMemberRequest): Promise<addMemberResponse> => {
    const response = await apiClient.post<addMemberResponse>(
      "/api/organization/add",
      data
    );
    return response.data;
  },
};
