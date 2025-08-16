"use client";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { HiOutlinePhone } from "react-icons/hi";

const PersonalInformation = ({
  defaultFullName,
  defaulPhoneNumber,
  defaultEmail,
  defaultStreetNumber,
  defaultHouseNumber,
  defaultCity,
  defaultState,
}: any) => {
  const [fullName, setFullName] = useState(defaultFullName);
  const [email, setEmail] = useState(defaultEmail);
  const [phoneNumber, setPhoneNumber] = useState(defaulPhoneNumber);
  const [streetNumber, setStreetNumber] = useState(defaultStreetNumber);
  const [houseNumber, setHouseNumber] = useState(defaultHouseNumber);
  const [city, setCity] = useState(defaultCity);
  const [state, setState] = useState(defaultState);
  console.log(streetNumber);
  console.log(houseNumber);
  // Simulating the hook for demo purposes
  // const isPending = false;

  const handleSubmit = async () => {
    console.log({
      fullName,
      email,
      phoneNumber,
      // address: {
      StreetNumber: streetNumber,
      houseNumber: houseNumber,
      city,
      state,
      // },
    });
  };

  const handleDiscard = () => {
    setFullName(defaultFullName);
    setPhoneNumber(defaulPhoneNumber);
    setEmail(defaultEmail);
    setStreetNumber(defaultStreetNumber);
    setHouseNumber(defaultHouseNumber);
    setCity(defaultCity);
    setState(defaultState);
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
              htmlFor="fullName"
              className="block text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A]"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Smith"
              className="w-full  px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0"
            />
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
                value={email}
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
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="block text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A]"
          >
            Phone Number
          </label>
          <div className="relative">
            <input
              id="phone"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (000) 000-0000"
              className="w-full sm:w-[70%] md:w-[60%] lg:w-[49%] pl-10 pr-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-0"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiOutlinePhone className="text-gray-400" size={20} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Street Number */}
          {/* <div className="space-y-1.5">
            <label
              htmlFor="street"
              className="block text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A]"
            >
              Street Number
            </label>
            <input
              id="street"
              type="text"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
              placeholder="Street # 56"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-0"
            />
          </div> */}

          {/* House Number */}
          {/* <div className="space-y-1.5">
            <label
              htmlFor="house"
              className="block text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A]"
            >
              Apt / House Number
            </label>
            <input
              id="house"
              type="text"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              placeholder="House no. 426"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-0"
            />
          </div> */}

          {/* City */}
          {/* <div className="space-y-1.5">
            <label
              htmlFor="city"
              className="block text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A]"
            >
              City
            </label>
            <div className="relative">
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white appearance-none focus:outline-none focus:ring-0 text-gray-500"
              >
                <option value="">Select City</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div> */}

          {/* State */}
          {/* <div className="space-y-1.5">
            <label
              htmlFor="state"
              className="block text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A]"
            >
              State
            </label>
            <div className="relative">
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white appearance-none focus:outline-none focus:ring-0 text-gray-500"
              >
                <option value="">Select State</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="KPK">KPK</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div> */}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
          <button
            // disabled={isPending}
            onClick={handleDiscard}
            className="px-4 py-3 text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A] border border-gray-300 rounded-xl hover:bg-gray-50 w-full sm:w-auto"
          >
            Discard
          </button>
          <button
            onClick={handleSubmit}
            // disabled={isPending}
            className="px-4 py-3 text-[14px] font-sfDisplay leading-[140%] font-medium text-[#FFFFFF] bg-[#005294] rounded-xl w-full sm:w-auto"
          >
            {/* {isPending && (
              <Loader className="animate-spin mr-2 inline" size={14} />
            )} */}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
