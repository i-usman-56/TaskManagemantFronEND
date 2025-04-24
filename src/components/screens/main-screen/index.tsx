"use client"
import { useSearchParams } from "next/navigation";
import React, { Suspense, lazy, useEffect, useState } from "react";
const SideBar = lazy(() => import("@/components/common/sidebar"));
const DashBoard = lazy(() => import("@/components/common/dashboard"));

export default function HomeScreen() {
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState<string>("all-tasks");

  useEffect(() => {
    const tab = searchParams.get("current-tab");
    if (tab) {
      setCurrentTab(tab);
    }
  }, [searchParams]);
  return (
    <div className="bg-[#181C14] flex min-h-screen overflow-hidden text-white">
      <Suspense
        fallback={<div className="w-[20%] h-full p-4">Loading Sidebar...</div>}
      >
        <div className="w-[20%] h-full p-4">
          <SideBar setCurrentTab={setCurrentTab} />
        </div>
      </Suspense>
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <div className="w-[80%] h-full py-4 pr-4">
          <DashBoard currentTab={currentTab}  />
        </div>
      </Suspense>
    </div>
  );
}
