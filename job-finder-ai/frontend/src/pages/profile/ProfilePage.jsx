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
import './ProfilePage.css';

// Mock data - sẽ thay bằng API sau
const mockUserData = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@email.com",
  role: "jobseeker",
  profile: {
    title: "Frontend Developer",
    phone: "0912345678",
    address: "Đà Nẵng",
    birthDate: "15/03/1995",
    bio: "Frontend Developer với 3 năm kinh nghiệm, thành thạo ReactJS, Vue.js. Đam mê tạo ra những sản phẩm chất lượng cao.",
    website: "https://github.com/nguyenvana",
    experience: [
      {
        company: "FPT Software",
        position: "Frontend Developer",
        startDate: "01/2021",
        endDate: "Hiện tại",
        location: "Đà Nẵng",
        description: "Phát triển giao diện người dùng với ReactJS, tối ưu hiệu suất và SEO."
      },
      {
        company: "Axon Active",
        position: "Junior Developer",
        startDate: "06/2019",
        endDate: "12/2020",
        location: "Đà Nẵng",
        description: "Hỗ trợ phát triển các tính năng mới, sửa lỗi và viết test cases."
      }
    ],
    education: [
      {
        school: "Đại học Bách Khoa Đà Nẵng",
        degree: "Kỹ sư",
        fieldOfStudy: "Công nghệ thông tin",
        startDate: "2015",
        endDate: "2019",
        description: "Chuyên ngành Kỹ thuật phần mềm, tốt nghiệp loại Giỏi."
      }
    ],
    skills: ["ReactJS", "Vue.js", "JavaScript", "HTML/CSS", "Git", "Redux", "TypeScript"]
  }
};

const mockStats = {
  applications: 12,
  savedJobs: 8,
  interviews: 5,
  accepted: 2
};

const mockApplications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: "Frontend Developer (React)",
    company: "FPT Software",
    location: "Đà Nẵng",
    salary: "12-20M",
    appliedDate: "15/03/2024",
    status: "reviewed"
  },
  {
    id: 2,
    jobId: 2,
    jobTitle: "Backend Developer (Node.js)",
    company: "Axon Active",
    location: "Đà Nẵng",
    salary: "15-25M",
    appliedDate: "10/03/2024",
    status: "pending"
  }
];

const mockSavedJobs = [
  {
    id: 3,
    title: "Fullstack Developer",
    company: "TMA Solutions",
    location: "Đà Nẵng",
    salary: "18-28M"
  },
  {
    id: 4,
    title: "Mobile Developer (React Native)",
    company: "OX Consulting",
    location: "Đà Nẵng",
    salary: "15-23M"
  }
];

const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(mockUserData);
  const [activeTab, setActiveTab] = useState('info');
  const [stats, setStats] = useState(mockStats);
  const [applications, setApplications] = useState(mockApplications);
  const [savedJobs, setSavedJobs] = useState(mockSavedJobs);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // TODO: Gọi API lấy thông tin user
  //   fetchUserProfile();
  // }, []);

  const handleUpdateProfile = (updatedData) => {
    setUser({
      ...user,
      ...updatedData,
      profile: {
        ...user.profile,
        phone: updatedData.phone,
        address: updatedData.address,
        title: updatedData.title,
        bio: updatedData.bio,
      }
    });
    setIsEditModalOpen(false);
    // TODO: Gọi API cập nhật profile
  };

  const handleRemoveSavedJob = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
    // TODO: Gọi API xóa job đã lưu
  };

  const handleAddSkill = (skill) => {
    setUser({
      ...user,
      profile: {
        ...user.profile,
        skills: [...(user.profile?.skills || []), skill]
      }
    });
  };

  const handleRemoveSkill = (skill) => {
    setUser({
      ...user,
      profile: {
        ...user.profile,
        skills: user.profile?.skills?.filter(s => s !== skill) || []
      }
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <PersonalInfo user={user} />;
      case 'experience':
        return <Experience experiences={user.profile?.experience || []} />;
      case 'education':
        return <Education educations={user.profile?.education || []} />;
      case 'skills':
        return (
          <Skills 
            skills={user.profile?.skills || []}
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <ProfileHeader 
          user={user} 
          onEdit={() => setIsEditModalOpen(true)} 
        />
        
        {/* Profile Stats */}
        <ProfileStats stats={stats} />
        
        {/* Tabs */}
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Tab Content */}
        {renderTabContent()}
      </div>
      
      {/* Edit Profile Modal */}
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