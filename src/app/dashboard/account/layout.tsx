"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AccountHeader from "@/components/common/account";

type NavItem = {
  name: string;
  path: string;
  description: string;
};

const navItem: NavItem[] = [
  {
    name: "Account Info",
    path: "/dashboard/account/account-info",
    description:
      "We do not sell or share your details without your permission. Find out more in our Privacy Policy. Your username, email, and password can be updated via your Account Settings.",
  },
  {
    name: "Settings",
    path: "/dashboard/account/general-settings",
    description:
      "We do not sell or share your details without your permission. Find out more in our Privacy Policy. Your username, email, and password can be updated via your Account Settings.",
  },
  {
    name: "Privacy & Security",
    path: "/dashboard/account/privacy-security",
    description:
      "Enhance the security of your account by managing passwords, two-factor authentication, and more. Control who can see your data and activity. This section is crucial for protecting your information. Take charge of your privacy and keep your account secure.",
  },
];

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState<NavItem | null>(null);

  useEffect(() => {
    const normalizedPath =
      pathname === "/dashboard/account"
        ? "/dashboard/account/information"
        : pathname;

    const tab = navItem.find((item) => item.path === normalizedPath);
    setCurrentTab(tab || null);
  }, [pathname]);

  return (
    <div className="px-4 py-2">
      {/* Navigation Bar */}
      <nav className="flex overflow-x-auto w-full scrollbar-hide px-2 sm:px-0">
        <div className="flex space-x-1 sm:space-x-2 md:space-x-4 min-w-max">
          {navItem.map((item) => {
            const isActive =
              pathname === item.path ||
              (pathname === "/dashboard/account" &&
                item.path === "/dashboard/account/information");

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`text-[14px] font-medium font-sfDisplay leading-[140%] border-b-[3px] rounded-br-[3px] rounded-bl-[3px] px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? "text-[#00111F] border-[#005294]"
                    : "text-[#64748B] border-[#CBD5E1]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content Placeholder */}
      <main className="pb-20 h-full">
        {/* Example: Show current tab info */}
        {currentTab && (
          <>
            <AccountHeader
              title={currentTab.name}
              description={currentTab.description}
              key={currentTab.name}
            />
            {children}
          </>
        )}
      </main>
    </div>
  );
}
