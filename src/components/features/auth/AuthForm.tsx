import { useAuthForm } from "./useAuthForm";
import { Chrome, Facebook } from "lucide-react";
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
    handleVerifyOtp,
    handleSendVerificationCode,
    handleSubmit,
    isVerifyingOtp,
    isOtpVerified,
    isSubmitting,
    handleForgotPasswordRequest,
  } = useAuthForm();

  if (mode === "forgotPassword") {
    return (
      <div
        className={`w-full max-w-md p-8 space-y-6 ${theme.cardBg} rounded-lg shadow-lg`}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">忘記密碼</h1>
          <p className="text-gray-600">
            請輸入您的電子郵件以接收密碼重設連結。
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleForgotPasswordRequest();
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
          <Button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-900 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "發送中..." : "發送重設信件"}
          </Button>
        </form>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setMode("login")}
            className="font-medium text-green-600 hover:underline"
          >
            返回登入
          </button>
        </div>
      </div>
    );
  }

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
                disabled={isOtpVerified} // 如果已驗證，則禁用輸入框
                placeholder="輸入驗證碼"
              />
              {/* 如果已發送驗證碼且尚未驗證成功，顯示驗證按鈕 */}
              {isCodeSent && !isOtpVerified && (
                <Button
                  type="button"
                  variant="outline"
                  className="whitespace-nowrap"
                  onClick={handleVerifyOtp}
                  disabled={isVerifyingOtp}
                >
                  {isVerifyingOtp ? "驗證中..." : "驗證"}
                </Button>
              )}

              {/* 如果已驗證，則不顯示發送按鈕 */}
              {!isOtpVerified && (
                <Button
                  // 如果正在驗證中，也禁用發送按鈕
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
              )}
            </div>
            {verificationMsg && (
              <p
                className={`text-sm mt-1 ${
                  isOtpVerified ? "text-green-600" : "text-gray-600"
                }`}
              >
                {verificationMsg}
              </p>
            )}
            {errors.verificationCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.verificationCode}
              </p>
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
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </FormField>
        )}

        {isLogin && (
          <div className="flex justify-end -mt-4 mb-4">
            <button
              type="button"
              onClick={() => setMode("forgotPassword")}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              忘記密碼？
            </button>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-green-800 hover:bg-green-900 text-white"
          disabled={isCoolingDown}
        >
          {isCoolingDown ? "請稍後..." : isLogin ? "登入" : "註冊"}
        </Button>
      </form>

      {isLogin && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">或</span>
            </div>
          </div>
          <div className="space-y-4">
            <a
              href={`${import.meta.env.VITE_API_BASE_URL}/auth/google`}
              className="inline-block w-full"
            >
              <Button variant="outline" className="w-full">
                <Chrome size={20} className="mr-2" />
                使用 Google 登入
              </Button>
            </a>
            {/* <Button
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <Facebook size={20} className="mr-2" />
              使用 Facebook 登入
            </Button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;
