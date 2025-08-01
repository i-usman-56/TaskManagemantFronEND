"use client";
import { AuthProvider } from "@/components/provider/auth-provider";
import HomeScreen from "@/components/screens/main-screen";

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
