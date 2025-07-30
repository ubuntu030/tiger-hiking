import theme from '../../constants/theme';

const Footer = () => (
  <footer className={`${theme.secondary} ${theme.textSecondary}`}>
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
      <p>&copy; {new Date().getFullYear()} 山徑行旅 All Rights Reserved.</p>
      <p className="text-sm mt-2">這是一個基於 React 建立的範例網站。</p>
    </div>
  </footer>
);

export default Footer;
