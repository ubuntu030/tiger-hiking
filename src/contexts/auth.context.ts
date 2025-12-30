import { createContext, useContext } from "react";

// 定義使用者物件的型別
export interface User {
  id: string;
  email: string;
  role: string; // Add role for admin checks
}

// 定義 AuthContext 的型別
export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password:string) => Promise<void>;
  logout: () => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<boolean | undefined>; // For admin MFA step 1, returns adminOtpRequired
  verifyOtp: (email: string, otp: string) => Promise<void>; // For admin MFA step 2
  setUserState: (user: User) => void;
  loading: boolean;
}

// 建立 AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// 建立 useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

