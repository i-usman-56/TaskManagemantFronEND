"use client"
import React, { useState, useRef } from "react";
import { FiLoader } from "react-icons/fi";
import { maskEmail, maskPhoneNumber } from "@/utils/utils";


interface VerifyOTPFormProps {
  email: string;
  handleVerificationSubmit: (otpCode: string) => void;
  handleResendOTP: (e: React.FormEvent) => void;
  isLoading: boolean;
  isResendingOtp: boolean;
  error: string | null;
}

const VerifyOTPForm: React.FC<VerifyOTPFormProps> = ({
  email,
  handleVerificationSubmit,
  handleResendOTP,
  isLoading,
  isResendingOtp,
  error,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState<string | null>(null);
  const otpChannel:string=''
  const phoneNumber=''
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle OTP submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) {
      setErrors("All fields must be filled.");
      return;
    }
    setErrors(null);
    const otpCode = otp.join("");
    handleVerificationSubmit(otpCode);
  };

  // Enhanced input change handler with auto-navigation
  const handleChange = (value: string, index: number) => {
    // Only allow numeric input
    const numericValue = value.replace(/[^0-9]/g, "");
    
    const newOtp = [...otp];
    newOtp[index] = numericValue.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input if value is entered
    if (numericValue && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace and navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // If current field is empty, move to previous field and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste functionality
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const numericData = pastedData.replace(/[^0-9]/g, "");
    
    if (numericData.length > 0) {
      const newOtp = [...otp];
      const pasteLength = Math.min(numericData.length, 4 - index);
      
      for (let i = 0; i < pasteLength; i++) {
        if (index + i < 4) {
          newOtp[index + i] = numericData[i];
        }
      }
      
      setOtp(newOtp);
      
      // Focus the next empty field or the last field
      const nextFocusIndex = Math.min(index + pasteLength, 3);
      inputRefs.current[nextFocusIndex]?.focus();
    }
  };

  // Handle focus to select all text
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[#0F172A] font-medium font-sfDisplay text-[20px] leading-[140%] mt-6 mb-2">
        OTP Confirmation
      </h1>
      {otpChannel === "email" ? (
        <p className="text-[#64748B] font-normal font-sfDisplay text-[14px] leading-[140%] text-center mb-5 w-3/5">
          We have sent the verification code to your Email Address :{" "}
          <span>{maskEmail(email)}</span>
        </p>
      ) : (
        <p className=" text-[#64748B] font-normal font-sfDisplay text-[14px] leading-[140%] text-center mb-5 w-3/5">
          We have sent the verification code to your Phone Number ending in{" "}
          {maskPhoneNumber(phoneNumber)}
        </p>
      )}
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center my-6 md:w-[25rem] w-[21rem]"
      >
        <div className="flex gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
ref={(el) => {
  inputRefs.current[index] = el;
}}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              id={`otpInput-${index}`}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e, index)}
              onFocus={handleFocus}
              className={`w-14 h-14 border text-center rounded-lg px-3 py-2 outline-none bg-transparent font-bold font-poppins text-2xl ${
                errors ? "border-red-500" : ""
              }`}
            />
          ))}
        </div>
        {errors && (
          <p className="text-red-500 text-sm text-center mb-2">{errors}</p>
        )}
        {error && (
          <p className="text-red-500 text-xs text-center mb-2">
            Invalid Code. Please Try Again
          </p>
        )}

        {/* Resend Code */}

        <button
          type="submit"
          disabled={isLoading}
          className=" flex items-center justify-center gap-2 bg-[#005294] hover:bg-[#0e68b3] text-white py-3 rounded-[12px]  font-sfDisplay font-medium leading-[140%] text-[14px] w-full h-14 mt-6"
        >
          {isLoading && <FiLoader className="animate-spin" />}
          Sign In
        </button>
        <div className="flex items-center gap-3 my-1 mb-2">
          {/* <p className="text-black text-sm font-inter">Need a new code?</p> */}
          <button
            type="button"
            disabled={isResendingOtp}
            className="text-[#005294] cursor-pointer text-sm font-semibold"
            onClick={handleResendOTP}
          >
            {isResendingOtp ? (
              <p className="text-[#64748B] font-medium  flex font-sfDisplay items-center justify-center gap-1">
                {isResendingOtp && <FiLoader className="animate-spin" />}{" "}
                Resending
              </p>
            ) : (
              <p className="hover:underline text-[#64748B] leading-[140%] font-sfDisplay font-medium text-[14px] mt-5 ">Resend new Code</p>
            )}
          </button>
        </div>
      </form>
          <div className="flex flex-col pb-1 items-center justify-center text-nowrap gap-2 md:gap-3 pt-[32px]">
                <div>
                  <p className="text-[14px] leading-[140%] space-y-[14px] font-sfDisplay font-normal text-[#64748B] text-center md:text-left">
                    © 2024 Hey Dividend, LLC. All rights reserved.
                  </p>
                </div>
      
               
              </div>
    </div>
  );
};

export default VerifyOTPForm;