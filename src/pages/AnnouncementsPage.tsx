import PageTitle from '../components/layout/PageTitle';
import { mockData } from '../constants/mockData';
import { theme } from '../constants/theme';

const AnnouncementsPage = () => (
  <div>
    <PageTitle title="最新公告" subtitle="關於山徑行旅的重要訊息與更新" />
    <div className="max-w-3xl mx-auto space-y-8">
      {mockData.announcements.map((ann) => (
        <div
          key={ann.id}
          className={`p-6 rounded-lg shadow-sm ${theme.cardBg}`}
        >
          <p className={`text-sm ${theme.textSecondary} mb-2`}>{ann.date}</p>
          <h2 className={`text-2xl font-bold ${theme.textPrimary} mb-4`}>
            {ann.title}
          </h2>
          <p className={theme.textSecondary}>{ann.content}</p>
        </div>
      ))}
    </div>
  </div>
);

export default AnnouncementsPage;
