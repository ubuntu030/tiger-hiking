import React, { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { useMutation, useApolloClient, useLazyQuery } from "@apollo/client";
import { LOGIN_USER, LOGOUT_USER, GET_MY_PROFILE } from "../graphql/queries";
import { AuthContext, type AuthContextType } from "./auth.context";
import type { User } from "./auth.context";

// 定義 AuthProvider 的 props
interface AuthProviderProps {
  children: ReactNode;
}

// 建立 AuthProvider 元件
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 初始 isLoggedIn 狀態設為 false，loading 設為 true，表示正在驗證登入狀態
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 初始設為 true
  const client = useApolloClient();

  const [loginMutation] = useMutation(LOGIN_USER);
  const [logoutMutation] = useMutation(LOGOUT_USER);
  const [checkLoginStatus, { loading: checkLoginLoading }] =
    useLazyQuery(GET_MY_PROFILE);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // 透過 GET_MY_PROFILE 查詢來檢查使用者是否已經登入 (HttpOnly Cookie)
        const { data } = await checkLoginStatus();
        if (data && data.me) {
          setIsLoggedIn(true);
          setUser(data.me);
        }
      } catch (error) {
        // 發生錯誤（例如 token 過期或無效），確保使用者為登出狀態
        setIsLoggedIn(false);
        setUser(null);
      }
      setLoading(false); // 驗證完畢，結束 loading
    };
    verifyUser();
  }, [checkLoginStatus]);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const { data } = await loginMutation({
          variables: { input: { email, password } },
        });
        if (data.login.success) {
          setIsLoggedIn(true);
          setUser(data.login.user);
        } else {
          throw new Error(data.login.message || "Login failed");
        }
      } finally {
        setLoading(checkLoginLoading); // 登入操作結束後，loading 狀態應回歸 checkLoginLoading
      }
    },
    [loginMutation]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutMutation();
      setIsLoggedIn(false);
      setUser(null);
      await client.resetStore();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(checkLoginLoading); // 登出操作結束後，loading 狀態應回歸 checkLoginLoading
    }
  }, [logoutMutation, client]);

  const setUserState = useCallback((newUser: User) => {
    setIsLoggedIn(true);
    setUser(newUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, loading, setUserState }}
    >
      {children}
    </AuthContext.Provider>
  );
};
