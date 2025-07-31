"use client";
import HomeScreen from "@/components/screens/main-screen";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]);

  return (
    <>
      <div className="overflow-hidden">
        <HomeScreen />
      </div>
    </>
  );
}
