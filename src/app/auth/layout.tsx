"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import VerifyWelcome from "@/components/common/welcome/VerifyWelcome";
import SignupWelcome from "@/components/common/welcome/SignupWelcome";
import WelcomeBackForgetPassword from "@/components/common/welcome/forgetPasswordWelcome";
import WelcomeBack from "@/components/common/welcome/WelcomeBack";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;
  const isSignIn = pathname === "/auth/sign-in";
  const isSignUp = pathname === "/auth/sign-up";
  const forgetpassword = pathname === "/auth/forgot-password";

  return (
    <div className="md:p-0 h-[100vh]  overflow-hidden fixed w-full  ">
      <div
        className={`md:flex w-full h-full overflow-hidden ${
          isSignIn || forgetpassword || pathname.startsWith("/reset-password")
            ? "md:flex-row"
            : "md:flex-row-reverse"
        }`}
      >
        <div className="w-2/4 h-full hidden md:block lg:my-auto md:p-2 lg:p-3">
          {isSignIn || pathname.startsWith("/reset-password") ? (
            <WelcomeBack />
          ) : isSignUp ? (
            <>
              <SignupWelcome />
            </>
          ) : forgetpassword ? (
            <WelcomeBackForgetPassword />
          ) : pathname.startsWith("/") ||
            pathname.startsWith("/create-portfolio") ? (
            <SignupWelcome subHeading={"Let’s add some data"} />
          ) : (
            <VerifyWelcome />
          )}
        </div>

        <div className="flex flex-col items-center justify-between md:p-3 w-full md:w-2/4 h-full py-7 md:h-auto custom-scrollbar-hide overflow-y-scroll ">
          <div className="h-auto flex items-center justify-center flex-col my-auto">
            <div className="flex justify-center  ">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-8 bg-primaryBlue rounded-md flex items-center justify-center">
                  <div className="text-white font-bold text-sm">TMS</div>
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  <span className="text-primaryBlue">Task</span> Manamgement
                  <span className="text-primaryBlue"> System</span>
                </span>
              </div>
            </div>
            <>
              <div
                className={`${
                  isSignIn || isSignUp ? "hidden md:flex" : "hidden"
                }   bg-blue-50 rounded-lg p-[2px] md:w-[24rem] 
                    mt-4
                  w-[20rem] mb-3 lg:mb-5`}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/auth/sign-in`);
                  }}
                  className={`flex-1 py-[5px] rounded-lg font-medium transition ${
                    isActive("/auth/sign-in")
                      ? "bg-primaryBlue text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/auth/sign-up`);
                  }}
                  className={`flex-1 py-[5px] rounded-lg font-medium transition ${
                    isActive("/auth/sign-up")
                      ? "bg-primaryBlue text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
