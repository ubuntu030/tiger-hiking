import { mockData } from "./../constants/mockData";
import { useQuery } from "@apollo/client";
import type { MyRegistrationActivity } from "../types/my-activity.model";
import { GET_MY_REGISTRATIONS } from "../graphql/queries";

interface GetMyActivitiesData {
  myRegistrations: MyRegistrationActivity[];
}

/**
 * A custom hook to fetch the current user's registered activities.
 *
 * @returns An object containing the list of activities, loading state, error state, and a refetch function.
 */
export const useMyActivities = () => {
  const { data, loading, error, refetch } = useQuery<GetMyActivitiesData>(
    GET_MY_REGISTRATIONS,
    {
      // 確保在 refetch 時 loading 狀態會更新
      notifyOnNetworkStatusChange: true,
    }
  );

  return {
    myActivities: data?.myRegistrations || [],
    // myActivities: mockData.myActivities,
    loading,
    error,
    refetch,
  };
};
