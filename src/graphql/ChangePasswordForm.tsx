import Button from "../components/common/Button";
import FormField from "../components/common/FormField";
import InputField from "../components/common/InputField";
import { useChangePasswordForm } from "./useChangePasswordForm";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const { formData, errors, loading, handleChange, handleSubmit } =
    useChangePasswordForm();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await handleSubmit();
    if (result.success) {
      toast.success(result.message || "密碼更新成功！");
    } else {
      toast.error(result.message || "密碼更新失敗。");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-md">
      <FormField
        label="目前密碼"
        htmlFor="currentPassword"
        error={errors.currentPassword}
      >
        <InputField
          id="currentPassword"
          name="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={handleChange}
          error={!!errors.currentPassword}
        />
      </FormField>

      <FormField
        label="新密碼"
        htmlFor="newPassword"
        error={errors.newPassword}
      >
        <InputField
          id="newPassword"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          error={!!errors.newPassword}
        />
      </FormField>

      <FormField
        label="確認新密碼"
        htmlFor="confirmPassword"
        error={errors.confirmPassword}
      >
        <InputField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
        />
      </FormField>

      <Button type="submit" disabled={loading}>
        {loading ? "更新中..." : "更改密碼"}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
