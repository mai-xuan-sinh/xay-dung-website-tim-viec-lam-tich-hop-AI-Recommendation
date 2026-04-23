// src/pages/hr/jobs/HRJobCreate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, PlusIcon, TrashIcon, 
  DocumentTextIcon, MapPinIcon, CurrencyDollarIcon,
  BriefcaseIcon, AcademicCapIcon, SparklesIcon,
  ClockIcon, CheckCircleIcon, BuildingOfficeIcon,
  EyeIcon, CreditCardIcon
} from '@heroicons/react/24/outline';
import PaymentModal from './components/PaymentModal';

const HRJobCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [previewMode, setPreviewMode] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
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
    quizEnabled: false,  // Mặc định tắt quiz
    quizTimeLimit: 300,
    quizPassingScore: 60
  });

  const [quizQuestions, setQuizQuestions] = useState([
    { id: 1, text: '', options: ['', '', '', ''], correct: 0, points: 1 }
  ]);

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

  // Quiz functions
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

  const handlePaymentSuccess = (selectedPackage) => {
    setLoading(true);
    
    const jobData = {
      ...formData,
      quizQuestions: formData.quizEnabled ? quizQuestions.filter(q => q.text.trim() !== '') : [],
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      package: selectedPackage.name,
      packageDays: selectedPackage.days,
      packagePrice: selectedPackage.price
    };
    
    console.log('Job Data with Package:', jobData);
    alert(`Thanh toán thành công! Bạn đã đăng ký ${selectedPackage.name} với giá ${selectedPackage.price.toLocaleString()}đ trong ${selectedPackage.days} ngày.`);
    
    setLoading(false);
    setShowPaymentModal(false);
    navigate('/hr/jobs');
  };

  const getSubCategories = () => {
    const category = categories.find(c => c.id === formData.category);
    return category?.subCategories || [];
  };

  const isBasicValid = () => {
    return formData.title && formData.category && formData.location;
  };

  const isQuizValid = () => {
    if (!formData.quizEnabled) return true;
    return quizQuestions.every(q => 
      q.text.trim() !== '' && 
      q.options.every(opt => opt.trim() !== '')
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/hr/jobs')} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Quay lại danh sách</span>
          </button>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <EyeIcon className="h-5 w-5" />
            <span>{previewMode ? 'Quay lại chỉnh sửa' : 'Xem trước'}</span>
          </button>
        </div>

        {previewMode ? (
          // Preview Mode
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{formData.title || 'Tiêu đề tin tuyển dụng'}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-gray-600">{formData.location || 'Địa điểm'}</span>
                <span className="text-green-600 font-medium">{formData.salary || 'Mức lương'}</span>
                <span className="text-gray-500">{formData.type || 'Hình thức'}</span>
              </div>
            </div>
            <div className="prose max-w-none">
              <h3 className="font-semibold text-gray-900">Mô tả công việc</h3>
              <p className="text-gray-600">{formData.description || 'Chưa có mô tả'}</p>
              
              <h3 className="font-semibold text-gray-900 mt-4">Yêu cầu</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {formData.requirements.map((req, idx) => req && <li key={idx}>{req}</li>)}
              </ul>
              
              <h3 className="font-semibold text-gray-900 mt-4">Quyền lợi</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {formData.benefits.map((ben, idx) => ben && <li key={idx}>{ben}</li>)}
              </ul>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6">
              <h1 className="text-2xl font-bold text-white">Đăng tin tuyển dụng</h1>
              <p className="text-blue-100 mt-1">Điền thông tin chi tiết về vị trí cần tuyển</p>
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
                Câu hỏi Quiz {formData.quizEnabled ? '(Đã bật)' : '(Tùy chọn)'}
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {/* Tab 1: Basic Information */}
              {activeTab === 'basic' && (
                <div className="p-6 space-y-8">
                  {/* Thông tin cơ bản */}
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
                          placeholder="Ví dụ: Frontend Developer (React)"
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
                          placeholder="Ví dụ: 12-20M hoặc Thỏa thuận"
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
                          placeholder="Ví dụ: 1-3 năm"
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

                  {/* Mô tả công việc */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">📝 Mô tả công việc</h2>
                    <textarea 
                      name="description" 
                      rows="5" 
                      value={formData.description} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" 
                      placeholder="Mô tả chi tiết công việc, nhiệm vụ chính..."
                    />
                  </div>

                  {/* Yêu cầu */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
                      <span>✅ Yêu cầu công việc</span>
                      <button 
                        type="button" 
                        onClick={() => addArrayItem('requirements')} 
                        className="text-blue-600 text-sm flex items-center"
                      >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Thêm yêu cầu
                      </button>
                    </h2>
                    {formData.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center space-x-2 mb-2">
                        <input 
                          type="text" 
                          value={req} 
                          onChange={(e) => handleArrayChange('requirements', idx, e.target.value)} 
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" 
                          placeholder={`Yêu cầu ${idx + 1}`}
                        />
                        <button 
                          type="button" 
                          onClick={() => removeArrayItem('requirements', idx)} 
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Quyền lợi */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
                      <span>🎁 Quyền lợi</span>
                      <button 
                        type="button" 
                        onClick={() => addArrayItem('benefits')} 
                        className="text-blue-600 text-sm flex items-center"
                      >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Thêm quyền lợi
                      </button>
                    </h2>
                    {formData.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2 mb-2">
                        <input 
                          type="text" 
                          value={benefit} 
                          onChange={(e) => handleArrayChange('benefits', idx, e.target.value)} 
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" 
                          placeholder={`Quyền lợi ${idx + 1}`}
                        />
                        <button 
                          type="button" 
                          onClick={() => removeArrayItem('benefits', idx)} 
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Kỹ năng yêu cầu */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
                      <span>🛠️ Kỹ năng yêu cầu</span>
                      <button 
                        type="button" 
                        onClick={() => addArrayItem('skills')} 
                        className="text-blue-600 text-sm flex items-center"
                      >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Thêm kỹ năng
                      </button>
                    </h2>
                    {formData.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center space-x-2 mb-2">
                        <input 
                          type="text" 
                          value={skill} 
                          onChange={(e) => handleArrayChange('skills', idx, e.target.value)} 
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" 
                          placeholder={`Kỹ năng ${idx + 1}`}
                        />
                        <button 
                          type="button" 
                          onClick={() => removeArrayItem('skills', idx)} 
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <p className="text-xs text-gray-400 mt-2">
                      💡 Kỹ năng sẽ được AI sử dụng để gợi ý việc làm phù hợp với ứng viên
                    </p>
                  </div>

                  {/* Cài đặt đặc biệt */}
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        name="isHot" 
                        checked={formData.isHot} 
                        onChange={handleChange}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">Đánh dấu 🔥 Hot</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        name="isFeatured" 
                        checked={formData.isFeatured} 
                        onChange={handleChange}
                        className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span className="text-sm text-gray-700">Đánh dấu ⭐ Nổi bật</span>
                    </label>
                  </div>

                  {/* Quiz Settings - Tùy chọn */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <SparklesIcon className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Tạo Quiz đánh giá ứng viên</h3>
                          <p className="text-sm text-gray-600">Bật tính năng này để tạo bộ câu hỏi đánh giá kiến thức chuyên môn của ứng viên (Không bắt buộc)</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, quizEnabled: !prev.quizEnabled }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.quizEnabled ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.quizEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    {formData.quizEnabled && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <ClockIcon className="h-4 w-4 inline mr-1" />
                            Thời gian làm bài (giây)
                          </label>
                          <input 
                            type="number" 
                            name="quizTimeLimit"
                            value={formData.quizTimeLimit} 
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <CheckCircleIcon className="h-4 w-4 inline mr-1" />
                            Điểm đậu (%)
                          </label>
                          <input 
                            type="number" 
                            name="quizPassingScore"
                            value={formData.quizPassingScore} 
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Quiz Questions - Chỉ hiển thị khi bật quiz */}
              {activeTab === 'quiz' && (
                <div className="p-6 space-y-6">
                  {!formData.quizEnabled ? (
                    <div className="text-center py-12">
                      <SparklesIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Quiz chưa được bật</p>
                      <p className="text-sm text-gray-400">Vui lòng quay lại tab "Thông tin cơ bản" để bật Quiz</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">📋 Bộ câu hỏi đánh giá</h2>
                          <p className="text-sm text-gray-500">Tạo câu hỏi để đánh giá kiến thức chuyên môn của ứng viên</p>
                        </div>
                        <button
                          type="button"
                          onClick={addQuestion}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <PlusIcon className="h-4 w-4" />
                          <span>Thêm câu hỏi</span>
                        </button>
                      </div>

                      {quizQuestions.map((question, idx) => (
                        <div key={question.id} className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold text-gray-900">Câu hỏi {idx + 1}</h3>
                            {quizQuestions.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeQuestion(question.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung câu hỏi</label>
                            <input
                              type="text"
                              value={question.text}
                              onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                              placeholder="Ví dụ: ReactJS sử dụng loại DOM nào?"
                            />
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Các lựa chọn</label>
                            <div className="space-y-2">
                              {question.options.map((option, optIdx) => (
                                <div key={optIdx} className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    name={`correct-${question.id}`}
                                    checked={question.correct === optIdx}
                                    onChange={() => updateQuestion(question.id, 'correct', optIdx)}
                                    className="h-4 w-4 text-blue-600"
                                  />
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => updateOption(question.id, optIdx, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder={`Đáp án ${String.fromCharCode(65 + optIdx)}`}
                                  />
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Chọn đáp án đúng bằng radio button</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Điểm số</label>
                            <input
                              type="number"
                              value={question.points}
                              onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value))}
                              className="w-24 px-3 py-1 border border-gray-300 rounded-lg"
                              min="1"
                              max="10"
                            />
                          </div>
                        </div>
                      ))}

                      {quizQuestions.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                          <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500">Chưa có câu hỏi nào</p>
                          <button
                            type="button"
                            onClick={addQuestion}
                            className="mt-3 text-blue-600 hover:underline"
                          >
                            + Thêm câu hỏi đầu tiên
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Footer Buttons */}
              <div className="flex justify-between p-6 border-t border-gray-100 bg-gray-50">
                <button
                  type="button"
                  onClick={() => navigate('/hr/jobs')}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <div className="flex space-x-3">
                  {activeTab === 'basic' && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('quiz')}
                      disabled={!isBasicValid()}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                    >
                      Tiếp theo: Tạo Quiz {formData.quizEnabled ? '' : '(Tùy chọn)'} →
                    </button>
                  )}
                  {activeTab === 'quiz' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveTab('basic')}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        ← Quay lại
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowPaymentModal(true)}
                        disabled={!isBasicValid()}
                        className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 flex items-center space-x-2"
                      >
                        <CreditCardIcon className="h-5 w-5" />
                        <span>Tiếp tục thanh toán</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        jobData={formData}
      />
    </div>
  );
};

export default HRJobCreate;