import { useQuery } from "@apollo/client";
import { GET_RECENT_ACTIVITIES } from "../graphql/queries";
import type { ActivityCard } from "../types/ActivityCard";

interface GetRecentActivitiesData {
  activities: ActivityCard[];
}

export const useRecentActivities = (limit: number = 6) => {
  const { data, loading, error } = useQuery<GetRecentActivitiesData>(
    GET_RECENT_ACTIVITIES,
    {
      variables: { limit },
    }
  );

  return {
    recentActivities: data?.activities || [],
    loading,
    error,
  };
};
