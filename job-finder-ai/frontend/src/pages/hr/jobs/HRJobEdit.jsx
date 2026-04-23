// src/pages/hr/jobs/HRJobEdit.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeftIcon, PlusIcon, TrashIcon, 
  DocumentTextIcon, MapPinIcon, CurrencyDollarIcon,
  BriefcaseIcon, AcademicCapIcon, SparklesIcon,
  ClockIcon, CheckCircleIcon, BuildingOfficeIcon,
  EyeIcon, CheckIcon
} from '@heroicons/react/24/outline';

const HRJobEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subCategory: '',
    location: '',
    salary: '',
    type: 'Full-time',
    experience: '',
    level: '',
    description: '',
    requirements: [''],
    benefits: [''],
    skills: [''],
    deadline: '',
    isHot: false,
    isFeatured: false,
    status: 'active',
    quizEnabled: true,
    quizTimeLimit: 300,
    quizPassingScore: 60
  });

  const [quizQuestions, setQuizQuestions] = useState([]);

  // Mock fetch job data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Mock data - sẽ thay bằng API call
      const mockJob = {
        id: parseInt(id),
        title: "Frontend Developer (React)",
        category: "it",
        subCategory: "frontend",
        location: "Hải Châu",
        salary: "12-20M",
        type: "Full-time",
        experience: "1-3 năm",
        level: "Junior - Middle",
        description: "Phát triển giao diện người dùng với ReactJS, làm việc với team Agile",
        requirements: ["Thành thạo ReactJS", "Có kinh nghiệm JavaScript", "Làm việc nhóm tốt"],
        benefits: ["Lương tháng 13", "Bảo hiểm sức khỏe", "Đào tạo chuyên sâu"],
        skills: ["React", "JavaScript", "HTML/CSS", "Redux"],
        deadline: "2024-04-15",
        isHot: true,
        isFeatured: true,
        status: "active",
        quizEnabled: true,
        quizTimeLimit: 300,
        quizPassingScore: 60
      };
      
      const mockQuiz = [
        { id: 1, text: "ReactJS sử dụng loại DOM nào?", options: ["DOM thường", "Virtual DOM", "Shadow DOM", "XML DOM"], correct: 1, points: 1 },
        { id: 2, text: "Hook nào dùng để quản lý state trong React?", options: ["useEffect", "useContext", "useState", "useReducer"], correct: 2, points: 1 }
      ];
      
      setFormData(mockJob);
      setQuizQuestions(mockQuiz);
      setLoading(false);
    }, 500);
  }, [id]);

  const categories = [
    { id: 'it', name: 'Công nghệ thông tin', subCategories: ['frontend', 'backend', 'fullstack', 'mobile', 'uiux', 'qa', 'devops', 'data', 'ai'] },
    { id: 'tourism', name: 'Du lịch - Khách sạn', subCategories: ['hotel', 'restaurant', 'tour', 'spa', 'transport', 'shop'] },
    { id: 'business', name: 'Kinh doanh - Bán lẻ', subCategories: ['retail', 'telesales', 'online', 'field', 'admin'] },
    { id: 'construction', name: 'Xây dựng - Bất động sản', subCategories: ['labor', 'finishing', 'technical', 'support', 'admin'] },
    { id: 'service', name: 'Dịch vụ - Logistics', subCategories: ['fb', 'store', 'beauty', 'hotel', 'clean', 'operation'] }
  ];

  const locations = ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu', 'Cẩm Lệ', 'Hòa Vang'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const levels = ['Mới tốt nghiệp', 'Nhân viên', 'Junior', 'Middle', 'Senior', 'Trưởng nhóm', 'Quản lý'];
  const statusOptions = [
    { value: 'active', label: 'Đang tuyển', color: 'green' },
    { value: 'expired', label: 'Hết hạn', color: 'yellow' },
    { value: 'closed', label: 'Đã đóng', color: 'red' }
  ];

  const subCategoryNames = {
    frontend: 'Frontend', backend: 'Backend', fullstack: 'Fullstack', mobile: 'Mobile', uiux: 'UI/UX', qa: 'QA/Tester', devops: 'DevOps', data: 'Data Analyst', ai: 'AI Engineer',
    hotel: 'Khách sạn', restaurant: 'Nhà hàng', tour: 'Tour du lịch', spa: 'Spa', transport: 'Vận chuyển', shop: 'Bán hàng',
    retail: 'Bán hàng trực tiếp', telesales: 'Telesales', online: 'Bán hàng online', field: 'Sale thị trường', admin: 'Hỗ trợ kinh doanh',
    labor: 'Lao động trực tiếp', finishing: 'Hoàn thiện', technical: 'Kỹ thuật', support: 'Hỗ trợ',
    fb: 'Ăn uống', store: 'Cửa hàng', beauty: 'Làm đẹp', clean: 'Vệ sinh', operation: 'Vận hành'
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length === 1) return;
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addQuestion = () => {
    setQuizQuestions(prev => [...prev, {
      id: prev.length + 1,
      text: '',
      options: ['', '', '', ''],
      correct: 0,
      points: 1
    }]);
  };

  const removeQuestion = (id) => {
    if (quizQuestions.length === 1) return;
    setQuizQuestions(prev => prev.filter(q => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuizQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (id, optionIndex, value) => {
    setQuizQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) } : q
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const jobData = {
      ...formData,
      quizQuestions: quizQuestions.filter(q => q.text.trim() !== '')
    };
    
    console.log('Updated Job Data:', jobData);
    
    setTimeout(() => {
      setSaving(false);
      navigate('/hr/jobs');
    }, 1500);
  };

  const getSubCategories = () => {
    const category = categories.find(c => c.id === formData.category);
    return category?.subCategories || [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin tin tuyển dụng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/hr/jobs')} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Quay lại danh sách</span>
          </button>
          <div className="flex items-center space-x-3">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>Trạng thái: {opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6">
            <h1 className="text-2xl font-bold text-white">Chỉnh sửa tin tuyển dụng</h1>
            <p className="text-blue-100 mt-1">Cập nhật thông tin tin tuyển dụng</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 px-6">
            <button
              onClick={() => setActiveTab('basic')}
              className={`py-4 px-6 font-medium transition-colors ${
                activeTab === 'basic' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <DocumentTextIcon className="h-5 w-5 inline mr-2" />
              Thông tin cơ bản
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-4 px-6 font-medium transition-colors ${
                activeTab === 'quiz' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <SparklesIcon className="h-5 w-5 inline mr-2" />
              Câu hỏi Quiz ({quizQuestions.length})
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Tab 1: Basic Information */}
            {activeTab === 'basic' && (
              <div className="p-6 space-y-8">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <BuildingOfficeIcon className="h-5 w-5 text-blue-600 mr-2" />
                    Thông tin cơ bản
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề tin tuyển dụng *</label>
                      <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ngành nghề *</label>
                      <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="">Chọn ngành nghề</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lĩnh vực con</label>
                      <select 
                        name="subCategory" 
                        value={formData.subCategory} 
                        onChange={handleChange} 
                        disabled={!formData.category} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                      >
                        <option value="">Chọn lĩnh vực</option>
                        {getSubCategories().map(sub => (
                          <option key={sub} value={sub}>{subCategoryNames[sub] || sub}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        Địa điểm *
                      </label>
                      <select 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="">Chọn quận/huyện</option>
                        {locations.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                        Mức lương
                      </label>
                      <input 
                        type="text" 
                        name="salary" 
                        value={formData.salary} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <BriefcaseIcon className="h-4 w-4 mr-1" />
                        Hình thức làm việc
                      </label>
                      <select 
                        name="type" 
                        value={formData.type} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        {jobTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <AcademicCapIcon className="h-4 w-4 mr-1" />
                        Cấp bậc
                      </label>
                      <select 
                        name="level" 
                        value={formData.level} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="">Chọn cấp bậc</option>
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kinh nghiệm yêu cầu</label>
                      <input 
                        type="text" 
                        name="experience" 
                        value={formData.experience} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hạn nộp hồ sơ</label>
                      <input 
                        type="date" 
                        name="deadline" 
                        value={formData.deadline} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">📝 Mô tả công việc</h2>
                  <textarea 
                    name="description" 
                    rows="5" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" 
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
                    <span>✅ Yêu cầu công việc</span>
                    <button type="button" onClick={() => addArrayItem('requirements')} className="text-blue-600 text-sm flex items-center">
                      <PlusIcon className="h-4 w-4 mr-1" />Thêm yêu cầu
                    </button>
                  </h2>
                  {formData.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mb-2">
                      <input type="text" value={req} onChange={(e) => handleArrayChange('requirements', idx, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" />
                      <button type="button" onClick={() => removeArrayItem('requirements', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
                    <span>🎁 Quyền lợi</span>
                    <button type="button" onClick={() => addArrayItem('benefits')} className="text-blue-600 text-sm flex items-center">
                      <PlusIcon className="h-4 w-4 mr-1" />Thêm quyền lợi
                    </button>
                  </h2>
                  {formData.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mb-2">
                      <input type="text" value={benefit} onChange={(e) => handleArrayChange('benefits', idx, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" />
                      <button type="button" onClick={() => removeArrayItem('benefits', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
                    <span>🛠️ Kỹ năng yêu cầu</span>
                    <button type="button" onClick={() => addArrayItem('skills')} className="text-blue-600 text-sm flex items-center">
                      <PlusIcon className="h-4 w-4 mr-1" />Thêm kỹ năng
                    </button>
                  </h2>
                  {formData.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mb-2">
                      <input type="text" value={skill} onChange={(e) => handleArrayChange('skills', idx, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" />
                      <button type="button" onClick={() => removeArrayItem('skills', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="isHot" checked={formData.isHot} onChange={handleChange} className="rounded border-gray-300 text-red-600" />
                    <span className="text-sm text-gray-700">Đánh dấu 🔥 Hot</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="rounded border-gray-300 text-yellow-600" />
                    <span className="text-sm text-gray-700">Đánh dấu ⭐ Nổi bật</span>
                  </label>
                </div>
              </div>
            )}

            {/* Tab 2: Quiz Questions */}
            {activeTab === 'quiz' && (
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">📋 Bộ câu hỏi đánh giá</h2>
                    <p className="text-sm text-gray-500">Quản lý câu hỏi quiz cho ứng viên</p>
                  </div>
                  <button type="button" onClick={addQuestion} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4" />
                    <span>Thêm câu hỏi</span>
                  </button>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <ClockIcon className="h-4 w-4 inline mr-1" />
                        Thời gian làm bài (giây)
                      </label>
                      <input type="number" name="quizTimeLimit" value={formData.quizTimeLimit} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <CheckCircleIcon className="h-4 w-4 inline mr-1" />
                        Điểm đậu (%)
                      </label>
                      <input type="number" name="quizPassingScore" value={formData.quizPassingScore} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                </div>

                {quizQuestions.map((question, idx) => (
                  <div key={question.id} className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-gray-900">Câu hỏi {idx + 1}</h3>
                      <button type="button" onClick={() => removeQuestion(question.id)} className="text-red-500 hover:text-red-700">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung câu hỏi</label>
                      <input type="text" value={question.text} onChange={(e) => updateQuestion(question.id, 'text', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Các lựa chọn</label>
                      <div className="space-y-2">
                        {question.options.map((option, optIdx) => (
                          <div key={optIdx} className="flex items-center space-x-2">
                            <input type="radio" name={`correct-${question.id}`} checked={question.correct === optIdx} onChange={() => updateQuestion(question.id, 'correct', optIdx)} className="h-4 w-4 text-blue-600" />
                            <input type="text" value={option} onChange={(e) => updateOption(question.id, optIdx, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" placeholder={`Đáp án ${String.fromCharCode(65 + optIdx)}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Điểm số</label>
                      <input type="number" value={question.points} onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value))} className="w-24 px-3 py-1 border border-gray-300 rounded-lg" min="1" max="10" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex justify-between p-6 border-t border-gray-100 bg-gray-50">
              <button type="button" onClick={() => navigate('/hr/jobs')} className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Hủy
              </button>
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 flex items-center space-x-2">
                <CheckIcon className="h-5 w-5" />
                <span>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HRJobEdit;