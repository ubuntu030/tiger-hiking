import { useQuery, useMutation } from "@apollo/client";
import {
  ADMIN_GET_ACTIVITIES,
  ADMIN_CREATE_ACTIVITY,
  ADMIN_UPDATE_ACTIVITY,
  ADMIN_DELETE_ACTIVITY,
} from "../graphql/queries";
import { type ActivityDetail } from "../types/allActivity.model";

export type AdminActivity = ActivityDetail & {
  registeredCount: number;
  pendingCount: number;
};

export const useAdminActivities = (
  limit: number,
  offset: number,
  search: string,
  sortField?: string,
  sortOrder?: string,
) => {
  const { data, loading, error, refetch } = useQuery(ADMIN_GET_ACTIVITIES, {
    variables: {
      limit,
      offset,
      search: search || undefined,
      sortField,
      sortOrder,
    },
    fetchPolicy: "network-only",
  });

  const [create] = useMutation(ADMIN_CREATE_ACTIVITY);
  const [update] = useMutation(ADMIN_UPDATE_ACTIVITY);
  const [remove] = useMutation(ADMIN_DELETE_ACTIVITY, {
    refetchQueries: [
      {
        query: ADMIN_GET_ACTIVITIES,
        variables: {
          limit,
          offset,
          search: search || undefined,
          sortField,
          sortOrder,
        },
      },
    ],
  });

  const createActivity = async (input: any) => {
    await create({
      variables: { input },
    });
    refetch();
  };

  const updateActivity = async (input: any) => {
    await update({
      variables: { input },
    });
    refetch();
  };

  const removeActivity = async (id: string) => {
    await remove({
      variables: { id },
    });
  };

  return {
    activities: data?.admin_activities?.nodes as AdminActivity[],
    totalCount: data?.admin_activities?.totalCount,
    loading,
    error,
    refetch,
    createActivity,
    updateActivity,
    removeActivity,
  };
};
