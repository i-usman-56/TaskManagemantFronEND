"use client"
import { useRef, useState, useEffect } from "react"
import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CiMail } from "react-icons/ci"
import { PiUserCircleThin } from "react-icons/pi"
import { Loader } from "lucide-react"
import { MdError } from "react-icons/md"
import { IoMdCheckmark } from "react-icons/io"
import { useCheckUsernameMutation, usegeneralSettingMutation, useUserInfoQuery } from "@/hooks/use-auth-mutations"

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email address"),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function GeneralSettings() {
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [usernameChecked, setUsernameChecked] = useState(false)
  const { data: userData, isLoading } = useUserInfoQuery()

  const generalSettingMutation = usegeneralSettingMutation()
  const checkUsernameMutation = useCheckUsernameMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
    },
  })

  const watchedUsername = watch("username")

  // Update form values when userData is loaded
  useEffect(() => {
    if (userData?.user) {
      setValue("firstName", userData.user.firstName || "")
      setValue("lastName", userData.user.lastName || "")
      setValue("username", userData.user.username || "")
      setValue("email", userData.user.email || "")

      // Set existing profile picture if available
      if (userData.user.profilePic) {
        setPreviewImage(userData.user.profilePic)
      }
    }
  }, [userData, setValue])

  const checkUsernameAvailability = async (username: string) => {
    if (username.length < 3) {
      setUsernameChecked(false)
      setUsernameAvailable(false)
      return
    }

    // Only check if username is different from current username
    if (username === userData?.user?.username) {
      setUsernameAvailable(true)
      setUsernameChecked(true)
      return
    }

    try {
      const result = await checkUsernameMutation.mutateAsync({ username })
      // Assuming the API returns success when username is available
      setUsernameAvailable(true)
      setUsernameChecked(true)
    } catch (error) {
      console.error("Error checking username:", error)
      setUsernameAvailable(false)
      setUsernameChecked(true)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (watchedUsername && !errors.username) {
        checkUsernameAvailability(watchedUsername)
      } else {
        setUsernameChecked(false)
        setUsernameAvailable(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [watchedUsername, errors.username, userData?.user?.username])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    console.log("File selected:", file) // Debug log

    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      console.log("Setting profile image:", file.name) // Debug log
      setProfileImage(file)
      const previewUrl = URL.createObjectURL(file)
      console.log("Setting preview URL:", previewUrl) // Debug log
      setPreviewImage(previewUrl)
    }
  }

  const handleDiscard = () => {
    if (userData?.user) {
      setValue("firstName", userData.user.firstName || "")
      setValue("lastName", userData.user.lastName || "")
      setValue("username", userData.user.username || "")
      setValue("email", userData.user.email || "")

      // Reset to original profile picture - only clear profileImage (new uploads)
      // but keep the original preview image
      setProfileImage(null)
      setPreviewImage(userData.user.profilePic || null)
    } else {
      reset()
      setProfileImage(null)
      setPreviewImage(null)
    }
    setUsernameChecked(false)
    setUsernameAvailable(false)
  }

  // const onSubmit = async (data: ProfileFormData) => {
  //   // Skip username validation if it's the same as current username
  //   if (data.username !== userData?.user?.username && !usernameAvailable && usernameChecked) {
  //     alert("Please choose an available username")
  //     return
  //   }
  //   console.log(profileImage)

  //   try {
  //     const formData = new FormData()
  //     formData.append("firstName", data.firstName)
  //     formData.append("lastName", data.lastName)
  //     formData.append("username", data.username)
  //     formData.append("email", data.email)

  //     // Only append image if a new one was selected
  //     if (profileImage) {
  //       formData.append("image", profileImage)
  //     }
  //     console.log("Form Dta",formData)

  //     // await generalSettingMutation.mutateAsync(formData)
  //   } catch (error) {
  //     console.error("Error saving profile:", error)
  //   }
  // }
  const onSubmit = async (data: ProfileFormData) => {
  if (data.username !== userData?.user?.username && !usernameAvailable && usernameChecked) {
    alert("Please choose an available username");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("username", data.username);
    formData.append("email", data.email);

    if (profileImage) {
      formData.append("image", profileImage); // 👈 file from input
    }

    

    // ✅ Pass FormData to API
    await generalSettingMutation.mutateAsync(formData);

  } catch (error) {
    console.error("Error saving profile:", error);
  }
};


  const triggerFileInput = () => {
    console.log("Triggering file input") // Debug log
    fileInputRef.current?.click()
  }

  // Show username check status only if username is different from current
  const shouldShowUsernameStatus = watchedUsername && watchedUsername !== userData?.user?.username

  if (isLoading)
    return (
      <div className="flex items-center justify-center border border-gray-100 rounded-lg min-h-[60vh] sm:max-w-[90%] md:max-w-[80%]">
        <Loader className="animate-spin" />
      </div>
    )

  return (
    <div className="flex flex-col gap-6 w-full max-w-full sm:max-w-[90%] md:max-w-[70%]">
      <div className="border border-gray-200 rounded-2xl">
        {/* Header */}
        <div className="p-6">
          <h2 className="text-[17px] font-medium text-[#0F172A]">Profile Settings</h2>
          <p className="text-[14px] font-normal text-[#64748B] mt-1">
            You can update your account and profile information here.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pb-6 space-y-6">
            {/* Name */}
            <div className="flex flex-col md:flex-row md:items-start gap-2">
              <label className="text-[14px] font-medium text-[#0F172A] md:w-1/4 md:pt-2">Name</label>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-3/4">
                <div className="w-full">
                  <input
                    {...register("firstName")}
                    type="text"
                    placeholder="Josh"
                    className={`w-full px-3 py-3 border rounded-xl text-[14px] focus:outline-none focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                      <MdError size={16} /> {errors.firstName.message}
                    </p>
                  )}
                  <p className="text-[12px] font-normal text-[#94A3B8] mt-1 pl-2">First Name</p>
                </div>
                <div className="w-full">
                  <input
                    {...register("lastName")}
                    type="text"
                    placeholder="Ambrick"
                    className={`w-full px-3 py-3 border rounded-xl text-[14px] focus:outline-none focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                      <MdError size={16} /> {errors.lastName.message}
                    </p>
                  )}
                  <p className="text-[12px] font-normal text-[#94A3B8] mt-1 pl-2">Last Name</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2">
              <label className="text-[14px] font-medium text-[#0F172A] md:w-1/4 md:pt-2">Username</label>
              <div className="w-full md:w-3/4">
                <div className="relative">
                  <input
                    {...register("username")}
                    type="text"
                    placeholder="Enter Username"
                    autoComplete="off"
                    className={`w-full px-3 py-3 pr-10 border rounded-xl text-[14px] focus:outline-none focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
                      errors.username || (shouldShowUsernameStatus && !usernameAvailable && usernameChecked)
                        ? "border-red-500"
                        : shouldShowUsernameStatus && usernameAvailable && usernameChecked
                          ? "border-green-500"
                          : "border-gray-300"
                    }`}
                  />
                  {shouldShowUsernameStatus && checkUsernameMutation.isLoading && (
                    <Loader
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-blue-500"
                      size={16}
                    />
                  )}
                  {shouldShowUsernameStatus &&
                    usernameAvailable &&
                    usernameChecked &&
                    !checkUsernameMutation.isLoading && (
                      <IoMdCheckmark
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                        size={16}
                      />
                    )}
                  {shouldShowUsernameStatus &&
                    !usernameAvailable &&
                    usernameChecked &&
                    !checkUsernameMutation.isLoading && (
                      <MdError className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" size={16} />
                    )}
                </div>
                {errors.username && (
                  <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                    <MdError size={16} /> {errors.username.message}
                  </p>
                )}
                {shouldShowUsernameStatus && !usernameAvailable && usernameChecked && !errors.username && (
                  <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                    <MdError size={16} /> Username is not available
                  </p>
                )}
                {shouldShowUsernameStatus && usernameAvailable && usernameChecked && (
                  <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                    <IoMdCheckmark size={16} /> Username is available
                  </p>
                )}
              </div>
            </div>

            {/* Upload Profile Image */}
            <div className="flex flex-col md:flex-row md:items-start gap-2">
              <label className="text-[14px] font-medium text-[#0F172A] md:w-1/4 md:pt-2">Upload Profile Image</label>
              <div className="flex justify-start items-center gap-4 w-full md:w-3/4">
                <div className="flex flex-col gap-2">
                  <div
                    onClick={triggerFileInput}
                    className="relative flex items-center justify-center w-16 h-16 rounded-full border border-gray-200 bg-white overflow-hidden cursor-pointer group"
                  >
                    {previewImage ? (
                      <img
                        src={previewImage || "/placeholder.svg"}
                        alt="Profile Preview"
                        className="w-full h-full object-cover group-hover:opacity-70 transition-opacity"
                      />
                    ) : (
                      <PiUserCircleThin size={34} className="text-gray-400" />
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[16px] font-normal text-[#94A3B8]">Recommended size is 200x200px</p>
                  <p className="text-[16px] font-normal text-[#94A3B8]">Files up to 5 MB</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col md:flex-row md:items-start gap-2">
              <label className="text-[14px] font-medium text-[#0F172A] md:w-1/4 md:pt-2">Email</label>
              <div className="w-full md:w-3/4">
                <div className="relative">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="johndoe@gmail.com"
                    className={`w-full pl-9 pr-3 py-3 border rounded-xl text-[14px] focus:outline-none focus:border-[#005294] focus:shadow-md focus:shadow-blue-100/50 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <CiMail className="text-gray-400" size={16} />
                  </div>
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                    <MdError size={16} /> {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-6 py-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleDiscard}
              className="px-4 py-3 text-[14px] font-medium text-[#0F172A] bg-white border border-gray-300 rounded-xl focus:outline-none hover:bg-gray-50 transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={generalSettingMutation.isLoading}
              className="px-4 py-3 text-[14px] font-medium text-white bg-[#005294] rounded-xl focus:outline-none hover:bg-[#004080] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generalSettingMutation.isLoading && <Loader className="animate-spin mr-2 inline" size={14} />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
