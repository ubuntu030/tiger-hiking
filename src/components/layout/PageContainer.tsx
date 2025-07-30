import theme from '../../constants/theme';

const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <main className={`${theme.background} ${theme.textPrimary} min-h-screen`}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {children}
    </div>
  </main>
);

export default PageContainer;
