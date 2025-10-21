import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { isValidEmail } from "../../../utils/validators"; // 驗證電子郵件格式的工具函式
import { REQUEST_OTP, VERIFY_OTP } from "../../../graphql/queries"; // 引入發送驗證碼的 GraphQL mutation
import { useToast } from "../../../hooks/useToast"; // 引入 useToast Hook

// 定義登入或註冊模式
type AuthMode = "login" | "register";

// 定義表單的狀態結構
export interface AuthFormState {
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
}

// 定義表單的錯誤訊息結構
export interface AuthFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
}

// 初始化表單的預設值
const initialFormState: AuthFormState = {
  email: "",
  password: "",
  confirmPassword: "",
  verificationCode: "",
};

// 自訂 Hook：用於管理登入/註冊表單的邏輯
export const useAuthForm = () => {
  // 狀態：登入或註冊模式
  const [mode, setMode] = useState<AuthMode>("login");

  // 狀態：表單資料
  const [formData, setFormData] = useState<AuthFormState>(initialFormState);

  // 狀態：表單錯誤訊息
  const [errors, setErrors] = useState<AuthFormErrors>({});

  // 狀態：是否進入冷卻期（防止暴力登入）
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  // 狀態：登入嘗試次數
  const [loginAttempts, setLoginAttempts] = useState(0);

  // 狀態：是否已發送驗證碼
  const [isCodeSent, setIsCodeSent] = useState(false);

  // 狀態：是否正在發送驗證碼
  const [isSendingCode, setIsSendingCode] = useState(false);

  // 狀態：驗證碼相關訊息
  const [verificationMsg, setVerificationMsg] = useState<string | null>(null);

  // 狀態：OTP是否已驗證
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // 狀態：是否正在驗證OTP
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // 狀態：驗證成功後的Token
  const [verificationToken, setVerificationToken] = useState<string | null>(
    null
  );

  // 判斷當前是否為登入模式
  const isLogin = mode === "login";

  // 使用 useToast Hook
  const { showToast } = useToast();

  // GraphQL Mutation：發送驗證碼
  const [requestOTP] = useMutation(REQUEST_OTP);

  // GraphQL Mutation：驗證OTP
  const [verifyOTP] = useMutation(VERIFY_OTP);

  // 處理表單輸入變更
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      // 更新表單資料
      setFormData((prev) => ({ ...prev, [name]: value }));

      // 如果該欄位有錯誤，清除錯誤訊息
      if (errors[name as keyof AuthFormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  // 驗證表單資料
  const validate = useCallback(() => {
    const newErrors: AuthFormErrors = {};

    // 驗證電子郵件
    if (!formData.email) {
      newErrors.email = "電子郵件為必填欄位";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "電子郵件格式不正確";
    }

    // 如果是註冊模式，進一步驗證其他欄位
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

  // 重置表單
  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setErrors({});
    setVerificationMsg(null);
    setIsCodeSent(false);
    setIsSendingCode(false);
    setIsOtpVerified(false);
    setIsVerifyingOtp(false);
    setVerificationToken(null);
  }, []);

  // 發送驗證碼
  const handleSendVerificationCode = useCallback(async () => {
    // 在發送前，先單獨驗證電子郵件欄位
    const emailError = validate().email;
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      // 也可以選擇性地設定一個通用的驗證訊息
      setVerificationMsg("請先輸入有效的電子郵件。");
      return;
    }

    // 如果已有其他 email 相關錯誤，也一併阻擋
    if (errors.email) {
      setVerificationMsg("請修正電子郵件錯誤後再試。");
      return;
    }

    // 清除之前的驗證訊息並設定為發送中
    setVerificationMsg(null);
    setIsSendingCode(true);

    try {
      // 呼叫 GraphQL Mutation 發送驗證碼
      const { data } = await requestOTP({
        variables: {
          input: {
            email: formData.email,
          },
        },
      });

      // 根據後端回應更新狀態
      if (data?.requestOTP?.success) {
        setIsCodeSent(true);
        setVerificationMsg(
          data.requestOTP.message || "驗證碼已發送至電子郵件，請檢查信箱。"
        );
        // 顯示成功通知
        showToast(data.requestOTP.message || "驗證碼已成功發送！", "success");
      } else {
        setVerificationMsg(
          data?.requestOTP?.message || "發送驗證碼失敗，請稍後再試。"
        );
        // 顯示失敗通知
        showToast(data?.requestOTP?.message || "發送驗證碼失敗。", "error");
      }
    } catch (error) {
      setVerificationMsg("發送驗證碼時發生錯誤，請稍後再試。");
      // 顯示錯誤通知
      showToast("發送驗證碼失敗。", "error");
    } finally {
      // 無論成功或失敗，結束發送狀態
      setIsSendingCode(false);
    }
  }, [formData.email, errors.email, requestOTP, showToast, validate]);

  // 驗證OTP
  const handleVerifyOtp = useCallback(async () => {
    if (!formData.verificationCode) {
      setErrors((prev) => ({ ...prev, verificationCode: "請輸入驗證碼" }));
      return;
    }
    setIsVerifyingOtp(true);
    setVerificationMsg(null);

    try {
      const { data } = await verifyOTP({
        variables: {
          input: {
            email: formData.email,
            otpCode: formData.verificationCode,
          },
        },
      });

      if (data?.verifyOTP?.success) {
        setIsOtpVerified(true);
        setVerificationToken(data.verifyOTP.verificationToken);
        const message =
          data.verifyOTP.message || "驗證成功！現在可以完成註冊。";
        setVerificationMsg(message);
        showToast(message, "success");
      } else {
        const message = data?.verifyOTP?.message || "驗證碼不正確或已過期。";
        setVerificationMsg(message);
        showToast(message, "error");
      }
    } catch (error) {
      const message = "驗證過程中發生錯誤，請稍後再試。";
      setVerificationMsg(message);
      showToast(message, "error");
    } finally {
      setIsVerifyingOtp(false);
    }
  }, [formData.email, formData.verificationCode, verifyOTP, showToast]);

  // 提交表單
  const handleSubmit = useCallback(() => {
    // 驗證表單資料
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

        // 如果嘗試次數超過限制，進入冷卻期
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
      if (!isOtpVerified) {
        showToast("請先完成電子郵件驗證。", "error");
        return;
      }
      alert("註冊成功！將自動登入並導向首頁。");
    }
  }, [formData, isLogin, loginAttempts, validate, isOtpVerified, showToast]);

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
    isOtpVerified,
    isVerifyingOtp,
    verificationToken,
    handleChange,
    handleSendVerificationCode,
    handleVerifyOtp,
    handleSubmit,
    resetForm,
  };
};
