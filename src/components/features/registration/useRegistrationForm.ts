import { useState, useCallback } from "react";

interface ErrorMessages {
  [key: string]: string | null;
}

export interface RegistrationFormData {
  plan: string;
  name: string;
  idNumber: string;
  email: string;
  nationality: "local" | "foreign";
  emergencyContact: string;
  emergencyPhone: string;
  address: string;
  mobile: string;
  phone: string | null;
}

const initialFormState = {
  plan: "",
  name: "",
  idNumber: "",
  email: "",
  nationality: "local",
  emergencyContact: "",
  emergencyPhone: "",
  address: "",
  mobile: "",
  phone: "",
};

const isValidTaiwanId = (id: string): boolean => {
  if (!/^[A-Z][12]\d{8}$/.test(id)) {
    return false;
  }

  const letterValues: { [key: string]: number } = {
    A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 34, J: 18, K: 19, L: 20, M: 21,
    N: 22, O: 35, P: 23, Q: 24, R: 25, S: 26, T: 27, U: 28, V: 29, W: 32, X: 30, Y: 31, Z: 33,
  };

  const firstLetter = id.charAt(0).toUpperCase();
  const letterValue = letterValues[firstLetter];

  if (letterValue === undefined) {
    return false;
  }

  const d1 = Math.floor(letterValue / 10);
  const d2 = letterValue % 10;

  let sum = d1;
  sum += d2 * 9;

  for (let i = 1; i < 9; i++) {
    sum += parseInt(id.charAt(i), 10) * (9 - i);
  }
  sum += parseInt(id.charAt(9), 10);

  return sum % 10 === 0;
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
    const phoneRegex = /^\d+$/;
    const passportRegex = /^[A-Z0-9]+$/;

    if (!formData.plan) newErrors.plan = "方案選擇為必填欄位";
    if (!formData.name) newErrors.name = "姓名為必填欄位";
    if (!formData.idNumber) {
      newErrors.idNumber = "身分證號碼/護照號碼為必填欄位";
    } else if (
      formData.nationality === "local" &&
      !isValidTaiwanId(formData.idNumber)
    ) {
      newErrors.idNumber = "台灣身分證格式不正確";
    } else if (
      formData.nationality === "foreign" &&
      !passportRegex.test(formData.idNumber)
    ) {
      newErrors.idNumber = "護照號碼格式不正確 (僅能包含英數字)";
    }
    if (!formData.email) {
      newErrors.email = "電子郵件為必填欄位";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "電子郵件格式不正確";
    }
    if (!formData.nationality) newErrors.nationality = "國籍為必填欄位";
    if (!formData.emergencyContact)
      newErrors.emergencyContact = "緊急聯絡人為必填欄位";
    if (!formData.emergencyPhone) {
      newErrors.emergencyPhone = "緊急聯絡人電話為必填欄位";
    } else if (!phoneRegex.test(formData.emergencyPhone)) {
      newErrors.emergencyPhone = "電話號碼僅能包含數字";
    }
    if (!formData.address) newErrors.address = "聯絡地址為必填欄位";
    if (!formData.mobile) {
      newErrors.mobile = "手機為必填欄位";
    } else if (!phoneRegex.test(formData.mobile)) {
      newErrors.mobile = "手機號碼僅能包含數字";
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "市話號碼僅能包含數字";
    }
    return newErrors;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setErrors({});
  }, []);

  return { formData, errors, handleChange, validate, setErrors, resetForm };
};
