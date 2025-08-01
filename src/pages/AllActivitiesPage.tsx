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
import { RotateCcw } from 'lucide-react';

const AllActivitiesPage = () => {
  const initialFilters = {
    status: 'all',
    startDate: '',
    endDate: '',
    name: '',
  };
  const [filters, setFilters] = useState(initialFilters);

  const filteredActivities = useMemo(() => {
    return mockData.activities.filter((activity) => {
      const statusMatch =
        filters.status === 'all' || activity.status === filters.status;
      const nameMatch =
        !filters.name ||
        activity.name.toLowerCase().includes(filters.name.toLowerCase());

      if (filters.startDate && filters.endDate) {
        const activityDate = new Date(activity.startDate);
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        if (activityDate < startDate || activityDate > endDate) {
          return false;
        }
      } else if (filters.startDate) {
        if (new Date(activity.startDate) < new Date(filters.startDate)) {
          return false;
        }
      } else if (filters.endDate) {
        if (new Date(activity.startDate) > new Date(filters.endDate)) {
          return false;
        }
      }

      return statusMatch && nameMatch;
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

  const handleClearFilters = () => {
    setFilters(initialFilters);
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
        className={`p-6 rounded-lg ${theme.cardBg} shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}
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
        <FormField label="開始日期" htmlFor="startDate">
          <InputField
            id="startDate"
            name="startDate"
            type="date"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </FormField>
        <FormField label="結束日期" htmlFor="endDate">
          <InputField
            id="endDate"
            name="endDate"
            type="date"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </FormField>
        <div className="md:col-span-2 lg:col-span-4 flex justify-end items-center mt-4">
          <button
            onClick={handleClearFilters}
            className={`flex items-center px-4 py-2 font-semibold ${theme.textSecondary} bg-transparent hover:bg-stone-200 rounded-md transition-colors`}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            清除搜尋條件
          </button>
        </div>
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
