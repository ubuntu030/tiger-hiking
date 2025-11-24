import { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  isValidEmail,
  isValidPhone,
  isValidTaiwanId,
  isValidPassport,
} from "../../../utils/validators";
import {
  GET_MY_PROFILE_DETAIL,
  UPDATE_MY_PROFILE,
} from "../../../graphql/queries";

export interface ProfileFormData {
  gender: string;
  birthDate: string;
  nationality: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
  emergencyContact: string;
  emergencyContactPhone: string;
  hikingExperience: string;
}

export type ProfileFormErrors = Partial<Record<keyof ProfileFormData, string>>;

const initialFormData: ProfileFormData = {
  gender: "MALE",
  birthDate: "",
  nationality: "local",
  email: "",
  idNumber: "",
  phoneNumber: "",
  emergencyContact: "",
  emergencyContactPhone: "",
  hikingExperience: "",
};

export const useProfileForm = () => {
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);
  const [errors, setErrors] = useState<ProfileFormErrors>({});

  // 1. 獲取使用者資料
  const { loading: queryLoading, error: queryError } = useQuery(
    GET_MY_PROFILE_DETAIL,
    {
      onCompleted: (data) => {
        if (data?.me) {
          const { email, profile } = data.me;
          const initialValues = {
            email: email || "",
            gender: profile?.gender || "MALE",
            birthDate: profile?.birthDate
              ? new Date(profile.birthDate).toISOString().split("T")[0]
              : "",
            nationality: profile?.nationality || "local",
            idNumber: profile?.idNumber || "",
            phoneNumber: profile?.phoneNumber || "",
            emergencyContact: profile?.emergencyContact || "",
            emergencyContactPhone: profile?.emergencyContactPhone || "",
            hikingExperience: profile?.hikingExperience || "",
          };
          setFormData(initialValues);
        }
      },
      fetchPolicy: "network-only", // 確保每次都從網路獲取最新資料
    }
  );

  // 2. 更新使用者資料的 Mutation
  const [updateProfile, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_MY_PROFILE);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof ProfileFormData]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const validate = useCallback(() => {
    const newErrors: ProfileFormErrors = {};
    if (!formData.gender) newErrors.gender = "性別為必填";
    if (!formData.birthDate) newErrors.birthDate = "生日為必填";

    if (!formData.email) {
      newErrors.email = "電子郵件為必填";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "請輸入有效的電子郵件地址";
    }

    if (!formData.idNumber) {
      newErrors.idNumber = "身分證或護照號碼為必填";
    } else if (
      formData.nationality === "local" &&
      !isValidTaiwanId(formData.idNumber)
    ) {
      newErrors.idNumber = "請輸入有效的台灣身分證號碼";
    } else if (
      formData.nationality === "foreign" &&
      !isValidPassport(formData.idNumber)
    ) {
      newErrors.idNumber = "請輸入有效的護照號碼";
    }

    if (!formData.phoneNumber) newErrors.phoneNumber = "手機為必填";
    else if (!isValidPhone(formData.phoneNumber))
      newErrors.phoneNumber = "請輸入有效的手機號碼";
    if (!formData.emergencyContact)
      newErrors.emergencyContact = "緊急聯絡人為必填";
    if (!formData.emergencyContactPhone)
      newErrors.emergencyContactPhone = "緊急聯絡人電話為必填";
    else if (!isValidPhone(formData.emergencyContactPhone))
      newErrors.emergencyContactPhone = "請輸入有效的緊急聯絡人電話";

    return newErrors;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const { birthDate, ...rest } = formData;
        const variables = {
          ...rest,
          birthDate: birthDate ? new Date(birthDate).toISOString() : null,
        };
        await updateProfile({ variables });
        return true; // 表示成功
      } catch (e) {
        console.error("Error updating profile:", e);
        return false; // 表示失敗
      }
    }
    return false; // 驗證失敗
  }, [formData, validate, updateProfile]);

  return {
    formData,
    errors,
    loading: queryLoading || mutationLoading,
    error: queryError || mutationError,
    handleChange,
    handleSubmit,
  };
};
