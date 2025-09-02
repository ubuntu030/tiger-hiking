import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { SEND_CONTACT_MESSAGE } from "../graphql/queries";
import { useToast } from "./useToast";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
  form?: string; // For general form errors
}

export const useContactUs = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const { showToast } = useToast();

  const [sendContactMessage, { loading }] = useMutation(SEND_CONTACT_MESSAGE, {
    onCompleted: () => {
      showToast("您的訊息已成功送出！", "success");
      console.log(loading);

      resetForm();
    },
    onError: (e) => {
      const errorMessage = e.message || "提交失敗，請稍後再試。";
      showToast(errorMessage, "error");
      setErrors({ form: errorMessage });
    },
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof ContactFormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
      }
    },
    [errors]
  );

  const validate = useCallback((): ContactFormErrors => {
    const newErrors: ContactFormErrors = {};
    if (!formData.name.trim()) newErrors.name = "姓名為必填";
    if (!formData.email.trim()) {
      newErrors.email = "電子郵件為必填";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "電子郵件格式不正確";
    }
    if (!formData.message.trim()) newErrors.message = "訊息為必填";
    return newErrors;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  }, []);

  const submit = async (): Promise<boolean> => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    try {
      // 成功與錯誤的副作用 (side effects) 將由 onCompleted 和 onError 處理
      await sendContactMessage({ variables: formData });
      return true;
    } catch (e) {
      // onError 已經處理了錯誤訊息的顯示，
      // 這裡的 catch 確保 submit 函式在出錯時能回傳 false。
      return false;
    }
  };

  return { formData, errors, loading, handleChange, submit };
};
