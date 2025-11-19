// src/context/AuthContext.tsx
import { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface AuthType {
  user: UserType | null;
  token?: string;
  login: (user: UserType, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthType>({
  user: null,
  token: undefined,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState<string | undefined>(() => localStorage.getItem("token") || undefined);

  const login = (userData: UserType, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
