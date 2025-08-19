import { useQuery } from "@apollo/client";
import { GET_RECENT_ACTIVITIES } from "../graphql/queries";
import type { IActivity } from "../types/activity";

interface GetRecentActivitiesData {
  activities: IActivity[];
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
