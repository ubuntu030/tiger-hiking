import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "./queries";
import { useToast } from "../hooks/useToast";

const initialFormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const useChangePasswordForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormData);
  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof typeof errors]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const { showToast } = useToast();

  const validate = () => {
    const newErrors = { ...initialFormData };
    let isValid = true;

    if (!formData.currentPassword) {
      newErrors.currentPassword = "請輸入目前密碼";
      isValid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "請輸入新密碼";
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "新密碼長度至少需要 8 個字元";
      isValid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "新密碼與確認密碼不相符";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return { success: false, message: "請檢查您的輸入" };
    }

    try {
      const { data } = await changePassword({
        variables: {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
      });
      if (data.changePassword.success) {
        setFormData(initialFormData); // 成功後清空表單
        showToast("密碼已成功更改", "success");
      }
      return data.changePassword;
    } catch (e: any) {
      // 錯誤可能來自網路或後端驗證 (如：目前密碼錯誤)
      return { success: false, message: e.message || "發生未知錯誤" };
    }
  };

  return {
    formData,
    errors,
    loading,
    apiError: error,
    handleChange,
    handleSubmit,
  };
};
