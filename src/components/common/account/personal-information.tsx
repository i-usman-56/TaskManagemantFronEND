"use client";
import { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import PhoneInput from "../phone-input";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { Loader } from "lucide-react";
import { useaccountInfoMutation } from "@/hooks/use-auth-mutations";

const PersonalInformation = ({
  defaultFirstName,
  defaultLastName,
  defaultPhoneNumber, // Fixed typo
  defaultCountryCode, // Fixed typo
  defaultEmail,
}: any) => {
  const [firstName, setFirstName] = useState(defaultFirstName);
  const [lastName, setLastName] = useState(defaultLastName);
  const [email, setEmail] = useState(defaultEmail);
  const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber);
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [phoneValid, setPhoneValid] = useState(false);
  const accountInfoMutate = useaccountInfoMutation();

  const handleSubmit = async () => {
    accountInfoMutate.mutate({
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
    });
  };

  const handleDiscard = () => {
    setFirstName(defaultFirstName);
    setLastName(defaultLastName);
    setCountryCode(defaultCountryCode); // Fixed typo
    setPhoneNumber(defaultPhoneNumber); // Fixed typo
    setEmail(defaultEmail);
  };

  useEffect(() => {
    if (phoneNumber && countryCode) {
      const isValid = isValidPhoneNumber(`${countryCode}${phoneNumber}`);
      setPhoneValid(isValid);
    }
  }, [phoneNumber, countryCode]); // Added dependencies

  const handlePhoneChange = (
    phone: string,
    countryCode: string,
    isValid: boolean
  ) => {
    setPhoneValid(isValid);
    setCountryCode(countryCode);
    setPhoneNumber(phone); // Fixed: was setting phoneNumber instead of phone
    console.log("Phone changed:", { phone, countryCode, isValid });
  };

  const getCountryCode = (phone: string) => {
    try {
      const phoneNumber = parsePhoneNumber(phone);
      return phoneNumber?.country || null; // Example: 'PK', 'US'
    } catch (error) {
      console.error("Invalid phone number:", error);
      return null;
    }
  };

  return (
    <div className="p-4  rounded-md border border-gray-200 w-full max-w-full sm:max-w-[90%] md:max-w-[70%] ">
      <h2 className="text-[17px] font-[500] font-sfDisplay leading-[140%] text-[#0F172A] mb-1">
        Personal Information
      </h2>
      <p className="text-[14px] font-normal font-sfDisplay space-y-[14px] text-[#64748B] mb-6">
        You can update your account and profile information here.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="firstName"
              className="block text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A]"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName || ""} // Added fallback
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="w-full  px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="lastName"
              className="block text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A]"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName || ""} // Added fallback
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Smith"
              className="w-full  px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A]"
          >
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email || ""} // Added fallback
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tahsiankhan380@gmail.com"
              // disabled={true}
              className="w-full  pl-10 pr-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-0"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CiMail className="text-gray-400" size={20} />
            </div>
          </div>
        </div>
        {/* Phone Number */}

        <div className="space-y-1.5">
          {/* Phone Number */}
          <PhoneInput
            value={phoneNumber || ""} // Added fallback
            countrycode={getCountryCode(`${countryCode}${phoneNumber}`) || ""}
            onChange={handlePhoneChange}
            error={
              phoneNumber && !phoneValid
                ? "Please enter a valid phone number"
                : ""
            } // Only show error if phone number exists
            placeholder="999-99996745"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
          <button
            disabled={accountInfoMutate.isLoading}
            onClick={handleDiscard}
            className="px-4 py-3 text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A] border border-gray-300 rounded-xl hover:bg-gray-50 w-full sm:w-auto"
          >
            Discard
          </button>
          <button
            onClick={handleSubmit}
            disabled={accountInfoMutate.isLoading}
            className="px-4 py-3 text-[14px] font-sfDisplay leading-[140%] font-medium text-[#FFFFFF] bg-[#005294] rounded-xl w-full sm:w-auto"
          >
            {accountInfoMutate.isLoading && (
              <Loader className="animate-spin mr-2 inline" size={14} />
            )}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
