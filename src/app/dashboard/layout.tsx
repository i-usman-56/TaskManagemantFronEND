"use client";

import { useState } from "react";
import DashBoardSideBar from "@/components/common/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import type React from "react";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        {!isMobileMenuOpen && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-8 w-8 p-0 bg-white shadow-md"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashBoardSideBar />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-72 h-screen">
          <DashBoardSideBar isMobile={true} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-[65px] flex items-center px-6 w-full border border-gray-200">
            <div className="flex items-center gap-2">
              <h1 className=" text-[16px] font-medium font-sfDisplay ">Hi, Muhammad Usman</h1>
              <span className=" text-[16px] font-medium font-sfDisplay ">Welcome Back</span>
            </div>
        </div>
        {/* Add top padding on mobile to account for the hamburger button */}
        <div className="lg:p-0 overflow-auto lg:pt-0 h-full ">
          {children}
        </div>
      </div>
    </div>
  );
}
