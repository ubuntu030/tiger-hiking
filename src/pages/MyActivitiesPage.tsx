import React from "react";
import { useMyActivities } from "../hooks/useMyActivities";
import Spinner from "../components/common/Spinner";
import PageTitle from "../components/layout/PageTitle";
import { MyActivityCard } from "../components/features/my-activities/MyActivityCard";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/common/Pagination";

const MyActivitiesPage: React.FC = () => {
  const { myActivities, loading, error, refetch } = useMyActivities();
  const { paginatedItems, currentPage, totalPages, setCurrentPage } =
    usePagination(myActivities, { itemsPerPage: 5 });

  // if (loading) {
  //   return <Spinner />;
  // }

  // if (error) {
  //   return <p>錯誤: {error.message}</p>;
  // }

  return (
    <div>
      <PageTitle title="我的活動" />
      <div>
        {paginatedItems.length > 0 ? (
          paginatedItems.map((activity) => (
            <MyActivityCard
              key={activity.id}
              activity={activity}
              onUpdateSuccess={refetch}
            />
          ))
        ) : (
          <p>您目前沒有報名任何活動。</p>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MyActivitiesPage;
