import { useMutation } from "@apollo/client";
import { CREATE_REGISTRATION } from "../graphql/queries";
import { useToast } from "./useToast";
import type { RegistrationFormData } from "../components/features/registration/useRegistrationForm";

// 為 mutation 的變數和回傳資料定義 TypeScript 型別
export interface CreateRegistrationVars extends RegistrationFormData {
  activityId: number;
}

interface CreateRegistrationData {
  createRegistration: {
    success: boolean;
    message: string;
  };
}

/**
 * 一個用於建立新活動報名的自訂 Hook。
 * 它封裝了 mutation 的執行、載入狀態和錯誤處理。
 */
export const useCreateRegistration = () => {
  const { showToast } = useToast();

  const [mutate, { loading, error }] = useMutation<
    CreateRegistrationData,
    CreateRegistrationVars
  >(CREATE_REGISTRATION, {
    onError: (e) => {
      // 這裡只做 console log，具體的 UI 反饋交給呼叫端處理
      console.error("Registration mutation failed:", e);
      showToast(e.message || "報名失敗，請稍後再試。", "error");
    },
  });

  const createRegistration = async (variables: CreateRegistrationVars) => {
    // 確保選填的 phone 欄位在空值時傳遞 null，以符合 GraphQL schema
    const submissionVars = {
      ...variables,
      phone: variables.phone || null,
    };
    return mutate({ variables: submissionVars });
  };

  return { createRegistration, loading, error };
};