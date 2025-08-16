"use client"
import { useEffect, useRef, useState } from "react";
import { CiMail } from "react-icons/ci";
import { PiPlusBold, PiUserCircleThin } from "react-icons/pi";
import { Loader } from "lucide-react";
import Country from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
Country.registerLocale(enLocale);

// Country data with name and flag code
const countries = [
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "Canada", code: "ca" },
  { name: "Australia", code: "au" },
  { name: "Germany", code: "de" },
  { name: "France", code: "fr" },
  { name: "Japan", code: "jp" },
  { name: "India", code: "in" },
  { name: "Brazil", code: "br" },
  { name: "South Africa", code: "za" },
  { name: "China", code: "cn" },
  { name: "Russia", code: "ru" },
  { name: "Mexico", code: "mx" },
  { name: "Italy", code: "it" },
  { name: "Spain", code: "es" },
  { name: "Pakistan", code: "pk" },
];

export default function GeneralSettings() {
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(countries[0]); // Default to first country
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getCountryCode = (countryName:any) => {
    return Country.getAlpha2Code(countryName, "en");
  };
  const handleImageChange = (e: any) => {
    // debugger;
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview
      console.log(profileImage);
    }
  };

  const handleDiscard = () => {
    // Reset form logic
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setPreviewImage("");
    // console.log(previewImage);
    setCountry(countries[0]); // Default to first country
  };

  const handleSave = () => {
    // Create FormData to properly send the image file
    const formData = new FormData();

    // Add text fields to FormData
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append(
      "country",
      typeof country === "object" ? country.name : country
    );

    // Add image with the correct field name expected by the backend
    if (profileImage) {
      formData.append("image", profileImage);
    } else {
      console.log("No profile image to upload");
    }

    // Debug FormData contents
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // console.log(getCountryCode(country));
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  if (false)
    return (
      <div className="flex items-center justify-center border border-gray-100 rounded-lg min-h-[60vh] sm:max-w-[90%] md:max-w-[80%]">
        <Loader className="animate-spin" />
      </div>
    );
  return (
    <div className="flex flex-col gap-6 w-full max-w-full sm:max-w-[90%] md:max-w-[70%]">
      <div className="border border-gray-200 rounded-2xl">
        {/* Header */}
        <div className="p-6">
          <h2 className="text-[17px] font-sfDisplay leading-[140%] font-medium text-[#0F172A]">
            Profile Settings
          </h2>
          <p className="text-[14px] font-sfDisplay leading-[140%] font-normal text-[#64748B] mt-1">
            You can update your account and profile information here.
          </p>
        </div>

        {/* Form Content */}
        <div className="px-6 pb-6 space-y-6">
          {/* Name */}
          <div className="flex flex-col md:flex-row md:items-start gap-2">
            <label className="text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A] md:w-1/4 md:pt-2">
              Name
            </label>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-3/4">
              <div className="w-full">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Josh"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl text-[14px] focus:outline-none"
                />
                <p className="text-[12px] font-sfDisplay leading-[140%] font-normal text-[#94A3B8] mt-1 pl-2">
                  First Name
                </p>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Ambrick"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl text-[14px] focus:outline-none"
                />
                <p className="text-[12px] font-sfDisplay leading-[140%] font-normal text-[#94A3B8] mt-1 pl-2">
                  Last Name
                </p>
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col md:flex-row md:items-start gap-2">
            <label className="text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A] md:w-1/4 md:pt-2">
              Username
            </label>
            <div className="w-full md:w-3/4">
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  placeholder="Username123"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl  text-[14px] focus:outline-none"
                />
                <div className="absolute inset-y-0  right-3 flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                      fill="#10B981"
                    />
                    <path
                      d="M5.6001 8.00001L7.2001 9.60001L10.4001 6.40001"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-[12px] font-sfDisplay leading-[140%] font-normal text-[#94A3B8] mt-1 pl-1">
                Username already taken.
              </p>
            </div>
          </div>

          {/* Upload Profile Image */}
          <div className="flex flex-col md:flex-row md:items-start gap-2">
            <label className="text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A] md:w-1/4 md:pt-2">
              Upload Profile Image
            </label>
            <div className="flex justify-start items-center gap-4 w-full md:w-3/4">
              <div
                onClick={triggerFileInput}
                className="relative flex items-center justify-center w-16 h-16 rounded-full border border-gray-200 bg-white overflow-hidden cursor-pointer group"
              >
                {previewImage ? (
                  <>
                    <img
                      src={previewImage || "/placeholder.svg"}
                      alt="Profile Preview"
                      className="w-full h-full object-cover group-hover:opacity-70 transition-opacity"
                    />
                    {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PiPlusBold size={24} className="text-white" />
                    </div> */}
                  </>
                ) : (
                  <>
                    <PiUserCircleThin size={34} className="text-gray-400" />
                    {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PiPlusBold size={24} className="text-gray-500" />
                    </div> */}
                  </>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="text-sm text-gray-700 hidden font-medium hover:text-gray-900"
                >
                  {previewImage ? "Change photo" : "Upload photo"}
                </button>
                <p className="text-[16px] font-sfDisplay leading-[140%] font-normal text-[#94A3B8]">
                  Recommended size is 200x200px
                </p>
                <p className="text-[16px] font-sfDisplay leading-[140%] font-normal text-[#94A3B8]">
                  Files up to 5 MB
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col md:flex-row md:items-start gap-2">
            <label className="text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A] md:w-1/4 md:pt-2">
              Email
            </label>
            <div className="w-full md:w-3/4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  placeholder="johndoe@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-xl text-[14px] focus:outline-none"
                />
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <CiMail className="text-gray-400" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Country Selector */}
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <label
              htmlFor="country-selector"
              className="text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A] md:w-1/4 md:pt-2"
            >
              Country
            </label>

            <div className="w-full md:w-3/4 relative">
              <div className="relative">
                {/* Input container with focus styles */}
                <div
                  className="flex items-center w-full px-2 py-2 border border-gray-300 text-sm rounded-xl cursor-pointer"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  {/* Country flag and name */}
                  <div className="flex items-center gap-2 flex-1 rounded-full">
                    <img
                      // src={`https://flagcdn.com/w80/${
                      //   country.code ?? getCountryCode(country)?.toLowerCase()
                      // }.png`}
                      src={`https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.10/svg/${
                        country.code ?? getCountryCode(country)?.toLowerCase()
                      }.svg`}
                      // width="20"
                      // height="15"
                      alt={`${country.name} flag`}
                      className="rounded-full h-[24px] w-[24px] object-cover"
                      loading="lazy"
                    />
                    <span className="text-gray-900">
                      {country.name ?? country}
                    </span>
                  </div>
                  {/* Dropdown icon */}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500 ml-2"
                  >
                    <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor" />
                  </svg>
                </div>

                {/* Dropdown menu */}
                {showCountryDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-xl border border-gray-200 max-h-60 overflow-auto">
                    {/* Search input */}
                    <div className="p-2 sticky top-0 bg-white">
                      <input
                        type="text"
                        placeholder="Search countries..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>

                    {/* Country list */}
                    <ul className="py-1">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((c) => (
                          <li
                            key={c.code}
                            className={`px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer flex items-center ${
                              country.code === c.code ? "bg-blue-50" : ""
                            }`}
                            onClick={() => {
                              setCountry(c);
                              setShowCountryDropdown(false);
                              setSearchQuery("");
                            }}
                          >
                            <img
                              src={`https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.10/svg/${c.code}.svg`}
                              // src={`https://flagcdn.com/w20/${c.code}.png`}
                              alt={`${c.name} flag`}
                              className="w-[24px] h-[24px] mr-2 object-cover rounded-full"
                              loading="lazy"
                            />
                            {c.name}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-sm text-gray-500">
                          No countries found
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Helper text */}
              {/* <p className="mt-1 text-xs text-gray-500">
                Select your country from the dropdown
              </p> */}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="px-6 py-4 flex justify-end gap-3">
          <button
            onClick={handleDiscard}
            className="px-4 py-3 text-[14px] font-sfDisplay leading-[140%] font-medium text-[#0F172A] bg-white border border-gray-300 rounded-xl focus:outline-none hover:bg-gray-50 transition-colors"
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            // disabled={isPending}
            className="px-4 py-3 text-[14px] font-sfDisplay leading-[140%] font-medium text-white bg-[#005294] rounded-xl focus:outline-none hover:bg-[#004080] transition-colors"
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
}
