import { useState, useCallback } from "react";
import {
  isValidTaiwanId,
  isValidPassport,
  isValidEmail,
  isValidPhone,
} from "../../../utils/validators";

interface ErrorMessages {
  [key: string]: string | null;
}

export interface RegistrationFormData {
  plan: string;
  name: string;
  gender: "MALE" | "FEMALE";
  idNumber: string;
  email: string;
  nationality: "local" | "foreign";
  emergencyContact: string;
  emergencyPhone: string;
  address: string;
  mobile: string;
  phone: string | null;
  hikingExperience: string;
}

const initialFormState = {
  plan: "",
  name: "",
  gender: "MALE",
  idNumber: "",
  email: "",
  nationality: "local",
  emergencyContact: "",
  emergencyPhone: "",
  address: "",
  mobile: "",
  phone: "",
  hikingExperience: "",
};

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<ErrorMessages>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      let processedValue = value;
      if (name === "idNumber") {
        // Automatically convert to uppercase for both Taiwan ID and Passport
        processedValue = value.toUpperCase();
      }
      setFormData((prev) => ({ ...prev, [name]: processedValue }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    },
    [errors]
  );

  const validate = useCallback(() => {
    const newErrors: ErrorMessages = {};

    if (!formData.plan) newErrors.plan = "方案選擇為必填欄位";
    if (!formData.name) newErrors.name = "姓名為必填欄位";
    if (!formData.gender) newErrors.gender = "性別為必填欄位";
    if (!formData.idNumber) {
      newErrors.idNumber = "身分證號碼/護照號碼為必填欄位";
    } else if (
      formData.nationality === "local" &&
      !isValidTaiwanId(formData.idNumber)
    ) {
      newErrors.idNumber = "台灣身分證格式不正確";
    } else if (
      formData.nationality === "foreign" &&
      !isValidPassport(formData.idNumber)
    ) {
      newErrors.idNumber = "護照號碼格式不正確 (僅能包含英數字)";
    }
    if (!formData.email) {
      newErrors.email = "電子郵件為必填欄位";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "電子郵件格式不正確";
    }
    if (!formData.nationality) newErrors.nationality = "國籍為必填欄位";
    if (!formData.emergencyContact)
      newErrors.emergencyContact = "緊急聯絡人為必填欄位";
    if (!formData.emergencyPhone) {
      newErrors.emergencyPhone = "緊急聯絡人電話為必填欄位";
    } else if (!isValidPhone(formData.emergencyPhone)) {
      newErrors.emergencyPhone = "電話號碼僅能包含數字";
    }
    if (!formData.address) newErrors.address = "聯絡地址為必填欄位";
    if (!formData.mobile) {
      newErrors.mobile = "手機為必填欄位";
    } else if (!isValidPhone(formData.mobile)) {
      newErrors.mobile = "手機號碼僅能包含數字";
    }
    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = "市話號碼僅能包含數字";
    }
    if (formData.hikingExperience && formData.hikingExperience.length > 500) {
      newErrors.hikingExperience = "登山經歷簡述不能超過 500 字";
    }
    return newErrors;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setErrors({});
  }, []);

  return { formData, errors, handleChange, validate, setErrors, resetForm };
};
