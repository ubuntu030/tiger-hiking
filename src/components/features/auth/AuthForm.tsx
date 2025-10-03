import { useAuthForm } from "./useAuthForm";
import { Eye, EyeOff, Chrome, Facebook } from "lucide-react";
import PasswordStrength from "./PasswordStrength";
import Button from "../../common/Button";
import FormField from "../../common/FormField";
import InputField from "../../common/InputField";
import theme from "../../../constants/theme";

const AuthForm = () => {
  const {
    mode,
    setMode,
    formData,
    errors,
    isLogin,
    isCoolingDown,
    isCodeSent,
    isSendingCode,
    verificationMsg,
    handleChange,
    handleSendVerificationCode,
    handleSubmit,
  } = useAuthForm();

  return (
    <div
      className={`w-full max-w-md p-8 space-y-6 ${theme.cardBg} rounded-lg shadow-lg`}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {isLogin ? "登入" : "註冊"}
        </h1>
        <p className="text-gray-600">
          {isLogin ? "歡迎回來！" : "建立一個新帳戶"}
        </p>
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          onClick={() => setMode("login")}
          className={`${
            isLogin
              ? `${theme.primary} ${theme.primaryHover}`
              : "bg-gray-200 text-gray-700"
          } transition`}
        >
          登入
        </Button>
        <Button
          onClick={() => setMode("register")}
          className={`${
            !isLogin
              ? `${theme.primary} ${theme.primaryHover}`
              : "bg-gray-200 text-gray-700"
          } transition`}
        >
          註冊
        </Button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-6"
      >
        <FormField label="電子郵件" htmlFor="email">
          <InputField
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </FormField>

        {/* 電子郵件驗證（註冊時顯示） */}
        {!isLogin && (
          <FormField label="驗證電子信箱" htmlFor="email-code">
            <div className="flex items-center space-x-2">
              <InputField
                id="email-code"
                name="verificationCode"
                type="text"
                value={formData.verificationCode}
                onChange={handleChange}
                placeholder="輸入驗證碼"
              />
              <Button
                type="button"
                variant="outline"
                className="whitespace-nowrap"
                onClick={handleSendVerificationCode}
                disabled={isSendingCode}
              >
                {isSendingCode
                  ? "發送中..."
                  : isCodeSent
                  ? "再次發送"
                  : "發送驗證碼"}
              </Button>
            </div>
            {verificationMsg && (
              <p className="text-sm mt-1 text-green-600">{verificationMsg}</p>
            )}
          </FormField>
        )}

        <FormField label="密碼" htmlFor="password">
          <InputField
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </FormField>

        {!isLogin && (
          <FormField label="確認密碼" htmlFor="confirm-password">
            <InputField
              id="confirm-password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </FormField>
        )}

        <Button
          type="submit"
          className="w-full bg-green-800 hover:bg-green-900 text-white"
          disabled={isCoolingDown}
        >
          {isCoolingDown ? "請稍後..." : isLogin ? "登入" : "註冊"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">或</span>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          <Chrome size={20} className="mr-2" />
          使用 Google 登入
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          <Facebook size={20} className="mr-2" />
          使用 Facebook 登入
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
