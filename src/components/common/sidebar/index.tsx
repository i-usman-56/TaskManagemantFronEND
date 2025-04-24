import Image from "next/image";
import React, { useEffect } from "react";
import profileImage from "../../../assets/images/caspar-camille-rubin-XA0v5hbb7HY-unsplash.jpg";
import { useQuery } from "@tanstack/react-query";
import { fetchProtectedData } from "@/utils";
import { useRouter } from "next/navigation";
import { GiNotebook } from "react-icons/gi";
import { LuListTodo } from "react-icons/lu";
import { MdLabelImportant } from "react-icons/md";
import { GrDocumentExcel } from "react-icons/gr";

interface ProtectedData {
  username: string;
  role: string;
}

interface SideBarProps {
  setCurrentTab: (tabName: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ setCurrentTab }) => {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    if (!currentUrl.searchParams.has("current-tab")) {
      currentUrl.searchParams.set("current-tab", "all-tasks");
      router.replace(currentUrl.toString());
    }
  }, [router]);

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

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/pages/login");
  };

  const updateUrlAndTab = (tabName: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("current-tab", tabName);
    router.replace(currentUrl.toString());
    setCurrentTab(tabName); // Update the current tab state
  };

  return (
    <div
      style={{ height: "calc(100vh - 32px)" }}
      className="border-2 border-black flex flex-col justify-between overflow-hidden p-6 rounded-md"
    >
      <div className="flex items-center gap-3">
        <Image
          src={profileImage}
          alt="profile image"
          className="w-[59px] object-cover h-[59px] rounded-full"
        />
        <div>
          <h1>{data?.username}</h1>
          <h1>Role: {data?.role}</h1>
        </div>
      </div>
      <div className="h-auto space-y-3 w-full">
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => updateUrlAndTab("all-tasks")}>
          <GiNotebook className="text-white text-[20px]" />
          <h1 className="text-[20px] text-white font-semibold">All Tasks</h1>
        </div>
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => updateUrlAndTab("important")}>
          <MdLabelImportant className="text-white text-[20px]" />
          <h1 className="text-[20px] text-white font-semibold">Important Tasks</h1>
        </div>
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => updateUrlAndTab("completed")}>
          <LuListTodo className="text-white text-[20px]" />
          <h1 className="text-[20px] text-white font-semibold">Completed Tasks</h1>
        </div>
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => updateUrlAndTab("incompleted")}>
          <GrDocumentExcel className="text-white text-[20px]" />
          <h1 className="text-[20px] text-white font-semibold">Incompleted Tasks</h1>
        </div>
      </div>
      <div className="w-full">
        <button onClick={logout} className="bg-[#2C3333] w-full rounded-md py-1.5 text-center">
          LogOut
        </button>
      </div>
    </div>
  );
};

export default SideBar;
