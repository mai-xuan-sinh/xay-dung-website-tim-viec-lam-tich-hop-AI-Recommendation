// src/pages/job-detail/JobDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import JobHeader from './JobHeader';
import JobDescription from './JobDescription';
import JobRequirements from './JobRequirements';
import JobBenefits from './JobBenefits';
import CompanyInfo from './CompanyInfo';
import SimilarJobs from './SimilarJobs';
import ApplicationModal from './ApplicationModal';
import JobActions from './JobActions';
import QuizModal from './QuizModal';
import './JobDetailPage.css';

// Import dữ liệu jobs từ tất cả các file
import { 
  itJobs, 
  tourismJobs, 
  businessJobs, 
  constructionJobs, 
  serviceJobs 
} from '../../data/jobs';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Hàm lấy job theo id từ tất cả các nguồn dữ liệu
  const getJobById = (jobId) => {
    const allJobs = [...itJobs, ...tourismJobs, ...businessJobs, ...constructionJobs, ...serviceJobs];
    return allJobs.find(job => job.id === jobId || job.id === parseInt(jobId));
  };

  // Hàm lấy công ty tương ứng
  const getCompanyInfo = (job) => {
    return {
      id: job.id,
      name: job.company,
      logo: job.logo,
      description: job.description || `${job.company} là công ty hàng đầu trong lĩnh vực ${job.category}`,
      employees: "500+",
      founded: "2010",
      address: job.location,
      hotJobs: 5,
      website: `https://${job.company.toLowerCase().replace(/ /g, '')}.com`,
      email: `hr@${job.company.toLowerCase().replace(/ /g, '')}.com`,
      phone: "0236 123 4567"
    };
  };

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const foundJob = getJobById(id);
        
        if (foundJob) {
          const enrichedJob = {
            ...foundJob,
            views: Math.floor(Math.random() * 1000) + 100,
            applicants: Math.floor(Math.random() * 100) + 10,
            rating: 4.5 + Math.random() * 0.5,
            ratingCount: Math.floor(Math.random() * 200) + 50,
            isNew: new Date(foundJob.postedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            companyInfo: getCompanyInfo(foundJob)
            // KHÔNG cần similarJobs nữa vì SimilarJobs sẽ tự tính bằng AI
          };
          setJob(enrichedJob);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    // TODO: Gọi API lưu job
  };

  const handleApply = () => {
    setIsModalOpen(true);
  };

  const handleSubmitApplication = (formData) => {
    console.log('Application submitted:', formData);
    // TODO: Gọi API gửi đơn ứng tuyển
    setIsModalOpen(false);
    alert('Ứng tuyển thành công! Chúng tôi sẽ liên hệ lại với bạn.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Cơ hội việc làm ${job?.title} tại ${job?.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link việc làm!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReport = () => {
    alert('Cảm ơn bạn đã báo cáo. Chúng tôi sẽ xem xét!');
  };

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

  const handleQuizSubmit = async (result) => {
    console.log('Quiz result:', result);
    // TODO: Gọi API lưu kết quả bài test
    // POST /api/quiz/submit
    // Dữ liệu: { jobId, score, answers, totalQuestions, correctAnswers }
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

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy việc làm</h2>
          <p className="text-gray-600 mb-4">Việc làm bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
          <button
            onClick={() => navigate('/jobs')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại danh sách việc làm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Nút quay lại */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 group"
        >
          <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột trái - Thông tin chi tiết */}
          <div className="lg:col-span-2 space-y-6">
            <JobHeader 
              job={job}
              isSaved={isSaved}
              onSave={handleSaveJob}
              onShare={handleShare}
              onView={() => navigate(`/companies/${job.companyInfo.id}`)}
            />
            <JobDescription description={job.description} />
            <JobRequirements requirements={job.requirements} />
            <JobBenefits benefits={job.benefits} />
          </div>

          {/* Cột phải - Thông tin bổ sung */}
          <div className="space-y-6">
            <JobActions
              onApply={handleApply}
              onSave={handleSaveJob}
              isSaved={isSaved}
              onShare={handleShare}
              onReport={handleReport}
              onPrint={handlePrint}
              onQuiz={handleOpenQuiz}
              hasQuiz={job.hot || job.featured}
            />
            <CompanyInfo company={job.companyInfo} />
            {/* SimilarJobs - Truyền currentJob để AI tự tính toán */}
            <SimilarJobs currentJob={job} />
          </div>
        </div>
      </div>

      {/* Modal ứng tuyển */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={job.title}
        companyName={job.company}
        onSubmit={handleSubmitApplication}
      />

      {/* Modal bài test */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        job={job}
        onSubmit={handleQuizSubmit}
      />
    </div>
  );
};

export default JobDetailPage;