// Utility functions for authentication
export const setAuthToken = (token: string) => {
  // Set in localStorage for client-side access
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token)
  }

  // Set in cookies for middleware
  document.cookie = `token=${token}; path=/; max-age=86400; SameSite=strict`
}

export const removeAuthToken = () => {
  // Remove from localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
  }

  // Remove from cookies
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=strict"
}

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}
