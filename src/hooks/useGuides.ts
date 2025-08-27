import { useQuery } from '@apollo/client';
import { GET_ALL_GUIDES } from '../graphql/queries';

// 根據 GraphQL 查詢定義嚮導的 TypeScript 型別
interface Guide {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
}

// 定義查詢回傳資料的型別
interface GetAllGuidesData {
  guides: Guide[];
}

/**
 * 獲取嚮導列表的自定義 Hook
 */
export const useGuides = () => {
  const { data, loading, error } = useQuery<GetAllGuidesData>(GET_ALL_GUIDES);

  // 回傳整理過的資料，並提供預設空陣列以避免 undefined
  return { guides: data?.guides || [], loading, error };
};
