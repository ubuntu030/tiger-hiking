import { useQuery, ApolloError } from '@apollo/client';
import { GET_FAQ } from '../graphql/queries';

/**
 * 代表一個問答項目
 */
export interface Faq {
  id: string;
  q: string;
  a: string;
}

/**
 * GET_FAQ 查詢回傳的資料型別
 */
interface GetFaqData {
  searchFaqs: {
    nodes: Faq[];
    totalCount: number;
  };
}

/**
 * GET_FAQ 查詢所使用的變數型別
 */
interface GetFaqVars {
  keyword?: string;
  limit?: number;
  offset?: number;
}

/**
 * `useFAQs` hook 的回傳值型別
 */
interface UseFaqsResult {
  faqs: Faq[] | undefined;
  totalCount: number | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

/**
 * 根據關鍵字獲取問答列表的自定義 hook
 * @param keyword - 用於篩選的搜尋關鍵字。如果未提供，則回傳所有問答。
 * @returns 一個包含 faqs 列表、載入狀態和錯誤物件的物件。
 */
export const useFAQs = (
  keyword: string | undefined,
  limit: number,
  offset: number,
): UseFaqsResult => {
  const { data, loading, error } = useQuery<GetFaqData, GetFaqVars>(GET_FAQ, {
    variables: { keyword, limit, offset },
  });

  return {
    faqs: data?.searchFaqs.nodes,
    totalCount: data?.searchFaqs.totalCount,
    loading,
    error,
  };
};