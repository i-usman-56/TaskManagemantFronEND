"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FiLoader } from "react-icons/fi";
import { MdError } from "react-icons/md";
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { toast } from "react-toastify"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { SignInFormValues, signInSchema } from "@/types/auth/login"



export default function LoginPage() {
 const [showPassword, setShowPassword] = useState(false);
 

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const handleGoogleLogin = () => {
  };

  const handleLogin = async (data: SignInFormValues) => {
    try {
      setLoading(true);
      console.log(data)
     
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Login Error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
      <div className="flex flex-col items-center md:w-[25rem] w-[21rem] mt-5 lg:mt-8 xl:mt-[32px]">
      <form onSubmit={handleSubmit(handleLogin)} className="w-full">
        <div className="inputs flex flex-col gap-6">
          <div className="email flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              Email Address
              <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`w-full border rounded-[12px] px-4 py-2.5 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#0079DB] focus:shadow-md focus:shadow-blue-100/50 ${
                  errors.email ? "border-[#DE2C41]" : "border-[#EAEDF2]"
                }`}
                placeholder="Enter Email Address"
                autoFocus
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <MdError />
                {errors.email.message}
              </p>
            )}
          </div>
        
          <div className="password flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
              >
                Password
                <span className="text-red-600">*</span>
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                className={`w-full border  rounded-[12px] px-4 py-2.5 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#0079DB] focus:shadow-md focus:shadow-blue-100/50  ${
                  errors.password ? "border-[#DE2C41]" : "border-[#EAEDF2]"
                }`}
                placeholder="Enter Password"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeIcon size={20} color="black" />
                ) : (
                  <EyeOffIcon size={20} color="#888E9E" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <MdError /> {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <div className="gap-2 flex items-center justify-normal">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="accent-[#005294]"
                onClick={(e) => e.stopPropagation()}
              />
              <label
                htmlFor="rememberMe"
                className="text-[16px] font-medium cursor-pointer leading-[150%] tracking-[-2%] font-manrope text-[#1A1C1E]"
              >
                Remember Me
              </label>
            </div>
              <Link href={`/auth/forget-password`}>
            <div>
              <button
                type="button" // Change to button type to prevent form submission
               
                className="text-[#005294] text-[16px] font-medium  font-manrope leading-[150%] tracking-[-2%]  "
                >
                Forget Password?
              </button>
            </div>
                </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-5 flex items-center justify-center gap-2 bg-[#005294] hover:bg-[#0e68b3] text-white h-[44px] rounded-[12px] w-full font-medium font-sfDisplay leading-[140%] text-[14px]"
        >
          {isLoading && <FiLoader className="animate-spin" />}
          Sign In
        </button>
      </form>

      <div className="w-full  mt-4  text-[#D9D9D9]">
        <div className="flex items-center w-full  justify-center gap-3 mb-5">
          {/* <hr className="flex-1 bg-[#D9D9D9]" /> */}
          <p className="text-[14px] font-normal font-sfDisplay leading-[140%] space-y-[14px] text-[#64748B]  ">
            or
          </p>
          {/* <hr className="flex-1 bg-[#D9D9D9]" /> */}
        </div>
        <div className=" w-full ">
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className="border-[#E2E8F0] rounded-[12px] w-full gap-2"
          >
            <Image
              src="/googleicon.png"
              alt="google"
              className="w-[24px] h-[24px]"
              width={24} height={24}
            />
            <p className="text-[14px] font-medium  text-center text-[#00111F] ">
              Google
            </p>
          </Button>
          
        </div>
        <div className="flex flex-col pb-1 items-center justify-center text-nowrap gap-2 md:gap-3  pt-5 xl:pt-[32px]">
          <div>
            <p className="text-[14px] leading-[140%] space-y-[14px] font-sfDisplay font-normal text-[#64748B] text-center md:text-left">
              © 2024 Hey Dividend, LLC. All rights reserved.
            </p>
          </div>

        
        </div>
      </div>
    </div>
  )
}
