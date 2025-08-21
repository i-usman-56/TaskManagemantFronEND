"use client";

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { organizationMembers } from "@/lib/members/members";
export function useOrganizationMembersQuery(id: string) {
  return useQuery({
    queryKey: ["organization-members", id], // cache per org
    queryFn: () => organizationMembers.organizationMembers({ id }), // ✅ pass id
    onSuccess: (data) => {
      console.log("Account type:", data);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to fetch organization members.";
      toast.error(errorMessage);
    },
  });
}
