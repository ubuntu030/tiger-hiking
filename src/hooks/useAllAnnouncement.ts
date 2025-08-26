import { useQuery } from "@apollo/client";
import { GET_ALL_ANNOUNCEMENT } from "../graphql/queries";
import type { Announcement } from "../types/announcemet.model";

/**
 * @description 查詢所有公告的回傳資料結構
 */
interface AllAnnouncementsData {
  announcements: Announcement[];
}

export const useAllAnnouncements = () => {
  const { data, loading, error, refetch } =
    useQuery<AllAnnouncementsData>(GET_ALL_ANNOUNCEMENT);

  return { announcements: data?.announcements || [], loading, error, refetch };
};
