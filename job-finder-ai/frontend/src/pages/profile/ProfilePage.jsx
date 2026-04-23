// frontend/src/pages/profile/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileTabs from './ProfileTabs';
import PersonalInfo from './PersonalInfo';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Applications from './Applications';
import SavedJobs from './SavedJobs';
import EditProfileModal from './EditProfileModal';
import api from '../../services/api';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user: authUser, updateUserProfile } = useAuth();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [stats, setStats] = useState({
    applications: 0,
    savedJobs: 0,
    interviews: 0,
    accepted: 0
  });
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from API
  useEffect(() => {
    fetchUserProfile();
    fetchUserApplications();
    fetchSavedJobs();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      // Lấy thông tin user từ API
      const response = await api.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        // Fallback to auth user
        setUser(authUser);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback to auth user
      setUser(authUser);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserApplications = async () => {
    try {
      const response = await api.get('/applications/my-applications');
      if (response.data.success) {
        setApplications(response.data.applications);
        setStats(prev => ({
          ...prev,
          applications: response.data.applications.length,
          interviews: response.data.applications.filter(a => a.status === 'interview').length,
          accepted: response.data.applications.filter(a => a.status === 'hired').length
        }));
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const response = await api.get('/users/saved-jobs');
      if (response.data.success) {
        setSavedJobs(response.data.savedJobs);
        setStats(prev => ({
          ...prev,
          savedJobs: response.data.savedJobs.length
        }));
      }
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await api.put('/auth/profile', updatedData);
      if (response.data.success) {
        setUser(response.data.user);
        updateUserProfile(response.data.user);
        setIsEditModalOpen(false);
        alert('Cập nhật hồ sơ thành công!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Cập nhật thất bại. Vui lòng thử lại!');
    }
  };

  const handleRemoveSavedJob = async (jobId) => {
    try {
      await api.post(`/users/save-job/${jobId}`);
      setSavedJobs(savedJobs.filter(job => job._id !== jobId));
      setStats(prev => ({ ...prev, savedJobs: prev.savedJobs - 1 }));
    } catch (error) {
      console.error('Error removing saved job:', error);
    }
  };

  const handleAddSkill = async (skill) => {
    const newSkills = [...(user?.skills || []), skill];
    try {
      await api.put('/users/skills', { skills: newSkills });
      setUser({ ...user, skills: newSkills });
      updateUserProfile({ ...user, skills: newSkills });
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const handleRemoveSkill = async (skill) => {
    const newSkills = (user?.skills || []).filter(s => s !== skill);
    try {
      await api.put('/users/skills', { skills: newSkills });
      setUser({ ...user, skills: newSkills });
      updateUserProfile({ ...user, skills: newSkills });
    } catch (error) {
      console.error('Error removing skill:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <PersonalInfo user={user} />;
      case 'experience':
        return <Experience experiences={user?.experience || []} />;
      case 'education':
        return <Education educations={user?.education || []} />;
      case 'skills':
        return (
          <Skills 
            skills={user?.skills || []}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
          />
        );
      case 'applications':
        return <Applications applications={applications} />;
      case 'saved':
        return <SavedJobs savedJobs={savedJobs} onRemove={handleRemoveSavedJob} />;
      default:
        return <PersonalInfo user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy thông tin người dùng</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader 
          user={user} 
          onEdit={() => setIsEditModalOpen(true)} 
        />
        
        <ProfileStats stats={stats} />
        
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {renderTabContent()}
      </div>
      
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleUpdateProfile}
      />
    </div>
  );
};

export default ProfilePage;