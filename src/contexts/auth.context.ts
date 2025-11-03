import { createContext, useContext } from "react";

// 定義使用者物件的型別
export interface User {
  id: string;
  email: string;
}

// 定義 AuthContext 的型別
export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUserState: (user: User) => void; // 新增：手動設定使用者狀態的方法
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
