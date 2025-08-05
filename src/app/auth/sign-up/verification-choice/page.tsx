
"use client"
import Image from "next/image";
import React, { useState } from "react";
import { FiLoader, FiPhone } from "react-icons/fi";
import smsSvg from '@/assets/sms.svg'


const VerificationChoice = () => {

  const otpChannel = "email"
  const [isLoading, setIsLoading] = useState(false);


  const handleOtpChoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
  };


  return (
      <div className="flex flex-col items-center rounded-xl bg-white">
        <h1 className="text-[20px] font-sfDisplay font-medium leading-[140%] text-[#0F172A] mt-5 xl:mt-[40px]  text-center">
          OTP Verification
        </h1>
        <p className="mb-4 lg:mb-6 xl:mb-8 text-[14px] font-sfDisplay text-[#64748B] pt-2 font-normal leading-[140%] space-y-[14px]  text-center">
          Enter Email or Phone Number to send <br /> one time Password
        </p>
        <form
          onSubmit={handleOtpChoiceSubmit}
          className="flex flex-col gap-4  md:w-[25rem] w-[21rem]"
          method="post"
        >
          {/* Email Section */}
          <div className="email flex flex-col gap-1 mb-3">
            <label
              htmlFor="email"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A] mb-1"
            >
              Email
            </label>
            <div className="flex">
              

              {/* Email Input */}
              <div className="flex items-center relative w-full">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full rounded-[12px] px-3 pl-12 py-2 outline-none bg-transparent font-inter border text-sm font-normal h-10 ${
                    otpChannel === "email"
                      ? "bg-transparent border-[#005294]"
                      : "bg-slate-200/50"
                  } `}
                  placeholder="Type here..."
                  value={``}
                  onClick={()=>{}}
                  required={otpChannel === "email"}
                  // disabled={otpChannel !== "email"}
                />
                <Image
                  src={smsSvg}
                  alt="mail icon"
                  width={20}
                  height={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-[#005294] hover:bg-[#0e68b3] text-white py-[16px]  rounded-[8px] w-[80%] text-[14px] font-sfDisplay font-normal leading-[140%]"
            >
              {isLoading && <FiLoader className="animate-spin" />}
              Continue
            </button>
          </div>
        </form>
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

export default VerificationChoice;
