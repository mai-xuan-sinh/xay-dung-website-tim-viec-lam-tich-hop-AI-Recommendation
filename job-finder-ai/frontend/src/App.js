// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbox/Chatbot';
import SupportChat from './components/Chatbox/SupportChat';

// ========== USER PAGES ==========
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import JobsPage from './pages/jobs/JobsPage';
import JobDetailPage from './pages/job-detail/JobDetailPage';
import ProfilePage from './pages/profile/ProfilePage';
import TopCompaniesPage from './pages/companies/TopCompaniesPage';
import CompanyReviewsPage from './pages/reviews/CompanyReviewsPage';
import TrendsPage from './pages/trends/TrendsPage';
import GuidePage from './pages/guide/GuidePage';
import CVPage from './pages/cv/CVPage';
import CVGuidePage from './pages/cv/CVGuidePage';
import SupportPage from './pages/support/SupportPage';

// ========== HR PAGES ==========
import HRDashboard from './pages/hr/HRDashboard';
import HRJobList from './pages/hr/jobs/HRJobList';
import HRJobCreate from './pages/hr/jobs/HRJobCreate';
import HRJobEdit from './pages/hr/jobs/HRJobEdit';
import HRJobDetail from './pages/hr/jobs/HRJobDetail';
import HRApplicationList from './pages/hr/applications/HRApplicationList';
import HRApplicationDetail from './pages/hr/applications/HRApplicationDetail';
import HRApplicationReview from './pages/hr/applications/HRApplicationReview';
import HRInterviewList from './pages/hr/interviews/HRInterviewList';
import HRInterviewDetail from './pages/hr/interviews/HRInterviewDetail';
import HRInterviewCalendar from './pages/hr/interviews/HRInterviewCalendar';
import HRCompanyProfile from './pages/hr/company/HRCompanyProfile';
import HRCompanyEdit from './pages/hr/company/HRCompanyEdit';
import HRCandidateSearch from './pages/hr/candidates/HRCandidateSearch';
import HRNotificationList from './pages/hr/notifications/HRNotificationList';
import HRProfileSettings from './pages/hr/settings/HRProfileSettings';

// ========== ADMIN PAGES ==========
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserList from './pages/admin/users/AdminUserList';
import AdminUserDetail from './pages/admin/users/AdminUserDetail';
import AdminUserEdit from './pages/admin/users/AdminUserEdit';
import AdminJobList from './pages/admin/jobs/AdminJobList';
import AdminJobDetail from './pages/admin/jobs/AdminJobDetail';
import AdminJobApprove from './pages/admin/jobs/AdminJobApprove';
import AdminJobEdit from './pages/admin/jobs/AdminJobEdit';
import AdminCompanyList from './pages/admin/companies/AdminCompanyList';
import AdminCompanyDetail from './pages/admin/companies/AdminCompanyDetail';
import AdminCompanyApprove from './pages/admin/companies/AdminCompanyApprove';
import AdminReports from './pages/admin/reports/AdminReports';
import RevenueReport from './pages/admin/reports/RevenueReport';
import UserReport from './pages/admin/reports/UserReport';
import AdminChatPanel from './components/AdminChat/AdminChatPanel';

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      <p className="mt-4 text-gray-600">Đang tải...</p>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = ['user', 'hr', 'admin'] }) => {
  const { user, loading, isAuthenticated } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user?.role)) {
    if (user?.role === 'hr') {
      return <Navigate to="/hr/dashboard" replace />;
    }
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Main App Router Component
const AppRouter = () => {
  const { user, loading } = useAuth();
  const userRole = user?.role || 'user';
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  // ========== ADMIN ROUTES ==========
  if (userRole === 'admin') {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUserList />} />
          <Route path="users/:id" element={<AdminUserDetail />} />
          <Route path="users/:id/edit" element={<AdminUserEdit />} />
          <Route path="jobs" element={<AdminJobList />} />
          <Route path="jobs/:id" element={<AdminJobDetail />} />
          <Route path="jobs/:id/approve" element={<AdminJobApprove />} />
          <Route path="jobs/:id/edit" element={<AdminJobEdit />} />
          <Route path="companies" element={<AdminCompanyList />} />
          <Route path="companies/:id" element={<AdminCompanyDetail />} />
          <Route path="companies/:id/approve" element={<AdminCompanyApprove />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="reports/revenue" element={<RevenueReport />} />
          <Route path="reports/users" element={<UserReport />} />
          <Route path="support" element={<AdminChatPanel />} />
        </Route>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/hr/*" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/jobs" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/profile" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/create-cv" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    );
  }
  
  // ========== HR ROUTES ==========
  if (userRole === 'hr') {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/hr/dashboard" replace />} />
        <Route path="/hr/dashboard" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRDashboard />
          </ProtectedRoute>
        } />
        <Route path="/hr/jobs" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRJobList />
          </ProtectedRoute>
        } />
        <Route path="/hr/jobs/create" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRJobCreate />
          </ProtectedRoute>
        } />
        <Route path="/hr/jobs/:id/edit" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRJobEdit />
          </ProtectedRoute>
        } />
        <Route path="/hr/jobs/:id" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRJobDetail />
          </ProtectedRoute>
        } />
        <Route path="/hr/jobs/:id/applications" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRApplicationList />
          </ProtectedRoute>
        } />
        <Route path="/hr/applications" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRApplicationList />
          </ProtectedRoute>
        } />
        <Route path="/hr/applications/:id" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRApplicationDetail />
          </ProtectedRoute>
        } />
        <Route path="/hr/applications/:id/review" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRApplicationReview />
          </ProtectedRoute>
        } />
        <Route path="/hr/interviews" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRInterviewList />
          </ProtectedRoute>
        } />
        <Route path="/hr/interviews/:id" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRInterviewDetail />
          </ProtectedRoute>
        } />
        <Route path="/hr/interviews/calendar" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRInterviewCalendar />
          </ProtectedRoute>
        } />
        <Route path="/hr/company/profile" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRCompanyProfile />
          </ProtectedRoute>
        } />
        <Route path="/hr/company/edit" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRCompanyEdit />
          </ProtectedRoute>
        } />
        <Route path="/hr/candidates" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRCandidateSearch />
          </ProtectedRoute>
        } />
        <Route path="/hr/notifications" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRNotificationList />
          </ProtectedRoute>
        } />
        <Route path="/hr/settings" element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRProfileSettings />
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={<Navigate to="/hr/dashboard" replace />} />
        <Route path="/profile" element={<Navigate to="/hr/dashboard" replace />} />
        <Route path="/create-cv" element={<Navigate to="/hr/dashboard" replace />} />
        <Route path="/admin/*" element={<Navigate to="/hr/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/hr/dashboard" replace />} />
      </Routes>
    );
  }
  
  // ========== USER ROUTES ==========
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      <Route path="/top-companies" element={<TopCompaniesPage />} />
      <Route path="/company-reviews" element={<CompanyReviewsPage />} />
      <Route path="/trends" element={<TrendsPage />} />
      <Route path="/guide" element={<GuidePage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/create-cv" element={<CVPage />} />
      <Route path="/cv-styles" element={<CVPage />} />
      <Route path="/cv-industries" element={<CVPage />} />
      <Route path="/cv-guide" element={<CVGuidePage />} />
      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={['user']}>
          <ProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/hr/*" element={<Navigate to="/" replace />} />
      <Route path="/admin/*" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Component để điều khiển hiển thị Navbar/Footer/Chat
const AppContent = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user && !loading;
  
  // Kiểm tra có đang ở trang login/register không
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  // Admin layout (có sidebar riêng, không có navbar thường)
  if (isAdmin) {
    return (
      <>
        <AppRouter />
        <Chatbot />
      </>
    );
  }
  
  // User và HR: Luôn hiển thị Navbar (kể cả trang auth)
  return (
    <>
      <Navbar isAuthPage={isAuthPage} />
      <main className="flex-grow">
        <AppRouter />
      </main>
      {/* Chỉ hiển thị Footer và Chat khi đã đăng nhập và không ở trang auth */}
      {isAuthenticated && !isAuthPage && (
        <>
          <Footer />
          <Chatbot />
          <SupportChat />
        </>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <AppContent />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;