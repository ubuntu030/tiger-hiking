import { useMemo, useState } from 'react';
import PageTitle from '../components/layout/PageTitle';
import theme from '../constants/theme';
import { mockData } from '../constants/mockData';
import InputField from '../components/common/InputField';
import FormField from '../components/common/FormField';
import SelectField from '../components/common/SelectField';
import ActivityCard from '../components/features/activities/ActivityCard';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/common/Pagination';

const AllActivitiesPage = () => {
  const [filters, setFilters] = useState({ status: 'all', date: '', name: '' });

  const filteredActivities = useMemo(() => {
    return mockData.activities.filter((activity) => {
      const statusMatch =
        filters.status === 'all' || activity.status === filters.status;
      const dateMatch = !filters.date || activity.startDate === filters.date;
      const nameMatch =
        !filters.name ||
        activity.name.toLowerCase().includes(filters.name.toLowerCase());
      return statusMatch && dateMatch && nameMatch;
    });
  }, [filters]);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems: paginatedActivities,
  } = usePagination(filteredActivities, { itemsPerPage: 6 });

  const handleFilterChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const statusOptions = [
    { value: 'all', label: '所有狀態' },
    { value: '報名登記', label: '報名登記' },
    { value: '不可報名', label: '不可報名' },
    { value: '活動結束', label: '活動結束' },
  ];

  return (
    <div>
      <PageTitle title="所有活動" subtitle="尋找下一次屬於您的山林冒險" />

      <div
        className={`p-6 rounded-lg ${theme.cardBg} shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-6`}
      >
        <FormField label="活動名稱" htmlFor="name">
          <InputField
            id="name"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="搜尋活動名稱..."
          />
        </FormField>
        <FormField label="活動狀態" htmlFor="status">
          <SelectField
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            options={statusOptions}
          />
        </FormField>
        <FormField label="活動日期" htmlFor="date">
          <InputField
            id="date"
            name="date"
            type="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </FormField>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      {paginatedActivities.length === 0 && (
        <div className="text-center py-16 col-span-full">
          <p className={theme.textSecondary}>找不到符合條件的活動。</p>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AllActivitiesPage;
