import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Frown } from "lucide-react";
import PageTitle from "../components/layout/PageTitle";
import theme from "../constants/theme";
import { useAllAnnouncements } from "../hooks/useAllAnnouncement";
import Spinner from "../components/common/Spinner";
import Pagination from "../components/common/Pagination";

const ANNOUNCEMENTS_PER_PAGE = 3;

const AnnouncementsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { announcements, loading, error, totalCount } = useAllAnnouncements({
    limit: ANNOUNCEMENTS_PER_PAGE,
    offset: (currentPage - 1) * ANNOUNCEMENTS_PER_PAGE,
  });
  const totalPages = Math.ceil((totalCount ?? 0) / ANNOUNCEMENTS_PER_PAGE);

  useEffect(() => {
    if (error) {
      toast.error(`讀取公告時發生錯誤: ${error.message}`);
    }
  }, [error]);

  const renderContent = () => {
    if (loading && !announcements) {
      return (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      );
    }

    if (!announcements || announcements.length === 0) {
      return (
        <div className="text-center py-16 text-stone-500">
          <Frown className="mx-auto h-12 w-12 text-stone-400" />
          <h3 className="mt-2 text-lg font-semibold">尚無公告</h3>
          <p className="mt-1 text-sm">目前沒有任何公告訊息。</p>
        </div>
      );
    }

    return (
      <>
        <div className="max-w-3xl mx-auto space-y-8 min-h-[50vh]">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className={`p-6 rounded-lg shadow-sm ${theme.cardBg}`}
            >
              <p className={`text-sm ${theme.textSecondary} mb-2`}>
                {/* {format(new Date(ann.createdAt), "yyyy/MM/dd")} */}
              </p>
              <h2 className={`text-2xl font-bold ${theme.textPrimary} mb-4`}>
                {ann.title}
              </h2>
              <p className={theme.textSecondary}>{ann.content}</p>
            </div>
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
  };

  return (
    <div>
      <PageTitle title="最新公告" subtitle="關於山徑行旅的重要訊息與更新" />
      {renderContent()}
    </div>
  );
};

export default AnnouncementsPage;
