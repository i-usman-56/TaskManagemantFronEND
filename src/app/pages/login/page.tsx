"use client"
import LoginScreen from "@/components/screens/login";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/"); // Redirect to login if not authenticated
    }
  }, [router]);
  return (
    <>
      <LoginScreen />
    </>
  );
}
