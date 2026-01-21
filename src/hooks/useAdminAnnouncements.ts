import { useQuery, useMutation } from '@apollo/client';
import {
  GET_ALL_ANNOUNCEMENT,
  CREATE_ANNOUNCEMENT,
  UPDATE_ANNOUNCEMENT,
  REMOVE_ANNOUNCEMENT,
} from '../graphql/queries';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const useAdminAnnouncements = (
  limit: number,
  offset: number,
  search: string,
) => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_ANNOUNCEMENT, {
    variables: { limit, offset, search: search || undefined },
    fetchPolicy: 'network-only',
  });

  const [create] = useMutation(CREATE_ANNOUNCEMENT);
  const [update] = useMutation(UPDATE_ANNOUNCEMENT);
  const [remove] = useMutation(REMOVE_ANNOUNCEMENT, {
    // Refetch the list after a deletion to update the UI
    refetchQueries: [
      {
        query: GET_ALL_ANNOUNCEMENT,
        variables: { limit, offset, search: search || undefined },
      },
    ],
  });

  const createAnnouncement = async (input: {
    title: string;
    content: string;
  }) => {
    await create({
      variables: { createAnnouncementInput: input },
    });
    refetch();
  };

  const updateAnnouncement = async (input: {
    id: string;
    title?: string;
    content?: string;
  }) => {
    await update({
      variables: { updateAnnouncementInput: input },
    });
    refetch();
  };

  const removeAnnouncement = async (id: string) => {
    await remove({
      variables: { id },
    });
  };

  return {
    announcements: data?.announcements?.nodes as Announcement[],
    totalCount: data?.announcements?.totalCount,
    loading,
    error,
    refetch,
    createAnnouncement,
    updateAnnouncement,
    removeAnnouncement,
  };
};
