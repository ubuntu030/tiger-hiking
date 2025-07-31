import { useState, useCallback } from 'react';

interface ErrorMessages {
  [key: string]: string | null;
}

const initialFormState = {
  name: '',
  idNumber: '',
  email: '',
  nationality: 'local',
  emergencyContact: '',
  emergencyPhone: '',
  address: '',
  mobile: '',
  phone: '',
};

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<ErrorMessages>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const validate = useCallback(() => {
    const newErrors: ErrorMessages = {};
    if (!formData.name) newErrors.name = '姓名為必填欄位';
    if (!formData.idNumber) newErrors.idNumber = '身分證為必填欄位';
    if (!formData.email) {
      newErrors.email = '電子郵件為必填欄位';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = '電子郵件格式不正確';
    }
    if (!formData.nationality) newErrors.nationality = '國籍為必填欄位';
    if (!formData.emergencyContact)
      newErrors.emergencyContact = '緊急聯絡人為必填欄位';
    if (!formData.emergencyPhone)
      newErrors.emergencyPhone = '緊急聯絡人電話為必填欄位';
    if (!formData.address) newErrors.address = '聯絡地址為必填欄位';
    if (!formData.mobile) newErrors.mobile = '手機為必填欄位';
    return newErrors;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setErrors({});
  }, []);

  return { formData, errors, handleChange, validate, setErrors, resetForm };
};