"use client";
import LoginScreen from "@/components/screens/login";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  return (
    <>
      <LoginScreen />
    </>
  );
}
