import { useQuery, useMutation, ApolloError } from "@apollo/client";
import {
  ADMIN_GET_FAQS,
  ADMIN_CREATE_FAQ,
  ADMIN_UPDATE_FAQ,
  ADMIN_DELETE_FAQ,
} from "../graphql/queries";
import { type Faq } from "./useFAQs";

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
  limit?: number;
  offset?: number;
  keyword?: string;
}

interface AdminCreateFaqInput {
  q: string;
  a: string;
}

interface AdminUpdateFaqInput {
  id: string;
  q?: string;
  a?: string;
}

/**
 * `useAdminFaqs` hook 的回傳值型別
 */
interface UseAdminFaqsResult {
  faqs: Faq[] | undefined;
  totalCount: number | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  createFaq: (input: AdminCreateFaqInput) => Promise<any>;
  updateFaq: (input: AdminUpdateFaqInput) => Promise<any>;
  deleteFaq: (id: string) => Promise<any>;
  refetch: () => void;
}

/**
 * 根據關鍵字獲取問答列表的自定義 hook
 * @param keyword - 用於篩選的搜尋關鍵字。如果未提供，則回傳所有問答。
 * @returns 一個包含 faqs 列表、載入狀態和錯誤物件的物件。
 */
export const useAdminFaqs = (
  limit: number,
  offset: number,
  keyword: string
): UseAdminFaqsResult => {
  const { data, loading, error, refetch } = useQuery<GetFaqData, GetFaqVars>(
    ADMIN_GET_FAQS,
    {
      variables: { limit, offset, keyword },
    }
  );

  const [createFaq] = useMutation(ADMIN_CREATE_FAQ);
  const [updateFaq] = useMutation(ADMIN_UPDATE_FAQ);
  const [deleteFaq] = useMutation(ADMIN_DELETE_FAQ);

  const handleCreate = async (input: AdminCreateFaqInput) => {
    const response = await createFaq({ variables: { input } });
    refetch();
    return response;
  };

  const handleUpdate = async (input: AdminUpdateFaqInput) => {
    const response = await updateFaq({ variables: { input } });
    refetch();
    return response;
  };

  const handleDelete = async (id: string) => {
    const response = await deleteFaq({ variables: { id } });
    refetch();
    return response;
  };

  return {
    faqs: data?.searchFaqs.nodes,
    totalCount: data?.searchFaqs.totalCount,
    loading,
    error,
    createFaq: handleCreate,
    updateFaq: handleUpdate,
    deleteFaq: handleDelete,
    refetch,
  };
};
