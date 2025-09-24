// import React from "react";
import PageTitle from "../components/layout/PageTitle";
import ActivityCard from "../components/features/activities/ActivityCard";
import theme from "../constants/theme";
import { useRecentActivities } from "../hooks/useRecentActivities";
// import Spinner from "../components/common/Spinner";
import Slideshow from "../components/features/home/Slideshow";
import { useSlideshow } from "../hooks/useSlideshow";
import { mockData } from "../constants/mockData";

const HomePage = () => {
  const { recentActivities, loading, error } = useRecentActivities(6);
  const { currentIndex, setCurrentIndex, imagesLoaded } = useSlideshow(
    mockData.slideshow
  );

  return (
    <div>
      {/* 首頁幻燈片 */}
      <Slideshow
        slides={mockData.slideshow}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        imagesLoaded={imagesLoaded}
      />

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
