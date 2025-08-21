"use client";
import { useEffect, useRef, useState } from "react";
import type React from "react";

import { Loader, AlertTriangle, X } from "lucide-react";
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
import {
  usedeleteAccountMutation,
  useenable2faMutation,
  useresend2faMutation,
  useUpdatePasswordMutation,
  useUserInfoQuery,
  useverify2faMutation,
} from "@/hooks/use-auth-mutations";
import { removeTokens } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function PrivacySecurity() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<
    "email" | "phone"
  >("email");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
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
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const updatePasswordMutation = useUpdatePasswordMutation();
  const deleteAccountmutaion = usedeleteAccountMutation();
  const enable2faMutation = useenable2faMutation();
  const verify2faMutation = useverify2faMutation();
  const resend2faMutation = useresend2faMutation();
  const { data: userData } = useUserInfoQuery();
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
  const [deletePassword, setDeletePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    updatePasswordMutation.mutate(
      {
        newPassword,
        oldPassword: currentPassword,
      },
      {
        onSuccess: () => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
      }
    );
  };

  const handleVerifyOtp = () => {
    const otp = otpValues.join("");
    setOtpError("");
    setOtpSuccess(false);

    if (otp.length !== 6) {
      setOtpError("Please enter all 6 digits");
      return;
    }

    verify2faMutation.mutate(
      { otp },
      {
        onSuccess: () => {
          setOtpSuccess(true);
          setResendTimer(0);

          setTimeout(() => {
            setIsVerifyModalOpen(false);
            setOtpValues(["", "", "", "", "", ""]);
          }, 1000);
        },
        onError: (error: any) => {
          setOtpError(error.message || "Verification failed");
        },
      }
    );
  };

  const handleResendVerifyOTP = () => {
    resend2faMutation.mutate(undefined, {
      onSuccess: () => {
        setResendTimer(30);
      },
    });
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Reset error and success states
    setOtpError("");
    setOtpSuccess(false);

    if (value !== "" && index < 5) {
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

  useEffect(() => {
    if (isVerifyModalOpen) {
      inputRefs[0].current?.focus();
      setOtpError("");
      setOtpSuccess(false);
    }
  }, [isVerifyModalOpen]);

  useEffect(() => {
    if (email) validateEmail(email);
  }, [email]);

  useEffect(() => {
    if (phone) validatePhone(phone);
  }, [phone]);

  useEffect(() => {
    setApiError("");
  }, [email, phone, twoFactorEnabled]);

  const handleDelete = () => {
    if (!deletePassword) {
      return toast.error("Please Confirm Password!");
    }
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmText.toLowerCase() === "delete") {
      setIsLoading(true);
      deleteAccountmutaion.mutate(undefined, {
        onSuccess: () => {
          setTimeout(() => {
            setIsLoading(false);
            setShowDeleteModal(false);
            setDeleteConfirmText("");
            handleLogout();
          }, 1000);
        },
      });
    }
  };
  const handleLogout = () => {
    removeTokens();
    router.refresh();
    router.push("/auth/sign-in");
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmText("");
  };
  const handleToggle2FA = (type: "email" | "sms", enabled: boolean) => {
    enable2faMutation.mutate(
      { channel: type, disabled: enabled ? false : true },
      {
        onSuccess: (data) => {
          if (!data.disabled) {
            setTimeout(() => {
              setIsVerifyModalOpen(true);
            }, 1000);
          }
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.message || "Failed to update 2FA setting"
          );
        },
      }
    );
  };

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
        </div>

        {/* Buttons */}
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3">
          <button
            onClick={() => {
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
            }}
            className="px-4 py-3 text-[14px] font-medium font-sfDisplay leading-[140%] text-[#0F172A] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
          >
            Discard
          </button>
          <button
            onClick={handleUpdatePassword}
            disabled={updatePasswordMutation.isPending}
            className="px-4 py-3 text-[14px] font-medium font-sfDisplay leading-[140%]  text-white bg-[#005294] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1 w-full sm:w-auto disabled:opacity-50"
          >
            {updatePasswordMutation.isPending && (
              <Loader className="animate-spin mr-2 inline" size={14} />
            )}
            Save
          </button>
        </div>
      </div>

      {/* Enable 2FA Card */}
      <div className="border border-gray-200 rounded-lg w-full max-w-full sm:max-w-[90%] md:max-w-[70%]">
        <div className="p-6">
          <h2 className="text-[17px] font-medium font-sfDisplay leading-[140%] text-[#0F172A]">
            Two Factor Authentication
          </h2>
        </div>

        <div className="px-6 pb-6 space-y-6">
          {/* Email 2FA Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label
                htmlFor="email-2fa"
                className="text-[14px] font-medium font-sfDisplay leading-[140%] text-[#0F172A]"
              >
                Email Two-Factor Authentication
              </Label>
              <p className="text-[12px] font-normal font-sfDisplay leading-[140%] text-[#64748B]">
                Require email verification when logging in
              </p>
            </div>
            <Switch
              id="email-2fa"
              className="data-[state=checked]:bg-[#00529466] [&>span]:bg-[#005294]"
              checked={userData?.user?.email2fa ?? false}
              onCheckedChange={(checked) => handleToggle2FA("email", checked)}
            />
          </div>

          {/* Phone 2FA Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label
                htmlFor="phone-2fa"
                className="text-[14px] font-medium font-sfDisplay leading-[140%] text-[#0F172A]"
              >
                Phone Two-Factor Authentication
              </Label>
              <p className="text-[12px] font-normal font-sfDisplay leading-[140%] text-[#64748B]">
                Require phone verification when logging in
              </p>
            </div>
            <Switch
              id="phone-2fa"
              className="data-[state=checked]:bg-[#00529466] [&>span]:bg-[#005294]"
              checked={userData?.user?.phone2fa ?? false}
              onCheckedChange={(checked) => handleToggle2FA("sms", checked)}
            />
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <Dialog open={isVerifyModalOpen} onOpenChange={setIsVerifyModalOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center">OTP Confirmation</DialogTitle>
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
                  className={`w-12 h-12 text-center text-xl border ${
                    otpError
                      ? "border-red-500 focus:ring-red-500"
                      : otpSuccess
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                />
              ))}
            </div>

            <button
              type="button"
              disabled={
                resendTimer > 0 || otpSuccess || resend2faMutation.isPending
              }
              className={`text-sm font-semibold ${
                resend2faMutation.isPending || resendTimer > 0 || otpSuccess
                  ? "text-[#64748B] cursor-not-allowed"
                  : "text-[#005294] cursor-pointer hover:underline"
              }`}
              onClick={handleResendVerifyOTP}
            >
              {resend2faMutation.isPending ? (
                <p className="text-[#64748B] font-medium flex font-sfDisplay items-center justify-center gap-1">
                  <FiLoader className="animate-spin" /> Resending
                </p>
              ) : resendTimer > 0 ? (
                <p className="text-[#64748B] leading-[140%] font-sfDisplay font-medium text-[14px] mt-5">
                  Resend in {resendTimer}s
                </p>
              ) : (
                <p className="text-[#005294] leading-[140%] font-sfDisplay font-medium text-[14px] mt-5">
                  Resend new Code
                </p>
              )}
            </button>

            <div className="flex flex-col w-full gap-2">
              <button
                onClick={handleVerifyOtp}
                disabled={
                  otpValues.some((v) => v === "") || verify2faMutation.isPending
                }
                className="w-full px-4 py-3 text-white bg-[#005294] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {verify2faMutation.isPending && (
                  <Loader className="animate-spin mr-2 inline" size={14} />
                )}
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
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="p-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#FFFFFF] flex items-center justify-center mb-4 ">
                <div className="w-16 h-16 rounded-full bg-[#CA3A31] flex items-center justify-center ">
                  <AlertTriangle className="text-white" size={32} />
                </div>
              </div>

              <h3 className="text-[18px] font-bold font-creato leading-[100%] text-[#353535] mb-2 text-center">
                Are you sure?
              </h3>

              <p className="text-[14px] font-normal font-creato leading-[150%] text-[#A2A4AC] text-center mb-6">
                You're about to delete private training data, this step will
                affect the workspace globally
              </p>

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

              <button
                onClick={handleConfirmDelete}
                disabled={
                  deleteConfirmText.toLowerCase() !== "delete" || isLoading
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
