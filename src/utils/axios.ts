import axios, { type AxiosInstance, type AxiosError } from "axios"

interface RefreshTokenResponse {
  accessToken: string
}

class ApiClient {
  private client: AxiosInstance
  private refreshPromise: Promise<string> | null = null
  private retryCount = 0
  private maxRetries = 3

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST || "http://localhost:8000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor to add token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    // Response interceptor for token refresh
    this.client.interceptors.response.use(
      (response) => {
        // Reset retry count on successful response
        this.retryCount = 0
        return response
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as any

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.retryCount >= this.maxRetries) {
            this.handleMaxRetriesExceeded()
            return Promise.reject(error)
          }

          originalRequest._retry = true
          this.retryCount++

          try {
            const newToken = await this.refreshAccessToken()
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return this.client(originalRequest)
          } catch (refreshError) {
            if (this.retryCount >= this.maxRetries) {
              this.handleMaxRetriesExceeded()
            }
            return Promise.reject(refreshError)
          }
        }

        return Promise.reject(error)
      },
    )
  }

  private getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken")
    }
    return null
  }

  private getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refreshToken")
    }
    return null
  }

  private setTokens(accessToken: string, refreshToken: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
    }
  }

  private clearTokens() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  }

  private async refreshAccessToken(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise
    }

    this.refreshPromise = this.performTokenRefresh()

    try {
      const token = await this.refreshPromise
      return token
    } finally {
      this.refreshPromise = null
    }
  }

  private async performTokenRefresh(): Promise<string> {
    const refreshToken = this.getRefreshToken()

    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    try {
      const response = await axios.post<RefreshTokenResponse>(
        `${process.env.NEXT_PUBLIC_API_HOST || "http://localhost:8000"}/api/auth/refresh-token`,
        { refreshToken },
      )

      const { accessToken } = response.data
      this.setTokens(accessToken, refreshToken)

      console.log("Token refreshed successfully")
      return accessToken
    } catch (error) {
      console.error("Token refresh failed:", error)
      throw error
    }
  }

  private handleMaxRetriesExceeded() {
    console.log("Max token refresh retries exceeded, redirecting to sign-in")
    this.clearTokens()

    if (typeof window !== "undefined") {
      window.location.href = "http://localhost:3000/auth/sign-in"
    }
  }

  // Public method to get the axios instance
  getInstance(): AxiosInstance {
    return this.client
  }

  // Public method to manually set tokens (for login)
  setAuthTokens(accessToken: string, refreshToken: string) {
    this.setTokens(accessToken, refreshToken)
    this.retryCount = 0
  }

  // Public method to clear tokens (for logout)
  clearAuthTokens() {
    this.clearTokens()
    this.retryCount = 0
  }
}

export const apiClient = new ApiClient()
export default apiClient.getInstance()
