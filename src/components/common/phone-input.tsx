"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { MdError } from "react-icons/md"
import { ChevronDown } from "lucide-react"
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js"

interface Country {
  code: string
  name: string
  callingCode: string
  flag: string
}

interface PhoneInputProps {
  value?: string,
  countrycode?: string,
  onChange: (phone: string, countryCode: string, isValid: boolean) => void
  error?: string
  placeholder?: string
  disabled?: boolean
}

const PhoneInput = ({
  value = "",
  countrycode = "PK",
  onChange,
  error,
  placeholder = "Enter phone number",
  disabled = false,
}: PhoneInputProps) => {
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const getFlagUrl = (countryCode: string) => {
    return `https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.10/svg/${countryCode.toLowerCase()}.svg`
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag")
        const data = await response.json()

        const formattedCountries: Country[] = data
          .filter((country: any) => country.idd?.root && country.idd?.suffixes?.[0])
          .map((country: any) => ({
            code: country.cca2,
            name: country.name.common,
            callingCode: `${country.idd.root}${country.idd.suffixes[0]}`,
            flag: country.flag, // Keep for fallback
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name))

        setCountries(formattedCountries)

        const defaultCountry = formattedCountries.find((c) => c.code === countrycode) || formattedCountries[0]
        setSelectedCountry(defaultCountry)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching countries:", error)
        const fallbackCountries = [
          { code: "US", name: "United States", callingCode: "+1", flag: "🇺🇸" },
          { code: "GB", name: "United Kingdom", callingCode: "+44", flag: "🇬🇧" },
          { code: "CA", name: "Canada", callingCode: "+1", flag: "🇨🇦" },
          { code: "AU", name: "Australia", callingCode: "+61", flag: "🇦🇺" },
        ]
        setCountries(fallbackCountries)
        setSelectedCountry(fallbackCountries[0])
        setIsLoading(false)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    if (disabled && value) {
      setPhoneNumber(value)
    }
  }, [value, disabled])

  const handlePhoneChange = (inputValue: string) => {
    setPhoneNumber(inputValue)

    let detectedCountry = selectedCountry

    if (inputValue.startsWith("+") && inputValue.length > 2) {
      try {
        const parsed = parsePhoneNumber(inputValue)
        if (parsed && parsed.country) {
          const foundCountry = countries.find((c) => c.code === parsed.country)
          if (foundCountry && foundCountry.code !== selectedCountry?.code) {
            detectedCountry = foundCountry
            setSelectedCountry(foundCountry)
            console.log("Auto-detected country:", foundCountry.name, foundCountry.callingCode)
          }
        }
      } catch (error) {}
    }

    if (detectedCountry && inputValue) {
      try {
        let fullNumber: string
        if (inputValue.startsWith("+")) {
          fullNumber = inputValue
        } else {
          fullNumber = `${detectedCountry.callingCode}${inputValue}`
        }
        console.log(fullNumber)

        const isValid = isValidPhoneNumber(fullNumber)

        console.log("Country Code:", detectedCountry.callingCode)
        console.log("Phone Number:", inputValue)
        console.log("Full Number:", fullNumber)
        console.log("Is Valid:", isValid)

        const cleanPhoneNumber =
          inputValue.startsWith("+") && detectedCountry
            ? inputValue.replace(detectedCountry.callingCode, "")
            : inputValue

        onChange(cleanPhoneNumber, detectedCountry.callingCode, isValid)
      } catch (error) {
        console.log("Phone validation error:", error)
        onChange(inputValue, detectedCountry?.callingCode || "", false)
      }
    } else {
      onChange(inputValue, detectedCountry?.callingCode || "", false)
    }
  }

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setIsDropdownOpen(false)

    if (phoneNumber) {
      try {
        const fullNumber = `${country.callingCode}${phoneNumber}`
        console.log(fullNumber)
        const isValid = isValidPhoneNumber(fullNumber)

        console.log("Country Code:", country.callingCode)
        console.log("Phone Number:", phoneNumber)
        console.log("Full Number:", fullNumber)
        console.log("Is Valid:", isValid)

        onChange(phoneNumber, country.callingCode, isValid)
      } catch (error) {
        onChange(phoneNumber, country.callingCode, false)
      }
    }
  }

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDropdownOpen(!isDropdownOpen)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]">Phone Number</label>
        <div className="w-full border border-[#EAEDF2] rounded-[12px] px-4 py-2 h-10 flex items-center">
          <div className="animate-pulse text-sm text-gray-400">Loading countries...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-sfDisplay font-medium leading-[140%] text-[#0F172A]">Phone Number</label>
      <div className="relative" ref={dropdownRef}>
        <div
          className={`w-full border rounded-[12px] flex items-center overflow-visible focus-within:border-[#005294] focus-within:shadow-md focus-within:shadow-blue-100/50 ${
            error ? "border-[#DE2C41]" : "border-[#EAEDF2]"
          } ${disabled ? "bg-slate-200/50" : ""}`}
        >
          <div className="relative">
            <button
              type="button"
              onClick={handleDropdownToggle}
              disabled={disabled}
              className={`flex items-center gap-2 px-3 py-2 transition-colors border-r border-gray-200 ${
                disabled ? "cursor-not-allowed bg-slate-200/50" : "hover:bg-gray-50"
              }`}
            >
              <img
                src={getFlagUrl(selectedCountry?.code || "US")}
                alt={`${selectedCountry?.name} flag`}
                className="w-5 h-4 object-cover rounded-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  target.nextElementSibling?.classList.remove("hidden")
                }}
              />
              <span className="text-lg hidden">{selectedCountry?.flag}</span>
              <span className="text-sm font-medium text-gray-700">{selectedCountry?.callingCode}</span>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && !disabled && (
              <div className="absolute top-full left-0 z-[9999] w-80 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl mt-1">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleCountrySelect(country)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 text-left transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <img
                      src={getFlagUrl(country.code) || "/placeholder.svg"}
                      alt={`${country.name} flag`}
                      className="w-5 h-4 object-cover rounded-sm flex-shrink-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                        target.nextElementSibling?.classList.remove("hidden")
                      }}
                    />
                    <span className="text-lg hidden">{country.flag}</span>
                    <span className="flex-1 text-sm font-medium">{country.name}</span>
                    <span className="text-sm text-gray-500 font-mono">{country.callingCode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            readOnly={disabled}
            className={`flex-1 px-3 py-2 outline-none font-inter text-sm h-6 ${
              disabled ? "bg-transparent cursor-not-allowed" : "bg-transparent"
            }`}
            placeholder={placeholder}
          />
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm flex items-center gap-1">
          <MdError size={16} /> {error}
        </p>
      )}
    </div>
  )
}

export default PhoneInput
