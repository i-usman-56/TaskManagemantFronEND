"use client"
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import smsSvg from '@/assets/sms.svg'

import { MdError } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { ForgotPasswordForm, ForgotPasswordSchema } from "@/types/auth/forget-password";



const ForgetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const handleForgotPassword = async (data: ForgotPasswordForm) => {
    setLoading(true);
    try {
      console.log(data)
      // await forgetPassword({
      //   email: data.email,
      //   isAskDividend: isAi ? true : false,
      // });
      toast.success("Password reset link sent to your email");
      setError(null);
      // navigate("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      setError("The email you entered is not registered.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <div className="flex flex-col items-center rounded-xl bg-white">
        {/* Header */}
        <div className="forgot-header text-center mt-[44px] my-5">
          <h3 className="text-[#0F172A] font-medium text-[20px]  font-sfDisplay leading-[140%] mb-2">
            Forgot Password
          </h3>
          <p className="text-[14px] font-normal font-sfDisplay leading-[140%] text-[#64748B] space-y-[14px] px-[44px]">
            Enter your email address and we'll send you a <br /> link to reset
            your password
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          method="post"
          className="md:w-[25rem] w-[21rem] gap-6 mt-[32px]"
        >
          {/* Email Section */}
          <div className="email flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[#0F172A] font-medium text-[14px]  font-sfDisplay leading-[140%]"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center relative">
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`w-full border rounded-[12px] px-4 placeholder-red-[#94A3B8] py-2 pl-10 outline-none bg-transparent active:bg-[#F8FAFB] font-inter text-sm font-normal h-10 ${
                  errors.email || error
                    ? "border-[#DE2C41]"
                    : "border-[#EAEDF2]"
                } focus:border-[#005294]`}
                placeholder="tahsankhan380@gmil.com|"
              />
              <Image
                src={smsSvg}
                alt="mail icon"
                width={20}
                height={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <MdError />
                {error}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 flex items-center justify-center gap-2 bg-[#005294] hover:bg-[#0e68b3] text-white h-[44px] rounded-[12px] w-full font-medium text-[14px]  leading-[140%] font-sfDisplay  mb-5"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Sign In Redirect */}
        <div className="text-center flex items-center justify-center">
          <p className="text-[14px] font-medium font-sfDisplay leading-[140%] text-[#64748B] md:text-end mb-4">
            Go to{" "}
            <Link href={`/auth/sign-in`}
              className="hover:underline font-medium leading-[140%] font-sfDisplay text-[#64748B] text-[14px]"
            >
              Sign In
            </Link>
          </p>
        </div>
        <div className="flex flex-col pb-1 items-center justify-center text-nowrap gap-2 md:gap-3  pt-5 xl:pt-[32px]">
          <div>
            <p className="text-[14px] leading-[140%] space-y-[14px] font-sfDisplay font-normal text-[#64748B] text-center md:text-left">
              © 2024 Hey Dividend, LLC. All rights reserved.
            </p>
          </div>

         
        </div>
      </div>
  );
};

export default ForgetPasswordPage;
