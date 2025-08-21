import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Bell,
  Users,
  BarChart3,
  UserCheck,
} from "lucide-react";

export const getNavigationItems = (accountType: string) => {
  const common = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      active: true,
      route: "/dashboard",
    },
    {
      name: "My Tasks",
      icon: ClipboardList,
      active: false,
      route: "/dashboard/my-task",
    },
    {
      name: "Calendar",
      icon: Calendar,
      active: false,
      route: "/dashboard/calender",
    },
    // {
    //   name: "Reports",
    //   icon: BarChart3,
    //   active: false,
    //   route: "/dashboard/reports",
    // },
    // { name: "Notifications", icon: Bell, active: false ,route:""},
  ];

  if (accountType === "organization") {
    return [
      ...common,
      {
        name: "All Tasks",
        icon: ClipboardList,
        active: false,
        route: "/dashboard/all-task",
      },
      // {
      //   name: "Assign Tasks",
      //   icon: UserCheck,
      //   active: false,
      //   route: "/dashboard/assign-task",
      // },
      {
        name: "Members",
        icon: Users,
        active: false,
        route: "/dashboard/members",
      },
      //   { name: "Reports", icon: BarChart3, active: false },
    ];
  }

  return [...common];
};
