"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { removeTokens } from "@/lib/auth";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove from localStorage
    removeTokens();
    // Redirect to login (middleware will handle the rest)
    router.push("/auth/sign-in");
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  );
}
