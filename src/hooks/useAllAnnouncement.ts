import { useQuery } from "@apollo/client";
import { GET_ALL_ANNOUNCEMENT } from "../graphql/queries";

/**
 * @description 公告的資料結構
 */
export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @description 查詢所有公告的回傳資料結構
 */
interface AllAnnouncementsData {
  announcements: {
    nodes: Announcement[];
    totalCount: number;
  };
}

interface UseAllAnnouncementsProps {
  search?: string;
  limit: number;
  offset: number;
}

export const useAllAnnouncements = ({
  search,
  limit,
  offset,
}: UseAllAnnouncementsProps) => {
  const { data, loading, error } = useQuery<AllAnnouncementsData>(
    GET_ALL_ANNOUNCEMENT,
    {
      variables: { search: search || undefined, limit, offset },
    }
  );

  return {
    announcements: data?.announcements.nodes || [],
    totalCount: data?.announcements.totalCount,
    loading,
    error,
  };
};
