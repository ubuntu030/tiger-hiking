import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Megaphone,
  Users,
  Mountain,
  Images,
  HelpCircle,
  Star,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard', label: '儀表板', icon: LayoutDashboard },
  { path: '/admin/activities', label: '活動管理', icon: ClipboardList },
  { path: '/admin/announcements', label: '公告管理', icon: Megaphone },
  { path: '/admin/users', label: '使用者管理', icon: Users },
  { path: '/admin/guides', label: '嚮導管理', icon: Mountain },
  { path: '/admin/albums', label: '相簿管理', icon: Images },
  { path: '/admin/faqs', label: '問答管理', icon: HelpCircle },
  { path: '/admin/reviews', label: '評論管理', icon: Star },
];

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Logout logic will be implemented later
    console.log('Logout clicked');
  };

  const activeLinkClass = 'bg-stone-700 text-white';

  const sidebarContent = (
    <>
      <div className="px-4">
        <h2 className="text-2xl font-bold text-stone-800">老虎登山後台管理</h2>
      </div>
      <nav className="flex flex-col mt-8 flex-grow">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center py-2.5 px-4 rounded-lg mb-2 no-underline transition-colors duration-200 ${
                isActive
                  ? activeLinkClass
                  : 'text-stone-600 hover:bg-stone-200'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center w-full py-2.5 px-4 rounded-lg text-stone-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
      >
        <LogOut className="mr-3 h-5 w-5" />
        <span>登出</span>
      </button>
    </>
  );

  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-30 p-2 bg-white text-stone-800 rounded-full shadow-md"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-stone-200 p-4 flex flex-col
          transform transition-transform duration-300 ease-in-out z-20
          lg:translate-x-0 lg:static lg:w-64
          ${isSidebarOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full'}
        `}
      >
        {sidebarContent}
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="mt-16 lg:mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
