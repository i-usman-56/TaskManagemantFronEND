"use client";
import HomeScreen from "@/components/screens/main-screen";
import { AuthProvider } from "@/providers/auth-provider";

export default function Home() {
  return (
    <>
      <div className="overflow-hidden">
        <AuthProvider>
          <HomeScreen />
        </AuthProvider>
      </div>
    </>
  );
}
