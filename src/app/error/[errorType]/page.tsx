"use client";
export const runtime = "edge";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import sitemaintenance from "@/assets/Icon Container.svg";

// Define the error data structure types
interface ErrorButton {
  text: string;
  link: string;
}

interface ErrorData {
  errorCode?: string;
  error?: string; // for image paths
  title: string;
  description: string;
  btn: ErrorButton;
}

// Define all possible error types
type ErrorType =
  | "not-found"
  | "internal-error"
  | "forbidden"
  | "bad-gateway"
  | "unauthorized"
  | "service-unavailable"
  | "gateway-timeout"
  | "site-maintenance";

// Define the error data mapping
const errorData: Record<ErrorType, ErrorData> = {
  "not-found": {
    errorCode: "404",
    title: "Page Not Found",
    description:
      "We're sorry, the page you requested could not be found. Please go back to the homepage.",
    btn: {
      text: "Go to Homepage",
      link: "/",
    },
  },
  "internal-error": {
    errorCode: "500",
    title: "Internal Server Error",
    description:
      "We're sorry, but an Internal Server Error has occurred. Please go back to the homepage.",
    btn: {
      text: "Go to Homepage",
      link: "/",
    },
  },
  forbidden: {
    errorCode: "403",
    title: "Forbidden",
    description:
      "You do not have authorization to access this resource. Please go back to the homepage.",
    btn: {
      text: "Go to Homepage",
      link: "/",
    },
  },
  "bad-gateway": {
    errorCode: "502",
    title: "Bad Gateway",
    description:
      "The server encountered a temporary error. Please go back to the homepage.",
    btn: {
      text: "Go to Homepage",
      link: "/",
    },
  },
  unauthorized: {
    errorCode: "401",
    title: "Unauthorized",
    description:
      "Your request could not be processed. Please go back to the homepage.",
    btn: {
      text: "Go to Homepage",
      link: "/",
    },
  },
  "service-unavailable": {
    errorCode: "503",
    title: "Service Unavailable",
    description:
      "The server is temporarily busy. Please go back to the homepage.",
    btn: {
      text: "Go to Homepage",
      link: "/",
    },
  },
  "gateway-timeout": {
    errorCode: "504",
    title: "Gateway Timeout",
    description:
      "The server is taking too long to respond. Please go back to the homepage.",
    btn: {
      text: "Go to Homepage",
      link: "/",
    },
  },
  "site-maintenance": {
    error: sitemaintenance,
    title: "Site Maintenance",
    description:
      "Apologies, we are working to make an even better HeyDividend.",
    btn: {
      text: "Go to Homepage",
      link: "/",
    },
  },
};

// Component props interface (optional since we're using params)
interface DynamicErrorPageProps {
  errorType?: ErrorType;
}

export default function DynamicErrorPage({
  errorType: propErrorType,
}: DynamicErrorPageProps = {}) {
  const params = useParams();

  // Get error type from params or props
  const errorTypeFromParams = Array.isArray(params.errorType)
    ? params.errorType[0]
    : params.errorType;

  const errorType: ErrorType =
    propErrorType || (errorTypeFromParams as ErrorType) || "not-found";

  // Get the current error data, fallback to not-found if invalid type
  const currentData = errorData[errorType] || errorData["not-found"];

  return (
    <div className="h-screen w-full flex items-center flex-col text-black justify-center">
      <div className="text-center">
        {currentData.errorCode ? (
          <h1 className="text-[136px] font-medium font-sfDisplay leading-[140%] text-[#005294]">
            {currentData.errorCode}
          </h1>
        ) : currentData.error ? (
          <div className="flex justify-center">
            <Image
              src={currentData.error}
              alt="Error illustration"
              width={200}
              height={200}
              priority
            />
          </div>
        ) : null}

        <p className="text-[29px] font-medium leading-[140%] font-sfDisplay league-gothic pt-5">
          {currentData.title}
        </p>
      </div>

      <p className="max-w-[26rem] text-[14px] font-normal font-sfDisplay text-[#64748B] text-center pt-5">
        {currentData.description}
      </p>

      <Link
        href={currentData.btn.link}
        className="bg-[#005294] text-[14px] font-medium font-sfDisplay rounded-[12px] px-8 mt-6 py-[10px] text-white hover:bg-[#004080] transition-colors duration-200"
      >
        {currentData.btn.text}
      </Link>
    </div>
  );
}

// Export types for external use
export type { ErrorType, ErrorData, ErrorButton };
