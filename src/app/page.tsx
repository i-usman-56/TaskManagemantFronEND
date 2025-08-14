"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard"); // Redirect without adding to history
  }, [router]);

  return null; // No UI needed, just redirect
}
