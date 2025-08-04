"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
            {true && (
              <>
                <motion.div
                  className={` lg:py-[18px] ${
                    isSignUp ? "hidden" : "hidden md:block"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                />

                <div
                  className={`${
                    isSignIn ? "hidden md:flex" : "hidden"
                  } bg-blue-50 rounded-lg p-[2px] md:w-[24rem] 
                      g:mt-7 xl:mt-[44px] mt-6
                  w-[20rem] mb-3 lg:mb-5`}
                >
                  <button
                    className={`flex-1 py-[5px] rounded-lg font-medium transition ${
                      isActive("/auth/sign-in")
                        ? "bg-primaryBlue text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
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
            )}

            {isSignUp && (
              <>
                <motion.div
                  className={`lg:my-[18px] hidden md:block`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                />

                <div
                  className={`hidden md:flex bg-blue-50 rounded-lg p-[2px] md:w-[24rem] ${
                    isSignUp
                      ? "lg:-mt-[5px] xl:-mt-0 mt-8"
                      : "lg:mt-7 xl:mt-[48px] mt-6"
                  } w-[20rem] mb-3 lg:mb-5`}
                >
                  <button
                    className={`flex-1 py-[5px] rounded-[34px] font-medium transition ${
                      isActive("/auth/sign-in")
                        ? "bg-primaryBlue text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
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
            )}

            <AnimatePresence>
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
