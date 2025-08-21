"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  addMemberRequest,
  deleteOrganizationRequest,
  editOrganizationRequest,
  organizationMembers,
} from "@/lib/members/members";

export function useAddMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: addMemberRequest) => organizationMembers.addMember(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["organization-members"]);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Registration Failed");

      console.error("Registration error:", error);
    },
  });
}
export function useeditMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: editOrganizationRequest) =>
      organizationMembers.editOrganizationMember(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["organization-members"]);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Registration Failed");

      console.error("Registration error:", error);
    },
  });
}
export function usedeleteMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: deleteOrganizationRequest) =>
      organizationMembers.deleteOrganizationMember(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["organization-members"]);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage || "Registration Failed");

      console.error("Registration error:", error);
    },
  });
}
