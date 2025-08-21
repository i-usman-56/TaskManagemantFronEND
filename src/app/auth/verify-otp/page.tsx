"use client";
import React from "react";

import VerifyOTPForm from "@/components/screens/verify-opt-form";
import {
  use2faResendOTPMutation,
  use2faVerifyOTPMutation,
  useResendOTPMutation,
  useVerifyOTPMutation,
} from "@/hooks/use-auth-mutations";
import { useSearchParams } from "next/navigation";

const VerifyOTP = () => {
  const Params = useSearchParams();

  const verify2fa = Boolean(Params.get("2faVerify"));
  const resendMutation = useResendOTPMutation();
  const resend2faMutation = use2faResendOTPMutation();
  const verifyOTPMutation = useVerifyOTPMutation();
  const verify2faOTPMutation = use2faVerifyOTPMutation();

  // Handle OTP Verification
  const handleVerificationSubmit = async (otpCode: string) => {
    const tempToken = localStorage.getItem("tempToken") || "";
    if (verify2fa) {
      verify2faOTPMutation.mutate({
        tempToken,
        otp: otpCode,
      });
    } else {
      verifyOTPMutation.mutate({
        tempToken,
        otp: otpCode,
      });
    }
  };

  // Handle Resending OTP Request
  const handleResendOTP = async (e: React.FormEvent) => {
    const tempToken = localStorage.getItem("tempToken") || "";

    e.preventDefault();
    if (verify2fa) {
      resend2faMutation.mutate({ tempToken });
    } else {
      resendMutation.mutate({ tempToken });
    }
  };

  return (
    <VerifyOTPForm
      email={`usman@gmail.com`}
      handleVerificationSubmit={handleVerificationSubmit}
      handleResendOTP={handleResendOTP}
      isLoading={verifyOTPMutation.isLoading || verify2faOTPMutation.isLoading}
      isResendingOtp={resendMutation.isLoading || resend2faMutation.isLoading}
      error={""}
    />
  );
};

export default VerifyOTP;
