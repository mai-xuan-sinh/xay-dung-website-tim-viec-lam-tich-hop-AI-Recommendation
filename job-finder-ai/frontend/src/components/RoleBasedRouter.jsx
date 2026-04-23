// src/components/RoleBasedRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// User Pages
import HomePage from '../pages/home/HomePage';
import JobsPage from '../pages/jobs/JobsPage';
import JobDetailPage from '../pages/job-detail/JobDetailPage';
import ProfilePage from '../pages/profile/ProfilePage';
import CVPage from '../pages/cv/CVPage';
// ... các trang user khác

// HR Pages
import HRDashboard from '../pages/hr/HRDashboard';
import HRJobList from '../pages/hr/jobs/HRJobList';
import HRJobCreate from '../pages/hr/jobs/HRJobCreate';
import HRJobEdit from '../pages/hr/jobs/HRJobEdit';
import HRApplicationList from '../pages/hr/applications/HRApplicationList';
import HRApplicationDetail from '../pages/hr/applications/HRApplicationDetail';
import HRApplicationReview from '../pages/hr/applications/HRApplicationReview';
import HRInterviewList from '../pages/hr/interviews/HRInterviewList';
import HRInterviewDetail from '../pages/hr/interviews/HRInterviewDetail';
import HRInterviewCalendar from '../pages/hr/interviews/HRInterviewCalendar';
import HRCompanyProfile from '../pages/hr/company/HRCompanyProfile';
import HRCompanyEdit from '../pages/hr/company/HRCompanyEdit';
import HRCandidateSearch from '../pages/hr/candidates/HRCandidateSearch';
import HRNotificationList from '../pages/hr/notifications/HRNotificationList';
import HRProfileSettings from '../pages/hr/settings/HRProfileSettings';

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

const RoleBasedRouter = () => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  const userRole = user?.role || 'user';

  // HR Routes
  if (userRole === 'hr' || userRole === 'admin') {
    return (
      <Routes>
        {/* HR Dashboard */}
        <Route path="/" element={<HRDashboard />} />
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        
        {/* Job Management */}
        <Route path="/hr/jobs" element={<HRJobList />} />
        <Route path="/hr/jobs/create" element={<HRJobCreate />} />
        <Route path="/hr/jobs/:id/edit" element={<HRJobEdit />} />
        <Route path="/hr/jobs/:id/applications" element={<HRApplicationList />} />
        
        {/* Application Management */}
        <Route path="/hr/applications" element={<HRApplicationList />} />
        <Route path="/hr/applications/:id" element={<HRApplicationDetail />} />
        <Route path="/hr/applications/:id/review" element={<HRApplicationReview />} />
        
        {/* Interview Management */}
        <Route path="/hr/interviews" element={<HRInterviewList />} />
        <Route path="/hr/interviews/:id" element={<HRInterviewDetail />} />
        <Route path="/hr/interviews/calendar" element={<HRInterviewCalendar />} />
        
        {/* Company Management */}
        <Route path="/hr/company/profile" element={<HRCompanyProfile />} />
        <Route path="/hr/company/edit" element={<HRCompanyEdit />} />
        
        {/* Candidate Search */}
        <Route path="/hr/candidates" element={<HRCandidateSearch />} />
        
        {/* Notifications */}
        <Route path="/hr/notifications" element={<HRNotificationList />} />
        
        {/* Settings */}
        <Route path="/hr/settings" element={<HRProfileSettings />} />
        
        {/* Redirect any unknown HR routes to dashboard */}
        <Route path="*" element={<Navigate to="/hr/dashboard" replace />} />
      </Routes>
    );
  }

  // User Routes
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/create-cv" element={<CVPage />} />
      <Route path="/cv-styles" element={<CVPage />} />
      <Route path="/cv-industries" element={<CVPage />} />
      <Route path="/cv-guide" element={<CVGuidePage />} />
      <Route path="/top-companies" element={<TopCompaniesPage />} />
      <Route path="/company-reviews" element={<CompanyReviewsPage />} />
      <Route path="/trends" element={<TrendsPage />} />
      <Route path="/guide" element={<GuidePage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RoleBasedRouter;