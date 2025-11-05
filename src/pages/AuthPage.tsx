import { Navigate } from "react-router-dom";
import AuthForm from "../components/features/auth/AuthForm";
import { useAuth } from "../contexts/auth.context";

const AuthPage = () => {
  const { isLoggedIn, loading } = useAuth();

  // 當 AuthProvider 正在驗證使用者登入狀態時，顯示載入中
  // 這可以防止在確認狀態前，頁面內容閃爍
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div>載入中...</div>
      </div>
    );
  }

  // 如果使用者已經登入，就將他們導向到 /profile 頁面
  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="flex justify-center items-center py-12">
      <AuthForm />
    </div>
  );
};

export default AuthPage;
