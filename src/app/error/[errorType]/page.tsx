"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DynamicErrorPage() {
  const params = useParams();
  const errorType = Array.isArray(params.errorType)
    ? params.errorType[0]
    : params.errorType;

  let title = "Something Went Wrong";
  let message = "An unexpected error occurred. Please try again later.";

  switch (errorType) {
    case "not-found":
      title = "Page Not Found";
      message = "The page you are looking for does not exist.";
      break;
    case "bad-gateway":
      title = "Bad Gateway";
      message =
        "The server received an invalid response from an upstream server.";
      break;
    case "unauthorized":
      title = "Unauthorized Access";
      message = "You do not have permission to view this page.";
      break;
    case "server-error":
      title = "Server Error";
      message =
        "Our servers are experiencing issues. Please try again in a moment.";
      break;
    default:
      // Default message already set above
      break;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-950">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-red-600 dark:text-red-500">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Link href="/dashboard" passHref>
            <Button className="w-full">Go to Homepage</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
