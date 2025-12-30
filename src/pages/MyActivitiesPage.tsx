import React from "react";
import { Link } from "react-router-dom";
import { useMyActivities } from "../hooks/useMyActivities";
import { MyActivityCard } from "../components/features/my-activities/MyActivityCard";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/common/Pagination";
import Spinner from "../components/common/Spinner";
import PageTitle from "../components/layout/PageTitle";
import { Inbox } from "lucide-react";
import Button from "../components/common/Button";
import theme from "../constants/theme";

const MyActivitiesPage: React.FC = () => {
  const { myActivities, loading, error, refetch } = useMyActivities();
  const { paginatedItems, currentPage, totalPages, setCurrentPage } =
    usePagination(myActivities, { itemsPerPage: 5 });

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">錯誤: {error.message}</p>
        </div>
      );
    }

    if (paginatedItems.length > 0) {
      return (
        <>
          <div>
            {paginatedItems.map((activity) => (
              <MyActivityCard
                key={activity.id}
                registrationActivity={activity}
                onUpdateSuccess={refetch}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      );
    }

    return (
      <div
        className={`text-center ${theme.cardBg} p-12 rounded-lg border-2 border-dashed ${theme.border}`}
      >
        <div className="flex justify-center">
          <Inbox className={`h-16 w-16 ${theme.textSecondary}`} />
        </div>
        <h3 className={`mt-4 text-xl font-semibold ${theme.textPrimary}`}>
          尚無活動紀錄
        </h3>
        <p className={`mt-2 text-base ${theme.textSecondary}`}>
          您目前沒有報名任何活動，快去看看有什麼好玩的吧！
        </p>
        <div className="mt-6">
          <Button to="/activities">瀏覽所有活動</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* <PageTitle title="我的活動" /> */}
      <h2 className="text-2xl font-bold mb-4">我的活動</h2>

      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default MyActivitiesPage;
