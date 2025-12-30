import React, { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { useMutation, useApolloClient, useLazyQuery } from "@apollo/client";
import { LOGIN_USER, LOGOUT_USER, GET_MY_PROFILE, ADMIN_LOGIN_WITH_OTP } from "../graphql/queries";
import { AuthContext } from "./auth.context";
import type { User } from "./auth.context";

// 定義 AuthProvider 的 props
interface AuthProviderProps {
  children: ReactNode;
}

// 建立 AuthProvider 元件
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const client = useApolloClient();

  const [loginMutation] = useMutation(LOGIN_USER);
  const [logoutMutation] = useMutation(LOGOUT_USER);
  const [adminLoginWithOtpMutation] = useMutation(ADMIN_LOGIN_WITH_OTP);
  const [checkLoginStatus, { loading: checkLoginLoading }] =
    useLazyQuery(GET_MY_PROFILE);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await checkLoginStatus();
        if (data && data.me) {
          setIsLoggedIn(true);
          setUser(data.me);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
      setLoading(false);
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
        if (data.login.success && !data.login.adminOtpRequired) {
          setIsLoggedIn(true);
          setUser(data.login.user);
        } else if (!data.login.success) {
          throw new Error(data.login.message || "Login failed");
        }
      } finally {
        setLoading(checkLoginLoading);
      }
    },
    [loginMutation, checkLoginLoading]
  );
  
  const adminLogin = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const { data } = await loginMutation({
          variables: { input: { email, password } },
        });
        if (!data.login.success) {
          throw new Error(data.login.message || "Admin login failed");
        }
        return data.login.adminOtpRequired;
      } finally {
        setLoading(checkLoginLoading);
      }
    },
    [loginMutation, checkLoginLoading]
  );

  const verifyOtp = useCallback(
    async (email: string, otp: string) => {
      setLoading(true);
      try {
        const { data } = await adminLoginWithOtpMutation({
          variables: { input: { email, otpCode: otp } },
        });
        if (data.loginAdminWithOtp.success) {
          setIsLoggedIn(true);
          setUser(data.loginAdminWithOtp.user);
        } else {
          throw new Error(data.loginAdminWithOtp.message || "OTP verification failed");
        }
      } finally {
        setLoading(checkLoginLoading);
      }
    },
    [adminLoginWithOtpMutation, checkLoginLoading]
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
      setLoading(checkLoginLoading);
    }
  }, [logoutMutation, client, checkLoginLoading]);

  const setUserState = useCallback((newUser: User) => {
    setIsLoggedIn(true);
    setUser(newUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, adminLogin, verifyOtp, loading, setUserState }}
    >
      {children}
    </AuthContext.Provider>
  );
};
