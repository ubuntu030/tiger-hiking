import { useQuery } from "@apollo/client";
import { GET_ACTIVITY_BY_ID } from "../graphql/queries";
import type { ActivityDetail } from "../types/allActivity.model";

// 為了讓程式碼更健壯且易於維護，我們為 GQL 查詢的結果和變數定義 TypeScript 型別。
// 這些型別也可以放在一個共用的 `types.ts` 檔案中。

interface GetActivityByIdData {
  activity: ActivityDetail;
}

interface GetActivityByIdVars {
  id: number;
}

/**
 * 一個根據活動 ID 獲取其詳細資料的自訂 Hook。
 *
 * @param id - 要獲取的活動 ID。
 * @returns 回傳包含活動資料、載入狀態和錯誤訊息的物件。
 */
export const useActivityDetail = (id: string) => {
  // 將從 URL 來的 string ID 轉換為 number
  const numericId = parseInt(id, 10);

  const { data, loading, error, refetch } = useQuery<
    GetActivityByIdData,
    GetActivityByIdVars
  >(GET_ACTIVITY_BY_ID, {
    variables: { id: numericId },
    // 如果 id 不存在或無法轉換為有效的數字，就跳過查詢
    skip: !id || isNaN(numericId),
  });

  return {
    activity: data?.activity,
    loading,
    error,
    refetch,
  };
};
