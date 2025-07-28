import { Mountain } from 'lucide-react';
import { theme } from '../../constants/theme';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 步驟 3: 將導覽連結從 page state 改為 URL 路徑
  const navLinks = [
    { name: '首頁', path: '/' },
    { name: '所有活動', path: '/activities' },
    { name: '活動相簿', path: '/gallery' },
    { name: '最新公告', path: '/announcements' },
    { name: '關於我們', path: '/about' },
    { name: '常見問題', path: '/faq' },
    { name: '聯繫我們', path: '/contact' },
  ];

  return (
    <header className={`${theme.cardBg} sticky top-0 z-50 shadow-md`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`flex items-center space-x-2 ${theme.textPrimary}`}
            >
              <Mountain className="h-6 w-6 text-green-800" />
              <span className="text-2xl font-bold">山徑行旅</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <nav className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium ${theme.textSecondary} hover:${theme.accent} transition-colors`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="#"
                className={`font-medium text-stone-400 cursor-not-allowed`}
                title="即將上線"
              >
                我的活動
              </a>
            </nav>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-stone-600 hover:bg-stone-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${theme.textSecondary} hover:bg-stone-100`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="#"
              className={`block px-3 py-2 rounded-md text-base font-medium text-stone-400 cursor-not-allowed`}
              title="即將上線"
            >
              我的活動
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
