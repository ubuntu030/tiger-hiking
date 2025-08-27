import PageTitle from '../components/layout/PageTitle';
import theme from '../constants/theme';
import { useGuides } from '../hooks/useGuides';

const AboutUsPage = () => {
  const { guides, loading, error } = useGuides();

  // 處理載入中狀態
  if (loading) return <div className="text-center p-10">讀取中...</div>;
  // 處理錯誤狀態
  if (error) return <div className="text-center p-10 text-red-500">發生錯誤: {error.message}</div>;

  return (
    <div>
      <PageTitle
        title="關於我們"
        subtitle="我們是誰？一群對山林充滿熱情與專業的夥伴"
      />
      <div className="space-y-16">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            <img
              src={guide.image}
              alt={guide.name}
              className="w-48 h-48 rounded-full object-cover shadow-lg flex-shrink-0"
            />
            <div className="text-center md:text-left">
              <h2 className={`text-3xl font-bold ${theme.textPrimary}`}>
                {guide.name}
              </h2>
              <p className={`text-lg font-semibold ${theme.accent} mt-1 mb-4`}>
                {guide.role}
              </p>
              <p className={theme.textSecondary}>{guide.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
