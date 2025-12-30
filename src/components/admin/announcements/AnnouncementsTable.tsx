// src/components/admin/announcements/AnnouncementsTable.tsx

import React from 'react';

// Define the type for a single announcement
export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface AnnouncementsTableProps {
  announcements: Announcement[];
  onEdit: (announcement: Announcement) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

const AnnouncementsTable: React.FC<AnnouncementsTableProps> = ({
  announcements,
  onEdit,
  onDelete,
  loading,
}) => {
  if (loading) {
    return <p>Loading announcements...</p>;
  }

  if (announcements.length === 0) {
    return <p>No announcements found.</p>;
  }

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Content</th>
            <th scope="col" className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{announcement.title}</td>
              <td className="px-6 py-4">{announcement.date}</td>
              <td className="px-6 py-4 truncate max-w-sm">{announcement.content}</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onEdit(announcement)}
                  className="font-medium text-blue-600 hover:underline mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(announcement.id)}
                  className="font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnouncementsTable;
