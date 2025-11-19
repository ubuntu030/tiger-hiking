import { useQuery } from "@apollo/client";
import { CHECK_USER_REGISTRATION_STATUS } from "../graphql/queries";
import type { RegistrationStatus } from "../types/registration.model";

// 為 GQL 查詢的結果和變數定義 TypeScript 型別

/**
 * `checkRegistrationStatus` 查詢回傳的資料結構
 */
interface CheckRegistrationStatusData {
  checkRegistrationStatus: {
    isRegistered: boolean;
    status: RegistrationStatus;
  };
}

/**
 * `checkRegistrationStatus` 查詢所需的變數
 */
interface CheckRegistrationStatusVars {
  activityId: number;
}

/**
 * 一個根據活動 ID 檢查使用者報名狀態的自訂 Hook。
 *
 * @param activityId - 要檢查的活動 ID。
 * @returns 回傳包含報名狀態、載入狀態和錯誤訊息的物件。
 */
export const useCheckRegistrationStatus = (activityId: number) => {
  const { data, loading, error, refetch } = useQuery<
    CheckRegistrationStatusData,
    CheckRegistrationStatusVars
  >(CHECK_USER_REGISTRATION_STATUS, {
    variables: { activityId },
    skip: !activityId, // 如果 activityId 不存在，則跳過查詢
    fetchPolicy: "network-only", // 確保每次都從網路獲取最新狀態
  });

  return {
    registrationStatus: data?.checkRegistrationStatus,
    loading,
    error,
    refetch,
  };
};
