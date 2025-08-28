"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FiLoader, FiMail } from "react-icons/fi"
import PhoneInput from "@/components/common/phone-input"
import { useSearchParams } from "next/navigation"
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js"
import { useVerificaationChoiceMutation } from "@/hooks/use-auth-mutations"

const verificationSchema = z
  .object({
    channel: z.enum(["email", "sms"]),
    email: z.string().email("Please enter a valid email").optional(),
    phone: z.string().optional(),
    countryCode: z.string().optional(),
  })
  .refine(
    (data) => data.channel === "email" ? !!data.email : true,
    { path: ["email"], message: "Email is required" }
  )
  .refine(
    (data) => data.channel === "sms" ? !!data.phone : true,
    { path: ["phone"], message: "Phone number is required" }
  );


type VerificationFormData = z.infer<typeof verificationSchema>

const VerificationChoice = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [phoneValid, setPhoneValid] = useState(false)
    const searchParams = useSearchParams();

const emailParam = decodeURIComponent(searchParams.get("email") || "");
  const countryCode = decodeURIComponent(searchParams.get("countryCode")||"");
  const phoneNumber = searchParams.get("phoneNumber")||"";
    const choiceMutation = useVerificaationChoiceMutation()
  

const {
  register,
  handleSubmit,
  watch,
  setValue,
  formState: { errors },
} = useForm<VerificationFormData>({
  resolver: zodResolver(verificationSchema),
  defaultValues: {
    channel: "email",
    email: emailParam || "",
    phone: phoneNumber || "",
    countryCode: countryCode || "",
  },
});

  const selectedChannel = watch("channel")



  const handlePhoneChange = (phone: string, countryCode: string, isValid: boolean) => {
    setValue("phone", phone)
    setValue("countryCode", countryCode)
    setPhoneValid(isValid)
    console.log("Phone changed:", { phone, countryCode, isValid })
  }
  useEffect(()=>{
     const isValid = isValidPhoneNumber(`${countryCode}${phoneNumber}`)
        console.log(isValid)
    handlePhoneChange(phoneNumber,countryCode,isValid)
  },[])

  const onSubmit = (data: VerificationFormData) => {
    const tempToken = localStorage.getItem("tempToken")||""

    console.log("=== VERIFICATION CHOICE SUBMISSION ===")
    console.log("Form Data:", data)
    console.log("TempToken:", tempToken)
    console.log("Selected Channel:", data.channel)
    console.log("=====================================")

    setIsLoading(true)

   choiceMutation.mutate({
    channel:data.channel,
    tempToken
    })
  }
  const getCountryCode = (phone: string) => {
  try {
    const phoneNumber = parsePhoneNumber(phone);
    return phoneNumber?.country || null; // Example: 'PK', 'US'
  } catch (error) {
    console.error('Invalid phone number:', error);
    return null;
  }
};
       



  return (
    <div className="flex flex-col items-center rounded-xl bg-white">
      <h1 className="text-[20px] font-sfDisplay font-medium leading-[140%] text-[#0F172A] mt-5 xl:mt-[40px] text-center">
        OTP Verification
      </h1>
      <p className="mb-4 lg:mb-6 xl:mb-8 text-[14px] font-sfDisplay text-[#64748B] pt-2 font-normal leading-[140%] space-y-[14px] text-center">
        Choose your verification method
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:w-[25rem] w-[21rem]">
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setValue("channel", "email")}
            className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
              selectedChannel === "email"
                ? "bg-[#005294] text-white border-[#005294]"
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setValue("channel", "sms")}
            className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
              selectedChannel === "sms"
                ? "bg-[#005294] text-white border-[#005294]"
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            Phone
          </button>
        </div>

        {selectedChannel === "email" && (
          <div className="email flex flex-col gap-1 mb-3">
            <label
              htmlFor="email"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A] mb-1"
            >
              Email
            </label>
            <div className="flex items-center relative w-full">
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full rounded-[12px] px-3 pl-12 py-2 outline-none bg-slate-200/50 font-inter border text-sm font-normal h-10 border-[#EAEDF2] cursor-not-allowed"
                placeholder="Auto-filled from token"
                // readOnly
              />
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>
        )}

        {selectedChannel === "sms" && (
          <div className="mb-3">
            <PhoneInput
              value={phoneNumber || ""}
              countrycode = {getCountryCode(`${countryCode}${phoneNumber}`)|| ""}
              onChange={handlePhoneChange}
              error={!phoneValid && watch("phone") ? "Please enter a valid phone number" : ""}
              placeholder="Auto-filled from token"
              disabled={true}
            />
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={choiceMutation.isLoading}
            className="flex items-center justify-center gap-2 bg-[#005294] hover:bg-[#0e68b3] disabled:opacity-50 disabled:cursor-not-allowed text-white py-[16px] rounded-[8px] w-[80%] text-[14px] font-sfDisplay font-normal leading-[140%]"
          >
            {choiceMutation.isLoading && <FiLoader className="animate-spin" />}
            Continue
          </button>
        </div>
      </form>

      <div className="flex flex-col pb-1 items-center justify-center text-nowrap gap-2 md:gap-3 pt-5 xl:pt-[32px]">
        <div>
          <p className="text-[14px] leading-[140%] space-y-[14px] font-sfDisplay font-normal text-[#64748B] text-center md:text-left">
            © 2025 TMS, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerificationChoice
