"use client";
import PersonalInformation from "@/components/common/account/personal-information";
import { useUserInfoQuery } from "@/hooks/use-auth-mutations";
import { Loader } from "lucide-react";

export default function AccountInformation() {
  const { data: userData, isLoading } = useUserInfoQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center border border-gray-100 rounded-lg min-h-[60vh] sm:max-w-[90%] md:max-w-[80%]">
        <Loader className="animate-spin" />
      </div>
    );
  return (
    <div className="flex flex-col gap-4">
      <PersonalInformation
        defaultFirstName={userData?.user.firstName}
        defaultLastName={userData?.user.lastName}
        defaultEmail={userData?.user.email}
        defaultCountryCode={userData?.user.countryCode}
        defaultPhoneNumber={userData?.user.phoneNumber}
      />
    </div>
  );
}
