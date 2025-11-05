import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

/**
 * 受保護的路由元件
 * - 檢查使用者是否登入，如果未登入，則導向到 /auth 頁面
 * - 處理初始載入狀態，避免在驗證登入狀態時閃爍頁面
 */
const ProtectedRoute: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  // 如果正在驗證登入狀態，顯示載入中...
  // 這可以防止在 AuthProvider 的 useEffect 完成前，
  // 因 isLoggedIn 為 false 而錯誤地跳轉到登入頁。
  if (loading) {
    return <div>載入中...</div>; // 或者一個更美觀的全域 Spinner
  }

  // 如果驗證完畢且未登入，導向到 /auth 頁面
  // 我們將使用者原本想去的頁面路徑 (location) 存在 state 中，
  // 這樣登入成功後，就可以將他們導回原處。
  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 如果已登入，渲染子路由
  // <Outlet /> 會渲染匹配到的子路由元件
  return <Outlet />;
};

export default ProtectedRoute;
