"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import CustomLoader from "../common/loader/customLoaders";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log("🚀 AuthProvider useEffect called!");
    console.log("Current Pathname:", pathname);

    // Define public paths that don't require authentication
    // Added '/error' to ensure dynamic error pages are accessible without login
    const publicPaths = ["/login", "/signup", "/error"];
    const isPublicPath = publicPaths.some((publicPath) =>
      pathname.startsWith(publicPath)
    );

    console.log("Is Public Path:", isPublicPath);

    // Get token from localStorage
    const token = localStorage.getItem("token");
    console.log("Token in localStorage:", token ? "Found" : "Not Found");

    if (token) {
      // If token exists, sync with cookies for middleware
      document.cookie = `token=${token}; path=/; max-age=86400; SameSite=strict`;
      console.log("Token synced to cookies.");

      // If user is on a public path (like login/signup/error) but has a token, redirect to home
      if (isPublicPath) {
        console.log("Redirecting authenticated user from public path to /");
        router.push("/");
        return; // Stop further execution
      }
    } else {
      // If no token and not on a public path, redirect to login
      if (!isPublicPath) {
        console.log(
          "No token found and not on public path. Redirecting to /login"
        );
        router.push("/login");
        return; // Stop further execution
      }
    }

    // If we reach here, authentication check is complete and no redirect was needed

    setIsChecking(false);

    console.log("Authentication check complete. Rendering children.");
  }, [pathname, router]); // Depend on pathname and router to re-run on route changes

  // Show loading while checking authentication
  if (isChecking) {
    console.log("Displaying loading state...");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CustomLoader variant="ripple" size="xl" />
      </div>
    );
  }

  return <>{children}</>;
}
