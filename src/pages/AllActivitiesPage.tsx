import { useMemo, useState } from 'react';
import PageTitle from '../components/layout/PageTitle';
import { theme } from '../constants/theme';
import { mockData } from '../constants/mockData';
import ActivityCard from '../components/common/ActivityCard';

const AllActivitiesPage = () => {
  const [filters, setFilters] = useState({ status: 'all', date: '', name: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredActivities = useMemo(() => {
    return mockData.activities.filter((activity) => {
      const statusMatch =
        filters.status === 'all' || activity.status === filters.status;
      const dateMatch = !filters.date || activity.date === filters.date;
      const nameMatch =
        !filters.name ||
        activity.name.toLowerCase().includes(filters.name.toLowerCase());
      return statusMatch && dateMatch && nameMatch;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  return (
    <div>
      <PageTitle title="所有活動" subtitle="尋找下一次屬於您的山林冒險" />

      <div
        className={`p-6 rounded-lg ${theme.cardBg} shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4`}
      >
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className={`mb-2 font-semibold ${theme.textSecondary}`}
          >
            活動名稱
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="搜尋活動名稱..."
            className={`p-2 border ${theme.border} rounded-md`}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="status"
            className={`mb-2 font-semibold ${theme.textSecondary}`}
          >
            活動狀態
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className={`p-2 border ${theme.border} rounded-md bg-white`}
          >
            <option value="all">所有狀態</option>
            <option value="報名登記">報名登記</option>
            <option value="不可報名">不可報名</option>
            <option value="活動結束">活動結束</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="date"
            className={`mb-2 font-semibold ${theme.textSecondary}`}
          >
            活動日期
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className={`p-2 border ${theme.border} rounded-md`}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            setPage={() => {}}
            setSelectedActivity={() => {}}
            activity={activity}
          />
        ))}
      </div>
      {paginatedActivities.length === 0 && (
        <div className="text-center py-16 col-span-full">
          <p className={theme.textSecondary}>找不到符合條件的活動。</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-md font-medium ${
                currentPage === page
                  ? `${theme.primary} text-white`
                  : `${theme.secondary} ${theme.textPrimary}`
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllActivitiesPage;
