"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogoutButton } from "@/components/common/logout-button";
import DashBoardScreen from "@/components/screens/dashboard";
import { useAccountTypeQuery } from "@/hooks/use-auth-mutations";

export default function DashboardPage() {
  const router = useRouter();
  const { data: accountData } = useAccountTypeQuery();

  useEffect(() => {
    if (accountData?.accountType === "admin") {
      router.replace("/dashboard/admin/users");
    }
  }, [accountData, router]);

  if (accountData?.accountType === "admin") {
    return null;
  }

  return (
    <div>
      <DashBoardScreen />
    </div>
  );
}
