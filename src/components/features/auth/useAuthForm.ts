import { useState, useCallback } from "react";

type AuthMode = "login" | "register";

export interface AuthFormState {
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
}

const initialFormState: AuthFormState = {
  email: "",
  password: "",
  confirmPassword: "",
  verificationCode: "",
};

export const useAuthForm = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState<AuthFormState>(initialFormState);
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [verificationMsg, setVerificationMsg] = useState<string | null>(null);

  const isLogin = mode === "login";

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof AuthFormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
      console.log(formData);
    },
    [errors]
  );

  const validate = useCallback(() => {
    const newErrors: AuthFormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "電子郵件為必填欄位";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "電子郵件格式不正確";
    }

    if (!isLogin) {
      if (!formData.password) {
        newErrors.password = "密碼為必填欄位";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "確認密碼為必填欄位";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "兩次密碼不匹配";
      }
      if (!formData.verificationCode) {
        newErrors.verificationCode = "驗證碼為必填欄位";
      }
    }

    return newErrors;
  }, [formData, isLogin]);

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setErrors({});
    setVerificationMsg(null);
    setIsCodeSent(false);
    setIsSendingCode(false);
  }, []);

  const handleSendVerificationCode = useCallback(() => {
    if (!formData.email || errors.email) {
      setVerificationMsg("請先輸入有效的電子郵件再發送驗證碼。");
      return;
    }
    setVerificationMsg(null);
    setIsSendingCode(true);

    // 模擬 API 呼叫
    setTimeout(() => {
      setIsSendingCode(false);
      setIsCodeSent(true);
      setVerificationMsg("驗證碼已發送至電子郵件，請檢查信箱。");
    }, 1000);
  }, [formData.email, errors]);

  const handleSubmit = useCallback(() => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isLogin) {
      // 模擬登入邏輯
      if (
        formData.email !== "test@test.com" ||
        formData.password !== "Password123!"
      ) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        if (newAttempts >= 5) {
          setIsCoolingDown(true);
          setTimeout(() => {
            setIsCoolingDown(false);
            setLoginAttempts(0);
          }, 10000); // 10 秒冷卻
        }
      } else {
        alert("登入成功！");
      }
    } else {
      // 模擬註冊邏輯
      alert("註冊成功！將自動登入並導向首頁。");
    }
  }, [formData, isLogin, loginAttempts, validate]);

  return {
    mode,
    setMode,
    formData,
    errors,
    isLogin,
    isCoolingDown,
    isCodeSent,
    isSendingCode,
    verificationMsg,
    handleChange,
    handleSendVerificationCode,
    handleSubmit,
    resetForm,
  };
};
