"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  accountInfoRequest,
  authApi,
  CheckUsernameRequest,
  forgotPasswordRequest,
  generalSettingRequest,
  LoginRequest,
  RegisterRequest,
  resend2faRequest,
  resendRequest,
  resetPasswordRequest,
  updatePasswordRequest,
  verification2faRequest,
  verificationRequest,
  verifyRequest,
} from "@/lib/api/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setTokens } from "@/lib/auth";
export function useRegisterMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data) => {
      console.log(data);
      // Store tokens

      toast.success(data.message || "Registration Successful");
      localStorage.setItem("tempToken", data.tempToken);
      // Navigate after success
      // inside onSuccess
      router.push(
        `/auth/sign-up/verification-choice?userid=${
          data.payload.userid
        }&email=${encodeURIComponent(
          data.payload.email
        )}&countryCode=${encodeURIComponent(
          data.payload.countryCode
        )}&phoneNumber=${data.payload.phoneNumber}`
      );
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Registration Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useLoginMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      if (data.status === 202) {
        toast.success(data.data.message || "Please verify OTP");
        localStorage.setItem("tempToken", data.data.tempToken);

        return router.push(
          `/auth/verify-otp?channel=${data.data.channel}&2faVerify=true`
        );
      }
      console.log(data);
      // Store tokens

      toast.success(data.data.message || "Login Successful");
      setTokens(data.data.accessToken, data.data.refreshToken);
      router.push("/");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      const data = error.response.data;
      console.log(data);
      if (error.response?.status === 422) {
        toast.success(errorMessage || "Boardin case handel");
        localStorage.setItem("tempToken", error.response.data.tempToken);

        return router.push(`/onBoarding`);
      } else if (error.response?.status === 403) {
        localStorage.setItem("tempToken", error.response.data.tempToken);
        toast.success(errorMessage || "Please Verify Your Account First");
        return router.push(
          `/auth/sign-up/verification-choice?userid=${
            data.payload.userid
          }&email=${encodeURIComponent(
            data.payload.email
          )}&countryCode=${encodeURIComponent(
            data.payload.countryCode
          )}&phoneNumber=${data.payload.phoneNumber}`
        );
      }
      console.log(error);

      toast.error(errorMessage || "Login Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useVerificaationChoiceMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: verificationRequest) => authApi.verificationChoice(data),
    onSuccess: (data) => {
      console.log(data);
      // Store tokens

      toast.success(data.message || "OTP Send");
      localStorage.setItem("tempToken", data.tempToken);
      // Navigate after success
      // inside onSuccess
      router.push(`/auth/verify-otp?channel=${data.channel}`);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "OTP Send Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useResendOTPMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: resendRequest) => authApi.resendOTP(data),
    onSuccess: (data) => {
      console.log(data);
      // Store tokens

      toast.success(data.message || "OTP Resend");
      localStorage.setItem("tempToken", data.tempToken);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "OTP Resend Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useVerifyOTPMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: verifyRequest) => authApi.verifyOTP(data),
    onSuccess: (data) => {
      console.log(data);
      // Store tokens

      toast.success(data.message || "Verifucation SuccesFull");
      localStorage.setItem("tempToken", data.tempToken);
      return router.push(`/onBoarding`);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Verification Failed");

      console.error("Registration error:", error);
    },
  });
}
export function use2faResendOTPMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: resend2faRequest) => authApi.resend2faOTP(data),
    onSuccess: (data) => {
      console.log(data);
      // Store tokens

      toast.success(data.message || "OTP Resend");
      localStorage.setItem("tempToken", data.tempToken);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "OTP Resend Failed");

      console.error("Registration error:", error);
    },
  });
}
export function use2faVerifyOTPMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: verification2faRequest) => authApi.verify2faOTP(data),
    onSuccess: (data) => {
      console.log(data);
      // Store tokens

      toast.success(data.message || "Login Successful");
      setTokens(data.accessToken, data.refreshToken);
      router.push("/");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Verification Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useaccountInfoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: accountInfoRequest) => authApi.accountInfo(data),
    onSuccess: (data) => {
      console.log(data);

      toast.success(data.message || "Account Info Setting Updated SuccesFully");
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Verification Failed");

      console.error("Registration error:", error);
    },
  });
}
export function usegeneralSettingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => authApi.generalSetting(data),
    onSuccess: (data) => {
      console.log(data);

      toast.success(data.message || "Account Info Setting Updated SuccesFully");
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Verification Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useUpdatePasswordMutation() {
  return useMutation({
    mutationFn: (data: updatePasswordRequest) => authApi.updatePassword(data),
    onSuccess: (data) => {
      toast.success(data.message || "Password Updated SuccesFully");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Verification Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useenable2faMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { channel: string; disabled: Boolean }) =>
      authApi.enable2fa(data),
    onSuccess: (data) => {
      toast.success(data.message || "Password Updated SuccesFully");
      if (data.disabled) {
        queryClient.invalidateQueries({ queryKey: ["user-info"] });
      }
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Verification Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useverify2faMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { otp: string }) => authApi.verify2fa(data),
    onSuccess: (data) => {
      toast.success(data.message || "Password Updated SuccesFully");
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Verification Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useresend2faMutation() {
  return useMutation({
    mutationFn: () => authApi.resend2fa(),
    onSuccess: (data) => {
      toast.success(data.message || "Password Updated SuccesFully");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Verification Failed");

      console.error("Registration error:", error);
    },
  });
}
export function usedeleteAccountMutation() {
  return useMutation({
    mutationFn: () => authApi.deleteAccount(),
    onSuccess: (data) => {
      toast.success(data.message || "Password Updated SuccesFully");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Verification Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useAccountTypeQuery() {
  return useQuery({
    queryKey: ["accountType"], // ✅ cache key for this query
    queryFn: () => authApi.accountType(), // ✅ use queryFn
    onSuccess: (data) => {},
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Verification Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useUserInfoQuery() {
  return useQuery({
    queryKey: ["user-info"], // ✅ cache key for this query
    queryFn: () => authApi.userInfo(), // ✅ use queryFn
    onSuccess: (data) => {},
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Verification Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useforgotPasswordMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: forgotPasswordRequest) => authApi.forgotPassword(data),
    onSuccess: (data) => {
      // Store tokens

      toast.success(data.message || "Email Link Send SuccessFully");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Email Not Found");

      console.error("Registration error:", error);
    },
  });
}
export function useresetPasswordMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: resetPasswordRequest) => authApi.resetPassword(data),
    onSuccess: (data) => {
      console.log(data);
      // Store tokens

      toast.success(data.message || "Password Update SuccesFully");
      router.push("/auth/sign-in");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Email Not Found");

      console.error("Registration error:", error);
    },
  });
}
export function useCheckUsernameMutation() {
  return useMutation({
    mutationFn: (data: CheckUsernameRequest) => authApi.checkUsername(data),
    onError: (error: any) => {
      console.error("Username check error:", error);
    },
  });
}
