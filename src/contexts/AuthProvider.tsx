import React, { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { LOGIN_USER, LOGOUT_USER } from "../graphql/queries";
import { AuthContext, type AuthContextType } from "./auth.context";
import type { User } from "./auth.context";

// 定義 AuthProvider 的 props
interface AuthProviderProps {
  children: ReactNode;
}

// 建立 AuthProvider 元件
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();

  const [loginMutation] = useMutation(LOGIN_USER);
  const [logoutMutation] = useMutation(LOGOUT_USER);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const { data } = await loginMutation({
          variables: { email, password },
        });
        if (data.login.success) {
          setIsLoggedIn(true);
          setUser(data.login.user);
        } else {
          throw new Error(data.login.message || "Login failed");
        }
      } finally {
        setLoading(false);
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
      setLoading(false);
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
