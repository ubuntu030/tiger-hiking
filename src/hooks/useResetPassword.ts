import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../graphql/queries";
import { useToast } from "./useToast";
import { isValidPassword } from "../utils/validators";

export const useResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [resetPasswordMutation] = useMutation(RESET_PASSWORD);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    if (!token) {
      showToast("無效的重設連結或連結已過期", "error");
      navigate("/auth");
    }
    setResetToken(token);
  }, [location.search, navigate, showToast]);

  const validate = useCallback(() => {
    const newErrors: { password?: string; confirmPassword?: string } = {};
    if (!password) {
      newErrors.password = "密碼為必填欄位";
    } else if (!isValidPassword(password)) {
      newErrors.password = "密碼必須包含至少一個英文字母";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "確認密碼為必填欄位";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "兩次密碼不匹配";
    }
    return newErrors;
  }, [password, confirmPassword]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      if (!resetToken) {
        showToast("重設權杖遺失，請點擊信箱中的連結重試", "error");
        return;
      }

      setIsSubmitting(true);
      setErrors({});

      try {
        const { data } = await resetPasswordMutation({
          variables: {
            input: {
              token: resetToken,
              password: password,
            },
          },
        });

        if (data?.resetPassword?.success) {
          showToast(
            data.resetPassword.message || "密碼已成功重設！將為您導向登入頁",
            "success"
          );
          navigate("/auth");
        } else {
          showToast(data?.resetPassword?.message || "密碼重設失敗", "error");
        }
      } catch (error) {
        showToast("密碼重設時發生錯誤", "error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [validate, resetToken, password, resetPasswordMutation, showToast, navigate]
  );

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    isSubmitting,
    handleSubmit,
  };
};
