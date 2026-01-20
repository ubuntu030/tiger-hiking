import { useQuery } from "@apollo/client";
import { GET_GUIDES } from "../graphql/queries";
import type { Guide } from "../types/guide.model";

/**
 * 定義 GET_GUIDES 查詢的回傳資料結構
 */
interface GetGuidesData {
  guides: Guide[];
}

/**
 * 獲取所有嚮導列表的自訂 Hook
 *
 * @returns 回傳包含嚮導列表、載入狀態、錯誤訊息以及重新查詢函式的物件
 */
export const useGuides = (name?: string) => {
  const { data, loading, error, refetch } = useQuery<GetGuidesData>(
    GET_GUIDES,
    {
      // 當 name 為空字串時轉為 undefined，確保後端執行"查詢全部"而非"搜尋空字串"
      variables: { name: name || undefined },
      // 確保在 refetch 時 loading 狀態會更新，讓 UI 能顯示載入中
      notifyOnNetworkStatusChange: true,
    }
  );

  return {
    guides: data?.guides || [],
    loading,
    error,
    refetch,
  };
};