import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useAuth } from "../../../contexts/auth.context";
import {
  isValidTaiwanId,
  isValidPassport,
  isValidEmail,
  isValidPhone,
} from "../../../utils/validators";
import { GET_MY_PROFILE_DETAIL } from "../../../graphql/queries";

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
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    ...initialFormState,
    email: user?.email || "",
  });
  const [errors, setErrors] = useState<ErrorMessages>({});

  // 當使用者登入時，獲取其詳細個人資料以預填表單
  useQuery(GET_MY_PROFILE_DETAIL, {
    skip: !user, // 如果未登入，則跳過此查詢
    onCompleted: (data) => {
      if (data?.me?.profile) {
        const { email, name, profile } = data.me;
        setFormData((prev) => ({
          ...prev,
          name: name || prev.name,
          email: email || prev.email,
          gender: profile.gender || prev.gender,
          idNumber: profile.idNumber || prev.idNumber,
          nationality: profile.nationality || prev.nationality,
          mobile: profile.phoneNumber || prev.mobile,
          address: profile.address || prev.address,
          emergencyContact: profile.emergencyContact || prev.emergencyContact,
          emergencyPhone: profile.emergencyContactPhone || prev.emergencyPhone,
          hikingExperience: profile.hikingExperience || prev.hikingExperience, // 注意：'name' 和 'address' 不在 GET_MY_PROFILE_DETAIL 中，
          // 所以它們會保留初始值或使用者已輸入的值。
        }));
      }
    },
    fetchPolicy: "network-only", // 確保獲取的是最新資料
  });

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
    setFormData({
      ...initialFormState,
      email: user?.email || "",
    });
    setErrors({});
  }, [user]);

  return { formData, errors, handleChange, validate, setErrors, resetForm };
};
