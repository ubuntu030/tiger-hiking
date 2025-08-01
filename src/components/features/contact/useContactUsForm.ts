import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ErrorMessages {
  name?: string;
  email?: string;
  message?: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  message: '',
};

export const useContactUsForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ErrorMessages>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ErrorMessages]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): ErrorMessages => {
    const newErrors: ErrorMessages = {};
    if (!formData.name.trim()) {
      newErrors.name = '姓名為必填欄位';
    }
    if (!formData.email.trim()) {
      newErrors.email = '電子郵件為必填欄位';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = '電子郵件格式不正確';
    }
    if (!formData.message.trim()) {
      newErrors.message = '訊息為必填欄位';
    }
    return newErrors;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return {
    formData,
    errors,
    setErrors,
    handleChange,
    validate,
    resetForm,
  };
};