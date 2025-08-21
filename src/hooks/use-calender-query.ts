"use client"

import { calender } from "@/lib/calender/calender"
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

export function useCalenderQuery(range: string, date: string) {
  return useQuery({
    queryKey: ["calender-task", range, date], // Include both range and date in query key for proper caching
    queryFn: () =>
      calender.calendertask({
        range,
        date,
      }), // Use dynamic range and date parameters instead of static values
    onSuccess: (data) => {
      console.log("Calendar tasks:", data)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Failed to fetch calendar tasks."
      toast.error(errorMessage)
    },
  })
}
