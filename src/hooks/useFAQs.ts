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
  searchFaqs: Faq[];
}

/**
 * GET_FAQ 查詢所使用的變數型別
 */
interface GetFaqVars {
  keyword?: string;
}

/**
 * `useFAQs` hook 的回傳值型別
 */
interface UseFaqsResult {
  faqs: Faq[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

/**
 * 根據關鍵字獲取問答列表的自定義 hook
 * @param keyword - 用於篩選的搜尋關鍵字。如果未提供，則回傳所有問答。
 * @returns 一個包含 faqs 列表、載入狀態和錯誤物件的物件。
 */
export const useFAQs = (keyword?: string): UseFaqsResult => {
  const { data, loading, error } = useQuery<GetFaqData, GetFaqVars>(GET_FAQ, {
    variables: { keyword },
  });

  return {
    faqs: data?.searchFaqs,
    loading,
    error,
  };
};