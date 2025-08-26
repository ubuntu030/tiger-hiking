import { useState } from "react";
import PageTitle from "../components/layout/PageTitle";
import theme from "../constants/theme";
import InputField from "../components/common/InputField";
import FormField from "../components/common/FormField";
import SelectField from "../components/common/SelectField";
import ActivityCard from "../components/features/activities/ActivityCard";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/common/Pagination";
import { Frown } from "lucide-react";
import { useAllActivities } from "../hooks/useAllActivities";
import type { ACTIVITY_STATUS } from "../types/activityStatus";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import Button from "../components/common/Button";

const AllActivitiesPage = () => {
  const initialFilters = {
    status: "all",
    name: "",
    startDate: "",
    endDate: "",
  };
  const [filters, setFilters] = useState(initialFilters);

  // 1. 使用 useAllActivities hook 進行後端查詢
  // - 當 filters.name 是空字串時，hook 會忽略它
  // - 當 filters.status 是 'all' 時，我們傳遞空字串，hook 也會忽略它
  const { activities, loading, error, refetch } = useAllActivities({
    name: filters.name,
    status: filters.status === "all" ? "" : (filters.status as ACTIVITY_STATUS),
    startDate: filters.startDate
      ? startOfDay(parseISO(filters.startDate)).toISOString()
      : "",
    endDate: filters.endDate
      ? endOfDay(parseISO(filters.endDate)).toISOString()
      : "",
  });

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems: paginatedActivities,
  } = usePagination(activities, { itemsPerPage: 6 });

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
    refetch(); // 可以選擇手動觸發重新整理
  };

  const statusOptions = [
    { value: "all", label: "所有狀態" },
    { value: "報名登記", label: "報名登記" },
    { value: "不可報名", label: "不可報名" },
    { value: "活動結束", label: "活動結束" },
  ];

  return (
    <div>
      <PageTitle title="所有活動" subtitle="尋找下一次屬於您的山林冒險" />

      <div
        className={`p-6 rounded-lg ${theme.cardBg} shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6`}
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
        <div className="md:col-span-3 lg:col-span-4 flex justify-end items-center self-end">
          <Button onClick={handleClearFilters} variant="secondary">清除搜尋條件</Button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-16">
          <p className={theme.textPrimary}>載入中，請稍候...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-16 text-red-500">
          <p>讀取活動時發生錯誤：{error.message}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
          {paginatedActivities.length === 0 && (
            <div className="text-center py-16 col-span-full flex flex-col items-center">
              <Frown className="w-16 h-16 text-stone-400 mb-4" />
              <p className={theme.textSecondary}>找不到符合條件的活動。</p>
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default AllActivitiesPage;
