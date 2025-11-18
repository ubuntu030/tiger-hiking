import { useResetPassword } from "../hooks/useResetPassword";
import Button from "../components/common/Button";
import FormField from "../components/common/FormField";
import InputField from "../components/common/InputField";
import PageContainer from "../components/layout/PageContainer";
import theme from "../constants/theme";
import PageTitle from "../components/layout/PageTitle";

const ResetPasswordPage = () => {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    isSubmitting,
    handleSubmit,
  } = useResetPassword();

  return (
    <PageContainer>
      <PageTitle title="重設密碼" />
      <div className="flex justify-center items-center py-12">
        <div
          className={`w-full max-w-md p-8 space-y-6 ${theme.cardBg} rounded-lg shadow-lg`}
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">重設密碼</h1>
            <p className="text-gray-600">請輸入您的新密碼。</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="新密碼" htmlFor="password">
              <InputField
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </FormField>
            <FormField label="確認新密碼" htmlFor="confirm-password">
              <InputField
                id="confirm-password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </FormField>
            <Button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "處理中..." : "重設密碼"}
            </Button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default ResetPasswordPage;
