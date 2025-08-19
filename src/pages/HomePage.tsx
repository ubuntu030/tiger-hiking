import Button from "../components/common/Button";
import PageTitle from "../components/layout/PageTitle";
import ActivityCard from "../components/features/activities/ActivityCard";
import theme from "../constants/theme";
import { useRecentActivities } from "../hooks/useRecentActivities";

const HomePage = () => {
  const { recentActivities, loading, error } = useRecentActivities(6);

  return (
    <div>
      <section className="relative h-[60vh] rounded-xl overflow-hidden flex items-center justify-center text-center text-white bg-stone-700 mb-16">
        <img
          src="https://placehold.co/1200x800/57534e/FFFFFF?text=探索台灣山林之美"
          alt="壯麗山景"
          className="absolute w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 p-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
            探索台灣山林之美
          </h1>
          <p className="mt-4 text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-md">
            從入門百岳到進階縱走，我們帶您安全地體驗每一段壯遊。
          </p>
          <Button to="/activities" className="mt-8" onClick={() => {}}>
            探索所有活動
          </Button>
        </div>
      </section>

      {/* Recent Activities Section */}
      <section>
        <PageTitle
          title="近期活動"
          subtitle="最新的出團計畫，名額有限，即刻報名！"
        />
        {loading && (
          <div className="text-center py-16">
            <p className={theme.textSecondary}>正在載入最新活動...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500">
              讀取活動失敗，請稍後再試。 ({error.message})
            </p>
          </div>
        )}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
