import React, { lazy, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProtectedData } from "@/utils";
import ModelContent from "../model-content";
const AllTasks = lazy(() => import("@/components/common/dashboard/components/all-tasks/index"));
const ImportantTasks = lazy(() => import("@/components/common/dashboard/components/important-tasks/index"));
const CompletedTasks = lazy(() => import("@/components/common/dashboard/components/completed-tasks/index"));
const InCompletedTasks = lazy(() => import("@/components/common/dashboard/components/inCompleted-taska/index"));
interface DashBoardProps {
  currentTab: string;
}
const bounceTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};
interface ProtectedData {
  username: string;
  role: string;
}
const DashBoard: React.FC<DashBoardProps> = ({ currentTab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
 useEffect(() => {
    const currentUrl = new URL(window.location.href);
    if (!currentUrl.searchParams.has("current-tab")) {
      currentUrl.searchParams.set("current-tab", "all-tasks");
      router.replace(currentUrl.toString());
    }
  }, []); // Run only on mount
  const { data, isLoading } = useQuery<ProtectedData | null>(
    ["protectedData", token],
    () => fetchProtectedData(token ?? ""),
    {
      enabled: !!token,
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const renderContent = () => {
    switch (currentTab) {
      case "all-tasks":
        return <AllTasks/>;
      case "important":
        return <ImportantTasks/>;
      case "completed":
        return <CompletedTasks/>;
      case "incompleted":
        return <InCompletedTasks/>;
      default:
        return <div>Unknown Tab</div>;
    }
  };
  return (
    <div
      style={{ height: "calc(100vh - 32px)" }}
      className="border-2 border-black flex flex-col justify-between overflow-hidden p-6 rounded-md"
    >
      <div className="h-[35px] border-b-[1.5px] flex justify-between">
        <h1 className="uppercase text-[20px] leading-6 font-bold">
          {currentTab
            .replace("-", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </h1>
        {data?.role === "admin" && (
          <button
            className="w-[30px] h-[30px] text-[16px] leading-5 bg-[#2E4F4F] rounded-sm text-clip"
            onClick={openModal} // Open the modal on button click
          >
            +
          </button>
        )}
      </div>
      <div className="flex-grow">{renderContent()}</div>
      <div className="hidden lg:block">
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-[#1A1A19] shadow-md rounded-[6px] p-5 lg:max-w-4xl lg:h-[518px] xl:h-[500px] xl:max-w-[25rem] w-full z-50"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={bounceTransition}
                onClick={(e) => e.stopPropagation()} // Prevent closing on content click
              >
                <div
                  onClick={closeModal}
                  className="absolute right-0 z-50 lg:-top-12 xl:-top-[45px] w-[40px] h-[40px] rounded-[8px] bg-[#FFFFFF] bg-opacity-50 flex justify-center items-center cursor-pointer"
                >
                  <IoCloseCircleSharp />
                </div>
                {/* Modal Content Here */}
                <ModelContent onClose={closeModal}/>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default DashBoard;