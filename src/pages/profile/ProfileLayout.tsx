import { Outlet } from "react-router-dom";
import ProfileSidebar from "../../components/features/profile/ProfileSidebar";
import PageTitle from "../../components/layout/PageTitle";

const ProfileLayout = () => {
  return (
    <div>
      {/* <PageTitle title="會員中心" /> */}
      <div className="flex flex-col md:flex-row gap-8">
        <ProfileSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
