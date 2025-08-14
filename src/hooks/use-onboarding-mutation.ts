"use client";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { onBoardApi, onBoardRequest } from "@/lib/on-Board/onBoard";
import { setTokens } from "@/lib/auth";

export function useOnBoardingMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: onBoardRequest) => onBoardApi.onBoarding(data),
    onSuccess: (data) => {
      console.log(data);
      // Store tokens

      toast.success(data.message || "Successfull OnBoarding");
      localStorage.removeItem("tempToken");
      // Navigate after success
      // inside onSuccess
      setTokens(data.accessToken, data.refreshToken);

      router.push("/dashboard");
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
