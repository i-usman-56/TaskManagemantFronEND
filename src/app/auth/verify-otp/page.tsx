"use client"
import React, { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import VerifyOTPForm from "@/components/screens/verify-opt-form";

const VerifyOTP = () => {
  const queryClient = useQueryClient();
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  // Handle OTP Verification
  const handleVerificationSubmit = async (otpCode: string) => {
   
  };

  // Handle Resending OTP Request
  const handleResendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
   
  };

  return (
      <VerifyOTPForm
        email={`usman@gmail.com`}
        handleVerificationSubmit={handleVerificationSubmit}
        handleResendOTP={handleResendOTP}
        isLoading={isLoading}
        isResendingOtp={isResendingOtp}
        error={error}
      />
  );
};

export default VerifyOTP;
