import { useQuery } from "@apollo/client";
import { GET_ALL_ACTIVITIES } from "../graphql/queries";
import type { ActivityCard } from "../types/activityCard.model";
import type { ACTIVITY_STATUS } from "../types/activityStatus";

interface GetAllActivitiesData {
  activities: ActivityCard[];
}

interface UseAllActivitiesOptions {
  name?: string;
  status?: ACTIVITY_STATUS | "";
  startDate?: string;
  endDate?: string;
}

/**
 * A custom hook to fetch all activities with optional filtering by name and status.
 *
 * @param options - An object containing filter options.
 * @param options.name - A string to filter activities by name (fuzzy search).
 * @param options.status - A string to filter activities by status.
 * @param options.startDate
 * @param options.endDate
 * @returns An object containing the list of activities, loading state, error state, and a refetch function.
 */
export const useAllActivities = (options: UseAllActivitiesOptions) => {
  const { name, status, startDate, endDate } = options;

  const { data, loading, error, refetch } = useQuery<GetAllActivitiesData>(
    GET_ALL_ACTIVITIES,
    {
      variables: {
        // 如果 name 或 status 是空字串，就傳遞 undefined，後端 GraphQL 應會忽略此過濾條件
        name: name || undefined,
        status: status || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      },
      // 確保在 refetch 時 loading 狀態會更新
      notifyOnNetworkStatusChange: true,
    }
  );

  return {
    activities: data?.activities || [],
    loading,
    error,
    refetch,
  };
};
