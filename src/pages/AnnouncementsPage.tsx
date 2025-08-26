import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { Frown } from 'lucide-react';
import PageTitle from '../components/layout/PageTitle';
import theme from '../constants/theme';
import { useAllAnnouncements } from '../hooks/useAllAnnouncement';
import Spinner from '../components/common/Spinner';

const AnnouncementsPage = () => {
  const { announcements, loading, error } = useAllAnnouncements();

  useEffect(() => {
    if (error) {
      toast.error(`讀取公告時發生錯誤: ${error.message}`);
    }
  }, [error]);

  const renderContent = () => {
    if (loading) {
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
      <div className="max-w-3xl mx-auto space-y-8">
        {announcements.map((ann) => (
          <div key={ann.id} className={`p-6 rounded-lg shadow-sm ${theme.cardBg}`}>
            <p className={`text-sm ${theme.textSecondary} mb-2`}>
              {format(new Date(ann.date), 'yyyy/MM/dd')}
            </p>
            <h2 className={`text-2xl font-bold ${theme.textPrimary} mb-4`}>{ann.title}</h2>
            <p className={theme.textSecondary}>{ann.content}</p>
          </div>
        ))}
      </div>
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
