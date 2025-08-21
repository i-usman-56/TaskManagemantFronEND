import apiClient from "../../utils/axios";

export interface RegisterRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  countryCode: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  tempToken: string;
  payload: {
    userid: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
  };
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  tempToken: string;
  channel: string;

  payload: {
    userid: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
  };
  user: any;
  accessToken: string;
  refreshToken: string;
}
export interface verificationRequest {
  tempToken: string;
  channel: string;
}

export interface verificationResponse {
  success: Boolean;
  message: string;
  tempToken: string;
  channel: string;
}
export interface verification2faRequest {
  tempToken: string;
  otp: string;
}

export interface verification2faResponse {
  success: Boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
}
export interface resendRequest {
  tempToken: string;
}

export interface resendResponse {
  success: Boolean;
  message: string;
  tempToken: string;
}
export interface resend2faRequest {
  tempToken: string;
}

export interface resend2faResponse {
  success: Boolean;
  message: string;
  tempToken: string;
}
export interface forgotPasswordRequest {
  email: string;
}

export interface forgotPasswordResponse {
  success: Boolean;
  message: string;
}
export interface resetPasswordRequest {
  token: string;
  password: string;
}
export interface accountInfoRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
}
export interface generalSettingRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: any; // File when uploading, null if not set
}

export interface resetPasswordResponse {
  success: Boolean;
  message: string;
}
export interface accountInfoResponse {
  success: Boolean;
  message: string;
}
export interface generalSettingResponse {
  success: Boolean;
  message: string;
}
export interface accountTypeResponse {
  success: Boolean;
  accountType: string;
}
export interface userInfoResponse {
  success: Boolean;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    profilePic: string;
    purposeOfUse: string;
    organizationId: string;
    enable2fa: Boolean;
    phone2fa: Boolean;
    email2fa: Boolean;
  };
}
export interface verifyRequest {
  tempToken: string;
  otp: string;
}

export interface verifyResponse {
  success: Boolean;
  message: string;
  tempToken: string;
}

export interface CheckUsernameRequest {
  username: string;
}

export interface CheckUsernameResponse {
  success: boolean;
  message: string;
}
export interface updatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface updatePasswordResponse {
  success: boolean;
  message: string;
}
export interface enable2faResponse {
  disabled: boolean;
  success: boolean;
  message: string;
}
export interface verify2faResponse {
  success: boolean;
  message: string;
}
export interface resend2faOTPResponse {
  success: boolean;
  message: string;
}
export interface deleteAccountResponse {
  success: boolean;
  message: string;
}

export const authApi = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      "/api/auth/register",
      data
    );
    return response.data;
  },
  login: async (data: LoginRequest) => {
    const response = await apiClient.post<LoginResponse>(
      "/api/auth/login",
      data,
      { validateStatus: (status) => status < 500 } // Throw only for server errors
    );
    if (response.status !== 200 && response.status !== 202) {
      throw { response }; // Force React Query's onError
    }

    return response;
  },

  checkUsername: async (
    data: CheckUsernameRequest
  ): Promise<CheckUsernameResponse> => {
    console.log("Checking username availability:", data.username);

    const response = await apiClient.post<CheckUsernameResponse>(
      "/api/auth/check-username",
      data
    );

    console.log("Username check result:", response.data);

    return response.data;
  },
  verificationChoice: async (
    data: verificationRequest
  ): Promise<verificationResponse> => {
    const response = await apiClient.post<verificationResponse>(
      "/api/auth/choice-otp",
      data
    );
    return response.data;
  },
  resendOTP: async (data: resendRequest): Promise<resendResponse> => {
    const response = await apiClient.post<resendResponse>(
      "/api/auth/resend-otp",
      data
    );
    return response.data;
  },
  verifyOTP: async (data: verifyRequest): Promise<verifyResponse> => {
    const response = await apiClient.post<verifyResponse>(
      "/api/auth/verify-otp",
      data
    );
    return response.data;
  },
  resend2faOTP: async (data: resend2faRequest): Promise<resend2faResponse> => {
    const response = await apiClient.post<resend2faResponse>(
      "/api/auth/resend-login-otp",
      data
    );
    return response.data;
  },
  verify2faOTP: async (
    data: verification2faRequest
  ): Promise<verification2faResponse> => {
    const response = await apiClient.post<verification2faResponse>(
      "/api/auth/login-verify",
      data
    );
    return response.data;
  },
  forgotPassword: async (
    data: forgotPasswordRequest
  ): Promise<forgotPasswordResponse> => {
    const response = await apiClient.post<forgotPasswordResponse>(
      "/api/auth/forgot-password",
      data
    );
    return response.data;
  },
  resetPassword: async (
    data: resetPasswordRequest
  ): Promise<resetPasswordResponse> => {
    const response = await apiClient.post<resetPasswordResponse>(
      "/api/auth/reset-password",
      data
    );
    return response.data;
  },
  accountInfo: async (
    data: accountInfoRequest
  ): Promise<accountInfoResponse> => {
    const response = await apiClient.post<accountInfoResponse>(
      "/api/auth/update-settings",
      data
    );
    return response.data;
  },
  updatePassword: async (
    data: updatePasswordRequest
  ): Promise<updatePasswordResponse> => {
    const response = await apiClient.put<updatePasswordResponse>(
      "/api/auth/update-password",
      data
    );
    return response.data;
  },
  generalSetting: async (data: FormData): Promise<generalSettingResponse> => {
    const response = await apiClient.post<generalSettingResponse>(
      "/api/auth/update-settings",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
  accountType: async (): Promise<accountTypeResponse> => {
    const response = await apiClient.get<accountTypeResponse>(
      "/api/auth/accountype"
    );
    return response.data;
  },
  userInfo: async (): Promise<userInfoResponse> => {
    const response = await apiClient.get<userInfoResponse>(
      "/api/auth/user-info"
    );
    return response.data;
  },
  enable2fa: async (data: {
    channel: string;
    disabled?: Boolean;
  }): Promise<enable2faResponse> => {
    const response = await apiClient.post<enable2faResponse>(
      "/api/auth/enable-2fa",
      data
    );
    return response.data;
  },
  verify2fa: async (data: { otp: string }): Promise<verify2faResponse> => {
    const response = await apiClient.post<verify2faResponse>(
      "/api/auth/verify-2fa",
      data
    );
    return response.data;
  },
  resend2fa: async (): Promise<resend2faOTPResponse> => {
    const response = await apiClient.get<resend2faOTPResponse>(
      "/api/auth/resend-2fa"
    );
    return response.data;
  },
  deleteAccount: async (): Promise<deleteAccountResponse> => {
    const response = await apiClient.delete<deleteAccountResponse>(
      "/api/auth/delete-account"
    );
    return response.data;
  },
};
