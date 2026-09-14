import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { api } from "@/constants/src/api/client";

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "./storage";

import type {
  AuthContextValue,
  AuthResponse,
  AuthStatus,
  AuthUser,
  RegisterPayload,
} from "./types";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);

  /**
   * GET CURRENT USER
   */
  const fetchMe = useCallback(async (): Promise<AuthUser> => {
    const access = await getAccessToken();

    if (!access) {
      throw new Error("No access token available.");
    }

    const response = await api.get<AuthUser>("/api/accounts/me/", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return response.data;
  }, []);

  /**
   * SAVE TOKENS
   */
  const storeTokens = useCallback(async (responseData: AuthResponse) => {
    console.log("========== AUTH RESPONSE ==========");

    console.log("AUTH RESPONSE:", JSON.stringify(responseData, null, 2));

    const access = responseData.tokens?.access;
    const refresh = responseData.tokens?.refresh;

    console.log("ACCESS TYPE:", typeof access);
    console.log("REFRESH TYPE:", typeof refresh);

    console.log("===================================");

    if (typeof access !== "string" || !access.trim()) {
      throw new Error("Backend did not return a valid access token.");
    }

    if (typeof refresh !== "string" || !refresh.trim()) {
      throw new Error("Backend did not return a valid refresh token.");
    }

    await saveTokens(access, refresh);
  }, []);

  /**
   * RESTORE SESSION
   */
  const refreshSession = useCallback(async () => {
    try {
      const refresh = await getRefreshToken();

      if (!refresh) {
        setUser(null);
        setStatus("unauthenticated");
        return;
      }

      const response = await api.post<{
        access: string;
        refresh?: string;
      }>("/api/accounts/auth/token/refresh/", {
        refresh,
      });

      const newAccess = response.data.access;
      const newRefresh = response.data.refresh ?? refresh;

      if (typeof newAccess !== "string" || !newAccess.trim()) {
        throw new Error("Invalid access token returned during refresh.");
      }

      if (typeof newRefresh !== "string" || !newRefresh.trim()) {
        throw new Error("Invalid refresh token returned during refresh.");
      }

      await saveTokens(newAccess, newRefresh);

      const currentUser = await fetchMe();

      setUser(currentUser);
      setStatus("authenticated");
    } catch (error) {
      console.log("AUTH SESSION RESTORE ERROR:", error);

      await clearTokens();

      setUser(null);
      setStatus("unauthenticated");
    }
  }, [fetchMe]);

  /**
   * LOGIN
   */
  const login = useCallback(
    async (email: string, password: string) => {
      const response = await api.post<AuthResponse>(
        "/api/accounts/auth/login/",
        {
          email: email.trim().toLowerCase(),
          password,
        },
      );

      await storeTokens(response.data);

      const currentUser = await fetchMe();

      setUser(currentUser);
      setStatus("authenticated");
    },
    [fetchMe, storeTokens],
  );

  /**
   * REGISTER
   *
   * Backend response:
   *
   * {
   *   user: {...},
   *   tokens: {
   *     access: "...",
   *     refresh: "..."
   *   }
   * }
   */
  const register = useCallback(
    async (data: RegisterPayload) => {
      const response = await api.post<AuthResponse>(
        "/api/accounts/auth/register/",
        {
          username: data.username.trim(),

          display_name: data.display_name.trim(),

          email: data.email.trim().toLowerCase(),

          password: data.password,

          password_confirm: data.password_confirm,
        },
      );

      /**
       * IMPORTANT:
       *
       * Tokens are inside:
       *
       * response.data.tokens
       */
      await storeTokens(response.data);

      /**
       * Now fetch authenticated user.
       */
      const currentUser = await fetchMe();

      setUser(currentUser);
      setStatus("authenticated");
    },
    [fetchMe, storeTokens],
  );

  /**
   * LOGOUT
   */
  const logout = useCallback(async () => {
    try {
      const refresh = await getRefreshToken();

      if (refresh) {
        try {
          await api.post("/api/accounts/auth/logout/", {
            refresh,
          });
        } catch (error) {
          console.log("BACKEND LOGOUT ERROR:", error);
        }
      }
    } finally {
      await clearTokens();

      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  /**
   * RESTORE SESSION ON APP START
   */
  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      login,
      register,
      logout,
      refreshSession,
    }),
    [status, user, login, register, logout, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth()
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
