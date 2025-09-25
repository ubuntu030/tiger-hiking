import { NavLink } from "react-router-dom";
import theme from "../../../constants/theme";

const ProfileSidebar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block w-full text-left px-4 py-3 rounded-md text-lg transition-colors ${
      isActive
        ? `font-semibold ${theme.primary} ${theme.background}`
        : `hover:${theme.ghostHover} ${theme.textPrimary}`
    }`;

  return (
    <aside className={`p-4 rounded-lg shadow-md ${theme.cardBg} min-w-[240px]`}>
      <nav className="space-y-2">
        <NavLink to="/profile/settings" className={navLinkClass}>
          會員基本資料
        </NavLink>
        <NavLink to="/profile/my-activities" className={navLinkClass}>
          我的活動
        </NavLink>
        <NavLink to="/profile/activity-history" className={navLinkClass}>
          活動歷史紀錄
        </NavLink>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
