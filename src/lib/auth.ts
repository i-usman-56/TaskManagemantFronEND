// ==========================
// Auth Token Utilities
// ==========================

export const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  document.cookie = `accessToken=${accessToken}; path=/; max-age=86400; SameSite=strict`;
  document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${
    7 * 86400
  }; SameSite=strict`; // 7 days for refresh
};

export const getTokens = () => {
  if (typeof window !== "undefined") {
    return {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    };
  }
  return { accessToken: null, refreshToken: null };
};

export const removeTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  document.cookie =
    "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=strict";
  document.cookie =
    "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=strict";
};
