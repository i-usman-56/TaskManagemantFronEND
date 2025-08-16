"use client"
import { useEffect, useRef, useState } from "react";
import { CiMail } from "react-icons/ci";
import { BiPhone } from "react-icons/bi";
import { Loader, AlertTriangle, X, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { FiLoader } from "react-icons/fi";

export default function PrivacySecurity() {

  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<
    "email" | "phone"
  >("email");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [apiError, setApiError] = useState("");
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const validateEmail = (email: string) => {
    if (!email && twoFactorEnabled) {
      setEmailError("Email is required when 2FA is enabled");
      return false;
    } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  // Validate phone format
  const validatePhone = (phone: string) => {
    if (!phone && twoFactorEnabled && !email) {
      setPhoneError("At least one verification method is required");
      return false;
    } else if (phone && !/^\+?[0-9]{10,15}$/.test(phone)) {
      setPhoneError("Please enter a valid phone number");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
  };
  // Validate form before submission
  const validateForm = () => {
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);

    if (twoFactorEnabled && !email && !phone) {
      setApiError("At least one verification method is required");
      return false;
    }

    setApiError("");
    return isEmailValid && isPhoneValid;
  };
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [shownewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  // useEffect(() => {
  //   if (data) {
  //     setTwoFactorEnabled(data.twoFactorEnabled || false);
  //     setEmail(data.twoFactoremail || "");
  //     setPhone(data.twoFactorphone || "");
  //   }
  // }, [data]);
  // const handleDiscard = () => {
  //   // Reset form values
  //   if (data) {
  //     setEmail(data.twoFactoremail || "");
  //     setPhone(data.twoFactorphone || "");
  //   }
  // };

  // const handleSave = () => {
  //   if (newPassword !== confirmPassword) {
  //     return toast.error("Password do match");
  //   }
  //   mutate(
  //     {
  //       oldPassword: currentPassword,
  //       newPassword: newPassword,
  //       twoFactorphone: phone,
  //       twoFactoremail: email,
  //     },
  //     {
  //       onSuccess: (data) => {
  //         setNewPassword("");
  //         setCurrentPassword("");
  //         setConfirmPassword("");
  //       },
  //     }
  //   );
  //   // Save form values
  // };

  // const handleSave1 = () => {
  //   if (!validateForm()) return;
  //   if (!twoFactorEnabled) {
  //     return mutatedisbale2fa();
  //   }

  //   if (email) {
  //     setVerificationMethod("email");
  //   } else if (phone) {
  //     setVerificationMethod("phone");
  //   } else {
  //     // No verification method provided
  //     return;
  //   }
  //   mutate2fa(
  //     {
  //       twoFactoremail: email,
  //       twoFactorphone: phone,
  //       twoFactorMethod: verificationMethod,
  //     },
  //     {
  //       onSuccess: () => {
  //         setTimeout(() => {
  //           setIsVerifyModalOpen(true);
  //         }, 1000);
  //       },
  //     }
  //   );
  // };

  // const handleDiscard1 = () => {
  //   setEmail(data.twoFactoremail || "");
  //   setPhone(data.twoFactorphone || "");
  //   setTwoFactorEnabled(data.twoFactorEnabled || false);
  // };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Reset error and success states
    setOtpError("");
    setOtpSuccess(false);

    // Auto-advance to next input
    if (value !== "" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };
  const handleRsendVerifyOTP = () => {
    const tokenId = localStorage.getItem("tokenId");

    // mutate2faresendOTP(
    //   {
    //     tokenId: tokenId,
    //   },
    //   {
    //     onSuccess: () => {
    //       setResendTimer(30); // Start 30 second countdown
    //     },
    //   }
    // );
  };
  // const handleVerifyOtp = () => {
  //   const otp = otpValues.join("");
  //   // Reset states
  //   setOtpError("");
  //   setOtpSuccess(false);
  //   // Validate OTP
  //   if (otp.length !== 4) {
  //     setOtpError("Please enter all 4 digits");
  //     return;
  //   }
  //   const tokenId = localStorage.getItem("tokenId");
  //   // Simulate OTP verification
  //   if (otp.length === 4) {
  //     mutate2faOTP(
  //       {
  //         tokenId: tokenId,
  //         code: otp,
  //       },
  //       {
  //         onSuccess: () => {
  //           // Success
  //           setOtpSuccess(true);
  //           setResendTimer(0); // Reset timer on success

  //           // Close modal after success
  //           setTimeout(() => {
  //             setIsVerifyModalOpen(false);
  //             // Reset OTP values
  //             setOtpValues(["", "", "", ""]);
  //           }, 1000);
  //         },
  //         onError: (err) => {
  //           setOtpError(err.message);
  //         },
  //       }
  //     );
  //   }
  // };

  // Focus first input when modal opens
  useEffect(() => {
    if (isVerifyModalOpen) {
      inputRefs[0].current?.focus();
    }
  }, [isVerifyModalOpen]);
  // Focus first input when modal opens
  useEffect(() => {
    if (isVerifyModalOpen) {
      inputRefs[0].current?.focus();
      setOtpError("");
      setOtpSuccess(false);
    }
  }, [isVerifyModalOpen]);

  // Validate email and phone when they change
  useEffect(() => {
    if (email) validateEmail(email);
  }, [email]);

  useEffect(() => {
    if (phone) validatePhone(phone);
  }, [phone]);

  // Clear API error when form changes
  useEffect(() => {
    setApiError("");
  }, [email, phone, twoFactorEnabled]);
  const handleDelete = () => {
    if (!deletePassword) {
      return toast.error("Please Confirm Password!");
    }
    // Show the delete confirmation modal
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Check if confirmation text is correct
    if (deleteConfirmText.toLowerCase() === "delete") {
      // deleteMutate(
      //   { password: deletePassword },
      //   {
      //     onSuccess: () => {
      //       setDeletePassword("");
      //       setShowDeleteModal(false);
      //     },
      //     onError: () => {
      //       setShowDeleteModal(false);
      //     },
      //   }
      // );
      // setIsLoading(true);
      // // Simulate API call
      // setTimeout(() => {
      //   setIsLoading(false);
      //   setShowDeleteModal(false);
      //   // Reset confirmation text
      //   setDeleteConfirmText("");
      // }, 1000);
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmText("");
  };

  // if (PrivacyLoading)
  //   return (
  //     <div className="flex items-center justify-center border border-gray-100 rounded-lg min-h-[60vh] sm:max-w-[90%] md:max-w-[80%]">
  //       <Loader className="animate-spin" />
  //     </div>
  //   );

  return (
    <div className="flex flex-col gap-6">
      {/* Security Settings Card */}
      <div className="border border-gray-200 rounded-lg w-full max-w-full sm:max-w-[90%] md:max-w-[70%] ">
        <div className="p-6">
          <h2 className="text-[17px] font-medium font-sfDisplay leading-[140%] text-[#0F172A]">
            Security Settings
          </h2>
          <p className="text-[14px] font-normal font-sfDisplay leading-[140%] text-[#64748B] mt-1">
            You can update your account and profile information here.
          </p>
        </div>

        <div className="px-6 pb-6 space-y-6">
          {/* Current Password */}
          <div className="flex flex-col md:flex-row md:items-start gap-2">
            <label className="text-[14px] font-medium font-sfDisplay leading-[140%] text-[#0F172A] md:w-1/4 md:pt-2">
              Current Password
            </label>
            <div className="w-full md:w-3/4">
              <div className="relative">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="•  •  •  •  •  •  •  •  •  •  "
                />
              </div>
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col md:flex-row md:items-start gap-2">
            <label className="text-[14px] font-medium font-sfDisplay leading-[140%] text-[#0F172A] md:w-1/4 md:pt-2">
              New Password
            </label>
            <div className="w-full md:w-3/4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full relative">
                  <input
                    type={`${shownewPassword ? "text" : "password"}`}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-3 pr-9 py-3 border border-gray-300 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Typing..."
                  />
                  <div
                    onClick={() => {
                      setShowNewPassword(!shownewPassword);
                    }}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 8C2 8 4 3 8 3C12 3 14 8 14 8C14 8 12 13 8 13C4 13 2 8 2 8Z"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full relative">
                  <input
                    type={`${showconfirmPassword ? "text" : "password"}`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-3 pr-9 py-3 border border-gray-300 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                  <div
                    onClick={() => {
                      setShowConfirmPassword(!showconfirmPassword);
                    }}
                    className="absolute inset-y-0 right-3 flex items-center  cursor-pointer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 8C2 8 4 3 8 3C12 3 14 8 14 8C14 8 12 13 8 13C4 13 2 8 2 8Z"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row mt-1">
                <p className="text-[12px] font-normal font-sfDisplay leading-[140%] text-[#94A3B8] sm:w-1/2 pl-2">
                  Enter your password
                </p>
                <p className="text-[12px] font-normal font-sfDisplay leading-[140%] text-[#94A3B8] sm:w-1/2 pl-2 sm:pl-2">
                  Confirm your password
                </p>
              </div>
            </div>
          </div>

          {/* 2FA */}
          {/* <div className="flex flex-col md:flex-row md:items-start gap-2">
            <label className="text-[14px] font-medium font-sfDisplay leading-[140%] text-[#0F172A] md:w-1/4 md:pt-2">
              2FA
            </label>
            <div className="w-full md:w-3/4 space-y-4">
              <div className="w-full">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter a second email address to secure your account"
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <CiMail className="text-gray-400" size={16} />
                  </div>
                </div>
                <p className="text-[12px] font-normal font-sfDisplay leading-[140%] text-[#94A3B8] mt-1 pl-2">
                  Enter a second email address to secure your account.
                </p>
              </div>

              <div className="w-full">
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number to secure your account"
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <BiPhone className="text-gray-400" size={16} />
                  </div>
                </div>
                <p className="text-[12px] font-normal font-sfDisplay leading-[140%] text-[#94A3B8] mt-1 pl-2">
                  Enter your phone number to secure your account.
                </p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Buttons */}
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3">
          <button
            // onClick={handleDiscard}
            className="px-4 py-3 text-[14px] font-medium font-sfDisplay leading-[140%] text-[#0F172A] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
          >
            Discard
          </button>
          <button
            // onClick={handleSave}
            // disabled={isPending}
            className="px-4 py-3 text-[14px] font-medium font-sfDisplay leading-[140%]  text-white bg-[#005294] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1 w-full sm:w-auto"
          >
            {/* {isPending && (
              <Loader className="animate-spin mr-2 inline" size={14} />
            )} */}
            Save
          </button>
        </div>
      </div>
      {/* Enable 2FA Card  */}
      <>
        <div className="border border-gray-200 rounded-lg w-full max-w-full sm:max-w-[90%] md:max-w-[70%]">
          <div className="p-6">
            <h2 className="text-[17px] font-medium font-sfDisplay leading-[140%] text-[#0F172A]">
              Two Factor Authorization
            </h2>
          </div>

          <div className="px-6 pb-6 space-y-6">
            {/* 2FA Toggle */}
            <div className="flex flex-col md:flex-row md:items-start gap-2">
              <label className="text-[14px] font-medium font-sfDisplay leading-[140%] text-[#0F172A] md:w-1/4 md:pt-2">
                2FA
              </label>
              <div className="w-full md:w-3/4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label
                      htmlFor="two-factor"
                      className="text-[14px] font-medium font-sfDisplay leading-[140%] text-[#0F172A] md:w-1/4 md:pt-2"
                    >
                      Enable Two-Factor Authentication
                    </Label>
                    <p className="text-[12px] font-normal font-sfDisplay leading-[140%] text-[#64748B] mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    id="two-factor"
                    className="data-[state=checked]:bg-[#00529466] [&>span]:bg-[#005294]"
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>

                {/* 2FA Fields (only shown when enabled) */}
                {twoFactorEnabled && (
                  <div className="space-y-4 mt-4">
                    {/* Email 2FA */}
                    <div className="w-full">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={() => validateEmail(email)}
                          className={`w-full pl-9 pr-3 py-3 border ${
                            emailError
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          } rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:border-transparent`}
                          placeholder="Enter a second email address to secure your account"
                        />
                        <div className="absolute inset-y-0 left-3 flex items-center">
                          <CiMail
                            className={
                              emailError ? "text-red-400" : "text-gray-400"
                            }
                            size={16}
                          />
                        </div>
                      </div>
                      {emailError ? (
                        <p className="text-[12px] font-normal font-sfDisplay leading-[140%] text-red-500 mt-1 pl-2">
                          {emailError}
                        </p>
                      ) : (
                        <p className="text-[12px] font-normal font-sfDisplay leading-[140%] text-[#94A3B8] mt-1 pl-2">
                          Enter a second email address to secure your account.
                        </p>
                      )}
                    </div>

                    {/* Phone 2FA */}
                    <div className="w-full">
                      <div className="relative">
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          onBlur={() => validatePhone(phone)}
                          className={`w-full pl-9 pr-3 py-3 border ${
                            phoneError
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          } rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:border-transparent`}
                          placeholder="Enter your phone number to secure your account"
                        />
                        <div className="absolute inset-y-0 left-3 flex items-center">
                          <BiPhone
                            className={
                              phoneError ? "text-red-400" : "text-gray-400"
                            }
                            size={16}
                          />
                        </div>
                      </div>
                      {phoneError ? (
                        <p className="text-[12px] font-normal font-sfDisplay leading-[140%] text-red-500 mt-1 pl-2">
                          {phoneError}
                        </p>
                      ) : (
                        <p className="text-[12px] font-normal font-sfDisplay leading-[140%] text-[#94A3B8] mt-1 pl-2">
                          Enter your phone number to secure your account.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3">
            <button
              // onClick={handleDiscard1}
              className="px-4 py-3 text-[14px] font-medium font-sfDisplay leading-[140%] text-[#0F172A] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
            >
              Discard
            </button>
            <button
              // onClick={handleSave1}
              // disabled={enable2faPending || disable2faPending}
              className="px-4 py-3 text-[14px] font-medium font-sfDisplay leading-[140%] text-white bg-[#005294] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* {disable2faPending && (
                <Loader className="animate-spin mr-2 inline" size={14} />
              )}
              {enable2faPending && (
                <Loader className="animate-spin mr-2 inline" size={14} />
              )} */}
              {twoFactorEnabled ? "Save" : "Save"}
            </button>
          </div>
        </div>

        {/* OTP Verification Modal */}
        <Dialog open={isVerifyModalOpen} onOpenChange={setIsVerifyModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                OTP Confirmation
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-3">
              <p className="text-center text-gray-600">
                We have sent the verification code to your{" "}
                {verificationMethod === "email"
                  ? "Email Address"
                  : "Phone Number"}
                :{" "}
                <span className="font-medium">
                  {verificationMethod === "email" ? email : phone}
                </span>
              </p>

              <div className="flex gap-2">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-14 h-14 text-center text-xl border ${
                      otpError
                        ? "border-red-500 focus:ring-red-500"
                        : otpSuccess
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                ))}
              </div>

              {/* OTP Error Message */}
              {otpError && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{otpError}</span>
                </div>
              )}

              {/* OTP Success Message */}
              {otpSuccess && (
                <p className="text-green-500 text-sm">
                  Verification successful!
                </p>
              )}
              <button
                type="button"
                // disabled={resendTimer > 0 || otpSuccess}
                // className={`text-sm font-semibold 
                //   ${
                //   isResendingOtp || resendTimer > 0 || otpSuccess
                //     ? "text-[#64748B] cursor-not-allowed"
                //     : "text-[#005294] cursor-pointer"
                // }
                // `}
                onClick={handleRsendVerifyOTP}
              >
                {/* {isResendingOtp ? (
                  <p className="text-[#64748B] font-medium flex font-sfDisplay items-center justify-center gap-1">
                    {isResendingOtp && <FiLoader className="animate-spin" />}{" "}
                    Resending
                  </p>
                ) : resendTimer > 0 ? (
                  <p className="text-[#64748B] leading-[140%] font-sfDisplay font-medium text-[14px] mt-5">
                    Resend in {resendTimer}s
                  </p>
                ) : (
                  <p className="hover:underline text-[#64748B] leading-[140%] font-sfDisplay font-medium text-[14px] mt-5">
                    Resend new Code
                  </p>
                )} */}
              </button>

              <div className="flex flex-col w-full gap-2">
                <button
                  // onClick={handleVerifyOtp}
                  // disabled={otpValues.some((v) => v === "") || verify2faPending}
                  className="w-full px-4 py-3 text-white bg-[#005294] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* {verify2faPending && (
                    <Loader className="animate-spin mr-2 inline" size={14} />
                  )} */}
                  Verify
                </button>
                <button
                  onClick={() => setIsVerifyModalOpen(false)}
                  className="w-full px-4 py-3 text-[#0F172A] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  Cancel
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>

      {/* Delete Account Card */}
      <div className="border border-gray-200 rounded-lg w-full max-w-full sm:max-w-[90%] md:max-w-[70%] ">
        <div className="p-6">
          <h2 className="text-[17px] font-medium font-sfDisplay leading-[140%] text-[#0F172A]">
            Delete Account
          </h2>
          <p className="text-[14px] font-normal font-sfDisplay leading-[140%] text-[#64748B] mt-1">
            If you delete your account, it cannot be restored
          </p>
        </div>

        <div className="px-6 pb-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-start gap-2">
            <label className="text-[14px] font-medium font-sfDisplay leading-[140%] text-[#0F172A] md:w-1/4 md:pt-2">
              Confirm Account Deletion
            </label>
            <div className="w-full md:w-3/4">
              <div className="relative">
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full sm:w-1/2 px-3 py-3 border border-gray-300 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="•  •  •  •  •  •  •  •  •  •"
                />
              </div>
              <p className="text-[12px] font-normal font-sfDisplay leading-[140%] text-[#94A3B8] w-[50%] mt-1 pr-10">
                {/* Kindly confirm the successful deletion of my account and{" "}
                <br className="hidden sm:block" /> any associated data as per
                your privacy policy. */}
                Kindly confirm you want to delete your account by entering your
                current password
              </p>

              <div className="mt-4 flex justify-start sm:justify-end">
                <button
                  onClick={handleDelete}
                  className="px-4 py-3 text-[14px] font-medium font-sfDisplay leading-[140%]  text-white bg-[#DE2C41] rounded-xl hover:bg-[#DC2626] focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#FAFAFA] rounded-lg w-full max-w-md mx-4 relative overflow-hidden">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Modal content */}
            <div className="p-6 flex flex-col items-center">
              {/* Warning icon */}
              <div className="w-20 h-20 rounded-full bg-[#FFFFFF] flex items-center justify-center mb-4 ">
                <div className="w-16 h-16 rounded-full bg-[#CA3A31] flex items-center justify-center ">
                  <AlertTriangle className="text-white" size={32} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[18px] font-bold font-creato leading-[100%] text-[#353535] mb-2 text-center">
                Are you sure?
              </h3>

              {/* Description */}
              <p className="text-[14px] font-normal font-creato leading-[150%] text-[#A2A4AC] text-center mb-6">
                You're about to delete private training data, this step will
                affect the workspace globally
              </p>

              {/* Confirmation input */}
              <div className="w-full mb-4">
                <p className="text-[14px] font-medium font-creato leading-[150%] text-[#727684] mb-2">
                  Type "Delete" to confirm
                </p>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Delete"
                />
              </div>

              {/* Confirm button */}
              <button
                onClick={handleConfirmDelete}
                disabled={
                  deleteConfirmText.toLowerCase() !== "delete" ||
                  isLoading
                }
                className={`w-full py-3 rounded-md text-white text-[14px] font-medium font-creato leading-[150%] ${
                  deleteConfirmText.toLowerCase() === "delete" && !isLoading
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader size={16} className="animate-spin mr-2" />
                    Processing...
                  </span>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
