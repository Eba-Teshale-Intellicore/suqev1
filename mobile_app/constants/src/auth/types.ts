export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  phone_number?: string | null;
  auth_provider?: string;
  role: string;
  is_verified: boolean;
  is_active: boolean;
}

export interface AuthResponse {
  user: AuthUser;

  tokens: {
    access: string;
    refresh: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  display_name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;

  login: (email: string, password: string) => Promise<void>;

  register: (data: RegisterPayload) => Promise<void>;

  logout: () => Promise<void>;

  refreshSession: () => Promise<void>;
}
