"use client"
import { FiLoader } from "react-icons/fi";
import { MdError } from "react-icons/md";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import smsSvg from '@/assets/sms.svg'

import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";
import { checkPasswordStrength } from "@/utils/password-strength";
import { IoMdCheckmark } from "react-icons/io";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { registerSchema, RegisterSchemaFormValues } from "@/types/auth/sign-up";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDividend, setIsDividend] = useState(true);
  const [isAskDividend, setIsAskDividend] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    strength: "",
    score: 0,
    checks: {
      length: false,
      number: false,
      symbol: false,
      nameEmail: true,
    },
  });
  const handleGoogleLogin = () => {
  };




  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterSchemaFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password");
  const repeatpassword = watch("repeatpassword");
  // const fullName = watch("fullName");
  const lastName = watch("lastName");
  const firstName = watch("firstName");
  const username = watch("username");
  const email = watch("email");

  useEffect(() => {
    const strength = checkPasswordStrength(password || "", username, email);
    setPasswordStrength(strength);
  }, [password, username, email]);

  const handleRegister = async (data: RegisterSchemaFormValues) => {
    // debugger
    if (!isDividend && !isAskDividend) {
      return toast.error("Please choose at least one subscription");
    }
    console.log(data);

    setIsLoading(true);
   
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div className="flex flex-col items-center md:w-[25rem] w-[21rem]">
      <form
        onSubmit={handleSubmit(handleRegister)}
        method="post"
        className="w-full "
      >
        <div className="inputs flex flex-col gap-3 ">
          <div className="username flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              Username
              {/* <span className="text-red-600"> *</span> */}
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className={`w-full border  rounded-[12px] px-4 py-2 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
                errors.username ? "border-[#DE2C41]" : "border-[#EAEDF2]"
              }`}
              placeholder="Enter Username"
              autoFocus
              autoComplete="off"
            />
            {errors.username && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <MdError size={16} /> {errors.username.message}
              </p>
            )}
          </div>
          <div className="firstName flex flex-col gap-2">
            <label
              htmlFor="firstName"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              First Name
              {/* <span className="text-red-600"> *</span> */}
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className={`w-full border  rounded-[12px] px-4 py-2 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
                errors.firstName ? "border-[#DE2C41]" : "border-[#EAEDF2]"
              }`}
              placeholder="Enter First Name"
              autoFocus
              autoComplete="off"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <MdError size={16} /> {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="lastName flex flex-col gap-2">
            <label
              htmlFor="lastName"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              Last Name
              {/* <span className="text-red-600"> *</span> */}
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className={`w-full border  rounded-[12px] px-4 py-2 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
                errors.lastName ? "border-[#DE2C41]" : "border-[#EAEDF2]"
              }`}
              placeholder="Enter Last Name"
              autoFocus
              autoComplete="off"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <MdError size={16} /> {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="email flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              Email Address
              {/* <span className="text-red-600"> *</span> */}
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`w-full border rounded-[12px] px-4 py-2 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
                  errors.email ? "border-[#DE2C41]" : "border-[#EAEDF2]"
                }`}
                placeholder="Enter Email"
              />
              <Image
                src={smsSvg}
                alt="mail icon"
                width={20}
                height={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
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
            <label
              htmlFor="password"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              Password
              {/* <span className="text-red-600"> *</span> */}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                className={`w-full border  rounded-[12px] px-4 py-2 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
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
            <div className="mt-2 space-y-1 font-[400] text-[#26203B] text-xs">
              <ul className="space-y-1 text-gray-600">
                {password && (
                  <li
                    className={`flex items-center gap-1 text-[12px] font-sfDisplay font-normal leading-[140%]  ${
                      !password || passwordStrength.checks?.nameEmail
                        ? "text-gray-600"
                        : "text-red-600"
                    }`}
                  >
                    <IoMdCheckmark className="text-[#465FF140]" />{" "}
                    <p
                      className={`flex items-center gap-1 text-[12px] font-sfDisplay font-normal leading-[140%]  ${
                        passwordStrength.strength === "Strong"
                          ? "text-green-600"
                          : passwordStrength.strength === "Medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      Password Strength: {passwordStrength.strength || "Weak"}
                    </p>
                  </li>
                )}
                <li
                  className={`flex items-center gap-1  text-[12px] font-sfDisplay font-normal leading-[140%] ${
                    !password || passwordStrength.checks?.nameEmail
                      ? "text-[#94A3B8]"
                      : ""
                  }`}
                >
                  <IoMdCheckmark className="text-[#465FF140]" /> Cannot contain
                  your name or email address
                </li>
                <li
                  className={`flex items-center gap-1 ${
                    !password || passwordStrength.checks?.length
                      ? "text-[#94A3B8]"
                      : "text-red-600"
                  }`}
                >
                  <IoMdCheckmark className="text-[#465FF140]" /> At least 8
                  characters
                </li>
                <li
                  className={`flex items-center gap-1 text-[12px] font-sfDisplay font-normal leading-[140%]  ${
                    !password ||
                    passwordStrength.checks?.number ||
                    passwordStrength.checks?.symbol
                      ? "text-[#94A3B8]"
                      : "text-red-600"
                  }`}
                >
                  <IoMdCheckmark className="text-[#465FF140]" /> Contains a
                  number or symbol
                </li>
              </ul>
            </div>
          </div>
          <div className="showRepeatPassword flex flex-col gap-2 mt-[3px]">
            <label
              htmlFor="showRepeatPassword"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              Repeat Password
              {/* <span className="text-red-600"> *</span> */}
            </label>
            <div className="relative">
              <input
                type={showRepeatPassword ? "text" : "password"}
                id="showRepeatPassword"
                {...register("repeatpassword")}
                className={`w-full border  rounded-[12px] px-4 py-2 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
                  errors.repeatpassword
                    ? "border-[#DE2C41]"
                    : "border-[#EAEDF2]"
                }`}
                placeholder="Enter Password"
              />
              <button
                type="button"
                onClick={toggleShowRepeatPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showRepeatPassword ? (
                  <EyeIcon size={20} color="black" />
                ) : (
                  <EyeOffIcon size={20} color="#888E9E" />
                )}
              </button>
            </div>
            {errors.repeatpassword && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <MdError /> {errors.repeatpassword.message}
              </p>
            )}
            <div className="mt-2 space-y-1 font-[400] text-[#26203B] text-xs">
              <ul className="space-y-1 text-gray-600">
                {password && repeatpassword && password !== repeatpassword && (
                  <li className="flex items-center gap-1 text-red-600">
                    <MdError />
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      Password Does Not Match
                    </p>
                  </li>
                )}
              </ul>
            </div>
           
          </div>
                  </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-5 flex items-center justify-center gap-2 bg-[#005294] hover:bg-[#0e68b3] text-white py-[16px] rounded-[8px] w-[100%] text-[14px] font-sfDisplay font-normal leading-[140%] "
          >
            {isLoading && <FiLoader className="animate-spin" />}
            Create Account
          </button>
        </div>
      </form>

      <div className="w-full mt-4 text-[#D9D9D9]">
        <div className="flex items-center w-full  justify-center gap-3 mb-5">
          {/* <hr className="flex-1 bg-[#D9D9D9]" /> */}
          <p className="text-[14px] font-normal leading-[140%] font-sfDisplay space-y-[14px] text-[#64748B]  ">
            or
          </p>
          {/* <hr className="flex-1 bg-[#D9D9D9]" /> */}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="border-[#E2E8F0] w-full rounded-[12px] gap-2"
          >
            <img
              src="/googleicon.png"
              alt="google"
              className="w-[24px] h-[24px]"
            />
            <p className="text-[14px] font-medium  text-center text-[#00111F] ">
              Google
            </p>
          </Button>
         
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
