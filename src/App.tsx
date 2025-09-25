import "./App.css";
import HomePage from "./pages/HomePage";
import AllActivitiesPage from "./pages/AllActivitiesPage";
import ActivityDetailPage from "./pages/ActivityDetailPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import AboutUsPage from "./pages/AboutUsPage";
import FAQPage from "./pages/FAQPage";
import ContactUsPage from "./pages/ContactUsPage";
import PhotoGalleryPage from "./pages/PhotoGalleryPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <GlobalErrorListener />
        <div className={`${theme.background} font-sans`}>
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
              <Route path="/my-activities" element={<MyActivitiesPage />} />
              <Route path="/profile" element={<ProfileLayout />}>
                <Route index element={<Navigate to="settings" replace />} />
                <Route path="settings" element={<ProfileSettingsPage />} />
                <Route path="my-activities" element={<MyActivitiesPage />} />
                <Route
                  path="activity-history"
                  element={<ActivityHistoryPage />}
                />
              </Route>
              {/* 可以加入一個 404 Not Found 頁面 */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </PageContainer>
          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
