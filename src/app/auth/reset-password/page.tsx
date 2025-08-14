"use client"
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdError } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { checkPasswordStrength } from "@/utils/password-strength"; 
import { ResetPasswordFormValues, ResetPasswordSchema } from "@/types/auth/reset-password";
import { useresetPasswordMutation } from "@/hooks/use-auth-mutations";
import { useSearchParams } from "next/navigation";
import { FiLoader } from "react-icons/fi";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams()
  const token  = searchParams.get("token")||""
  const [showPassword, setShowPassword] = useState(false);
    const resetPasswordMutation = useresetPasswordMutation()
  

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const password = watch("password");
  useEffect(() => {
    const strength = checkPasswordStrength(password || "");
    setPasswordStrength(strength);
  }, [password]);
  const handlePasswordReset = async (data: ResetPasswordFormValues) => {
     resetPasswordMutation.mutate({
      password:data.password,
      token
     })
   
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center rounded-xl bg-white">
      {/* Header */}
      <div className="forgot-header text-center">
        <h3 className="text-[#0F172A] font-medium text-[20px]  font-sfDisplay leading-[140%] mb-2">
          Reset Password
        </h3>
        <p className="text-[14px] font-normal font-sfDisplay leading-[140%] text-[#64748B] space-y-[14px] px-[44px]">
          Enter your new password to reset your password
        </p>
      </div>

      {/* Form */}
      <form
        className="flex flex-col gap-5 md:w-[25rem] w-[21rem] mt-4"
        onSubmit={handleSubmit(handlePasswordReset)}
      >
        {/* Password Section */}
        <div className="password flex flex-col gap-1 relative">
          <label
            htmlFor="password"
            className="text-sm font-inter font-medium text-[#0F0F10]"
          >
            Password <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              className={`w-full border  rounded-lg px-4 py-2.5 outline-none bg-transparent active:bg-[#F8FAFB] font-inter text-sm font-normal h-12 ${
                errors.password ? "border-[#DE2C41]" : "border-[#EAEDF2]"
              } focus:border-[#005294]`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                showPassword ? "text-black" : "text-[#888E9E]"
              }`}
            >
              {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
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
                <IoMdCheckmark className="text-[#465FF140]" /> Contains a number
                or symbol
              </li>
            </ul>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 flex items-center justify-center gap-2 bg-[#005294] hover:bg-[#0e68b3] text-white h-[44px] rounded-[12px] w-full font-medium text-[14px]  leading-[140%] font-sfDisplay  mb-5"
          disabled={loading}
        >
        {resetPasswordMutation.isLoading && <FiLoader className="animate-spin" />}

          {resetPasswordMutation.isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
