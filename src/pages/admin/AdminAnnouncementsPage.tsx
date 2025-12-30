// src/pages/admin/AdminAnnouncementsPage.tsx
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  ADMIN_GET_ANNOUNCEMENTS,
  ADMIN_CREATE_ANNOUNCEMENT,
  ADMIN_UPDATE_ANNOUNCEMENT,
  ADMIN_DELETE_ANNOUNCEMENT,
} from "../../graphql/queries";
import AnnouncementsTable, {
  type Announcement,
} from "../../components/admin/announcements/AnnouncementsTable";
import AnnouncementModal from "../../components/admin/announcements/AnnouncementModal";
import { useToast } from "../../hooks/useToast";

const AdminAnnouncementsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);
  const { showToast } = useToast();

  const { data, loading, error, refetch } = useQuery(ADMIN_GET_ANNOUNCEMENTS, {
    variables: { limit: 100, offset: 0 }, // Adjust pagination as needed
  });

  const [createAnnouncement] = useMutation(ADMIN_CREATE_ANNOUNCEMENT);
  const [updateAnnouncement] = useMutation(ADMIN_UPDATE_ANNOUNCEMENT);
  const [deleteAnnouncement] = useMutation(ADMIN_DELETE_ANNOUNCEMENT);

  const handleOpenModal = (announcement: Announcement | null = null) => {
    setEditingAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingAnnouncement(null);
    setIsModalOpen(false);
  };

  const handleSave = async (
    announcement: Omit<Announcement, "id"> & { id?: string }
  ) => {
    try {
      if (announcement.id) {
        // Update
        await updateAnnouncement({
          variables: { input: { id: announcement.id, ...announcement } },
        });
        showToast("Success", "Announcement updated successfully.", "success");
      } else {
        // Create
        await createAnnouncement({
          variables: { input: announcement },
        });
        showToast("Success", "Announcement created successfully.", "success");
      }
      refetch();
      handleCloseModal();
    } catch (e: any) {
      showToast("Error", e.message || "Failed to save announcement.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await deleteAnnouncement({ variables: { id } });
        showToast("Success", "Announcement deleted successfully.", "success");
        refetch();
      } catch (e: any) {
        showToast(
          "Error",
          e.message || "Failed to delete announcement.",
          "error"
        );
      }
    }
  };

  if (error) {
    return <p>Error loading announcements: {error.message}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Announcement Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Create Announcement
        </button>
      </div>

      <AnnouncementsTable
        announcements={data?.admin_announcements?.nodes || []}
        onEdit={(ann) => handleOpenModal(ann)}
        onDelete={handleDelete}
        loading={loading}
      />

      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        announcement={editingAnnouncement}
      />
    </div>
  );
};

export default AdminAnnouncementsPage;
