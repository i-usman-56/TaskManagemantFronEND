"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Settings,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { removeTokens } from "@/lib/auth";
import { getNavigationItems } from "@/config/navigation";
import { useUserInfoQuery } from "@/hooks/use-auth-mutations";

export default function DashBoardSideBar({
  isMobile,
  accountType,
}: {
  isMobile?: Boolean;
  accountType: string;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: userData } = useUserInfoQuery();
  const router = useRouter();

  // dynamically load based on accountType
  const navigationItems = getNavigationItems(accountType);
  const pathname = usePathname(); // 👈 current route

  const handleLogout = () => {
    removeTokens();
    router.refresh();
    router.push("/auth/sign-in");
  };

  const handleSettings = () => {
    // Add your settings navigation logic here
    router.push("/dashboard/account/account-info");
    console.log("Opening settings...");
  };

  return (
    <div
      className={cn(
        "bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out relative h-full w-full",
        isCollapsed && !isMobile ? "w-16" : "w-72"
      )}
    >
      {/* Collapse/Expand Button */}
      {!isMobile && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
        >
          <>
            {isCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </>
        </Button>
      )}

      {/* Logo Section */}
      <div
        className={` border-b border-gray-200 ${isCollapsed ? "p-4" : "p-4 "}`}
      >
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0">
            <div className="w-10 h-8 bg-primaryBlue rounded-md flex items-center justify-center">
              <div className="text-white font-bold text-sm">TMS</div>
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex justify-center  ">
              <div className="flex items-center space-x-2">
                <span className="text-[15px] font-bold text-gray-800 text-ellipsis whitespace-nowrap">
                  <span className="text-primaryBlue">Task</span> Manamgement
                  <span className="text-primaryBlue"> System</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.route; // 👈 check current route

            return (
              <Button
                key={item.name}
                variant={isActive ? "default" : "ghost"}
                onClick={() => router.push(item.route)} // 👈 navigate
                className={cn(
                  "w-full justify-start h-12 px-3",
                  isActive
                    ? "bg-primaryBlue text-white hover:bg-hoverBlue"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  isCollapsed && "justify-center px-0"
                )}
              >
                <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </Button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userData?.user.profilePic} />
            <AvatarFallback className="bg-primaryBlue text-white font-medium">
              {userData?.user?.firstName[0]}
              {userData?.user?.lastName[0]}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userData?.user?.firstName}
                  {userData?.user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {userData?.user?.email}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white">
                  <DropdownMenuItem
                    onClick={handleSettings}
                    className="cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4 cursor-pointer" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4 cursor-pointer" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
