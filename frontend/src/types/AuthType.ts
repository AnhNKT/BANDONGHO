// src/types/AuthType.ts

export interface UserType {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user";
  token?: string; // token JWT
}

export interface AuthType {
  user: UserType | null;
  token?: string;        // token lấy từ user
  login: (data: UserType) => void;
  logout: () => void;
}
