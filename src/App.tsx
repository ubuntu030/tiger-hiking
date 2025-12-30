import "./App.css";
import HomePage from "./pages/HomePage";
import AllActivitiesPage from "./pages/AllActivitiesPage";
import ActivityDetailPage from "./pages/ActivityDetailPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import AboutUsPage from "./pages/AboutUsPage";
import FAQPage from "./pages/FAQPage";
import ContactUsPage from "./pages/ContactUsPage";
import PhotoGalleryPage from "./pages/PhotoGalleryPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import MyActivitiesPage from "./pages/MyActivitiesPage";
import PageContainer from "./components/layout/PageContainer";
import theme from "./constants/theme";
import Footer from "./components/layout/Footer";
import { ToastProvider } from "./contexts/ToastProvider";
import GlobalErrorListener from "./components/common/GlobalErrorListener";
import ProfileLayout from "./pages/profile/ProfileLayout";
import ProfileSettingsPage from "./pages/profile/ProfileSettingsPage";
import ActivityHistoryPage from "./pages/profile/ActivityHistoryPage";
import { Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedRoute from "./components/router/ProtectedRoute";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminOtpPage from "./pages/admin/AdminOtpPage";
import AdminProtectedRoute from "./components/router/AdminProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminActivitiesPage from "./pages/admin/AdminActivitiesPage";
import AdminAnnouncementsPage from "./pages/admin/AdminAnnouncementsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminGuidesPage from "./pages/admin/AdminGuidesPage";
import AdminAlbumsPage from "./pages/admin/AdminAlbumsPage";
import AdminFaqsPage from "./pages/admin/AdminFaqsPage";
import AdminReviewsPage from "./pages/admin/AdminReviewsPage";


// A new component to handle conditional layout
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Admin routes have their own layout and don't use the public Header/Footer/PageContainer
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/otp-verify" element={<AdminOtpPage />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="activities" element={<AdminActivitiesPage />} />
            <Route path="announcements" element={<AdminAnnouncementsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="guides" element={<AdminGuidesPage />} />
            <Route path="albums" element={<AdminAlbumsPage />} />
            <Route path="faqs" element={<AdminFaqsPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
          </Route>
        </Route>
      </Routes>
    );
  }

  // Public routes use the main layout
  return (
    <>
      <Header />
      <PageContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<AllActivitiesPage />} />
          <Route
            path="/activities/:activityId"
            element={<ActivityDetailPage />}
          />
          <Route path="/gallery" element={<PhotoGalleryPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* User protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfileLayout />}>
              <Route index element={<Navigate to="settings" replace />} />
              <Route path="settings" element={<ProfileSettingsPage />} />
              <Route path="my-activities" element={<MyActivitiesPage />} />
              <Route
                path="activity-history"
                element={<ActivityHistoryPage />}
              />
            </Route>
          </Route>

          {/* Fallback for any other route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </PageContainer>
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <GlobalErrorListener />
        <div className={`${theme.background} font-sans`}>
          <AppContent />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

