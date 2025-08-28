"use client";
import { FiLoader } from "react-icons/fi";
import { MdError } from "react-icons/md";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import smsSvg from "@/assets/sms.svg";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";
import { checkPasswordStrength } from "@/utils/password-strength";
import { IoMdCheckmark } from "react-icons/io";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  useCheckUsernameMutation,
  useRegisterMutation,
} from "@/hooks/use-auth-mutations";
import PhoneInput from "@/components/common/phone-input";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Extended schema with phone validation
const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      )
      .refine((val) => !val.includes("-"), {
        message: "Username cannot contain hyphens (-)",
      })
      .refine((val) => !/^[0-9]/.test(val), {
        message: "Username cannot start with a number",
      })
      .refine((val) => !val.startsWith("_"), {
        message: "Username cannot start with underscore",
      })
      .refine((val) => !val.endsWith("_"), {
        message: "Username cannot end with underscore",
      }),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    countryCode: z.string().min(1, "Country code is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    repeatpassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.repeatpassword, {
    message: "Passwords don't match",
    path: ["repeatpassword"],
  });

type RegisterSchemaFormValues = z.infer<typeof registerSchema>;

const SignUpFormWithPhone = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDividend, setIsDividend] = useState(true);
  const router = useRouter();
  const [isAskDividend, setIsAskDividend] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [usernameChecked, setUsernameChecked] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
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

  const { toast } = useToast();
  const registerMutation = useRegisterMutation();
  const checkUsernameMutation = useCheckUsernameMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterSchemaFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password");
  const repeatpassword = watch("repeatpassword");
  const lastName = watch("lastName");
  const firstName = watch("firstName");
  const username = watch("username");
  const email = watch("email");

  useEffect(() => {
    const strength = checkPasswordStrength(password || "", username, email);
    setPasswordStrength(strength);
  }, [password, username, email]);

  useEffect(() => {
    // Reset states when username changes
    if (username && username.length >= 3) {
      setUsernameChecked(false);
      setUsernameAvailable(false);

      const timeoutId = setTimeout(() => {
        // Only call API if not already checking and username hasn't been checked
        if (!checkUsernameMutation.isLoading) {
          checkUsernameMutation.mutate(
            { username },
            {
              onSuccess: (data: any) => {
                setUsernameChecked(true);
                setUsernameAvailable(data.available || data.success); // Handle both response formats

                if (!data.available || !data.success) {
                  toast({
                    title: "Username Unavailable",
                    description: data.message || "Username Already Taken",
                    variant: "destructive",
                  });
                }
              },
              onError: (error: any) => {
                setUsernameChecked(true);
                setUsernameAvailable(false);
                toast({
                  title: "Error",
                  description: "Failed to check username availability",
                  variant: "destructive",
                });
              },
            }
          );
        }
      }, 2000);

      return () => clearTimeout(timeoutId);
    } else {
      setUsernameChecked(false);
      setUsernameAvailable(false);
    }
  }, [username]);

  const handlePhoneChange = (
    phone: string,
    countryCode: string,
    isValid: boolean
  ) => {
    setValue("phone", phone);
    setValue("countryCode", countryCode);
    setPhoneValid(isValid);

    // Console log as requested
    console.log("Phone Input Changed:");
    console.log("Country Code:", countryCode);
    console.log("Phone Number:", phone);
    console.log("Is Valid:", isValid);
  };

  const handleRegister = async (data: RegisterSchemaFormValues) => {
    if (!phoneValid) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    if (!usernameAvailable && usernameChecked) {
      toast({
        title: "Username Unavailable",
        description: "Please choose a different username",
        variant: "destructive",
      });
      return;
    }

    if (!isDividend && !isAskDividend) {
      toast({
        title: "Subscription Required",
        description: "Please choose at least one subscription",
        variant: "destructive",
      });
      return;
    }

    console.log("Form Submission Data:", data);
    console.log("Final Country Code:", data.countryCode);
    console.log("Final Phone Number:", data.phone);

    registerMutation.mutate({
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phone,
      countryCode: data.countryCode,
    });
  };

  const handleGoogleLogin = () => {
    const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/google`;
    const popup = window.open(googleAuthUrl, "_blank", "width=500,height=600");

    window.addEventListener("message", (event) => {
      console.log("insode");
      // Security check
      if (event.origin !== process.env.NEXT_PUBLIC_API_HOST) return;

      const data = event.data;

      if (data.onBoarding) {
        localStorage.setItem("tempToken", data.tempToken);
        router.push("/onBoarding");
      } else {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        router.push("/dashboard");
      }

      if (popup) popup.close();
    });
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
        className="w-full"
      >
        <div className="inputs flex flex-col gap-3">
          {/* Username Field */}
          <div className="username flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                {...register("username")}
                className={`w-full border rounded-[12px] px-4 py-2 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
                  errors.username || (!usernameAvailable && usernameChecked)
                    ? "border-[#DE2C41]"
                    : usernameAvailable && usernameChecked
                    ? "border-green-500"
                    : "border-[#EAEDF2]"
                }`}
                placeholder="Enter Username"
                autoFocus
                autoComplete="off"
              />
              {checkUsernameMutation.isLoading && (
                <FiLoader
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-blue-500"
                  size={16}
                />
              )}
              {usernameAvailable && usernameChecked && (
                <IoMdCheckmark
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                  size={16}
                />
              )}
            </div>
            {errors.username && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <MdError size={16} /> {errors.username.message}
              </p>
            )}
            {!usernameAvailable && usernameChecked && !errors.username && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <MdError size={16} /> Username is not available
              </p>
            )}
            {usernameAvailable && usernameChecked && (
              <p className="text-green-600 text-sm flex items-center gap-1">
                <IoMdCheckmark size={16} /> Username is available
              </p>
            )}
          </div>

          {/* First Name Field */}
          <div className="firstName flex flex-col gap-2">
            <label
              htmlFor="firstName"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className={`w-full border rounded-[12px] px-4 py-2 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
                errors.firstName ? "border-[#DE2C41]" : "border-[#EAEDF2]"
              }`}
              placeholder="Enter First Name"
              autoComplete="off"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <MdError size={16} /> {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name Field */}
          <div className="lastName flex flex-col gap-2">
            <label
              htmlFor="lastName"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className={`w-full border rounded-[12px] px-4 py-2 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
                errors.lastName ? "border-[#DE2C41]" : "border-[#EAEDF2]"
              }`}
              placeholder="Enter Last Name"
              autoComplete="off"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <MdError size={16} /> {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="email flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              Email Address
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
                src={smsSvg || "/placeholder.svg"}
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

          {/* Phone Number Field */}
          <PhoneInput
            onChange={handlePhoneChange}
            error={
              !phoneValid && watch("phone")
                ? "Please enter a valid phone number"
                : errors.phone?.message
            }
            placeholder="Enter phone number"
          />

          {/* Password Field */}
          <div className="password flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                className={`w-full border rounded-[12px] px-4 py-2 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
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
                    className={`flex items-center gap-1 text-[12px] font-sfDisplay font-normal leading-[140%] ${
                      !password || passwordStrength.checks?.nameEmail
                        ? "text-gray-600"
                        : "text-red-600"
                    }`}
                  >
                    <IoMdCheckmark className="text-[#465FF140]" />
                    <p
                      className={`flex items-center gap-1 text-[12px] font-sfDisplay font-normal leading-[140%] ${
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
                  className={`flex items-center gap-1 text-[12px] font-sfDisplay font-normal leading-[140%] ${
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
                  className={`flex items-center gap-1 text-[12px] font-sfDisplay font-normal leading-[140%] ${
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

          {/* Repeat Password Field */}
          <div className="showRepeatPassword flex flex-col gap-2 mt-[3px]">
            <label
              htmlFor="showRepeatPassword"
              className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]"
            >
              Repeat Password
            </label>
            <div className="relative">
              <input
                type={showRepeatPassword ? "text" : "password"}
                id="showRepeatPassword"
                {...register("repeatpassword")}
                className={`w-full border rounded-[12px] px-4 py-2 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
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
            disabled={
              registerMutation.isLoading || checkUsernameMutation.isLoading
            }
            className="mt-5 flex items-center justify-center gap-2 bg-[#005294] hover:bg-[#0e68b3] disabled:opacity-50 disabled:cursor-not-allowed text-white py-[16px] rounded-[8px] w-[100%] text-[14px] font-sfDisplay font-normal leading-[140%]"
          >
            {registerMutation.isLoading && (
              <FiLoader className="animate-spin" />
            )}
            Create Account
          </button>
        </div>
      </form>

      <div className="w-full mt-4 text-[#D9D9D9]">
        <div className="flex items-center w-full justify-center gap-3 mb-5">
          <p className="text-[14px] font-normal leading-[140%] font-sfDisplay space-y-[14px] text-[#64748B]">
            or
          </p>
        </div>
        <div className="text-center flex items-center justify-center lg:hidden" >
          <p className="text-[14px] font-medium font-sfDisplay leading-[140%] text-[#64748B] md:text-end mb-4">
            Already have account{" "}
            <Link
              href={`/auth/sign-in`}
              className="hover:underline font-medium leading-[140%] font-sfDisplay text-[#64748B] text-[14px]"
            >
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="border-[#E2E8F0] w-full rounded-[12px] gap-2 bg-transparent"
          >
            <img
              src="/googleicon.png"
              alt="google"
              className="w-[24px] h-[24px]"
            />
            <p className="text-[14px] font-medium text-center text-[#00111F]">
              Google
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpFormWithPhone;
