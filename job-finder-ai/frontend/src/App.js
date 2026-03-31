import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
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

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/top-companies" element={<TopCompaniesPage />} />
              <Route path="/company-reviews" element={<CompanyReviewsPage />} />
              <Route path="/trends" element={<TrendsPage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/support" element={<SupportPage />} />
              {/* CV Routes */}
              <Route path="/create-cv" element={<CVPage />} />
              <Route path="/cv-styles" element={<CVPage />} />
              <Route path="/cv-industries" element={<CVPage />} />
              <Route path="/cv-guide" element={<CVGuidePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;