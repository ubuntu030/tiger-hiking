import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { SEND_CONTACT_MESSAGE } from "../graphql/queries";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  form?: string; // For general form errors
}

export const useContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const [sendContactMessage, { loading }] = useMutation(SEND_CONTACT_MESSAGE);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
      }
    },
    [errors]
  );

  const validate = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};
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
      await sendContactMessage({ variables: formData });
      toast.success("您的訊息已成功送出！");

      resetForm();
      return true;
    } catch (e: any) {
      const errorMessage = e.message || "提交失敗，請稍後再試。";
      toast.error(errorMessage);
      setErrors({ form: errorMessage });
      return false;
    }
  };

  return { formData, errors, loading, handleChange, submit };
};
