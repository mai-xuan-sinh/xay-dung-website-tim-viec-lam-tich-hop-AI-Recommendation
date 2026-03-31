// src/pages/cv/CVForm.jsx
import React, { useState } from 'react';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CalendarIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  PlusIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CameraIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Component EditableField - click để sửa trực tiếp
const EditableField = ({ value, onSave, placeholder, className = '', multiline = false, style = {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTempValue(value || '');
  }, [value]);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (!multiline && inputRef.current.select) {
        inputRef.current.select();
      }
    }
  }, [isEditing, multiline]);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onSave(tempValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`w-full border-2 border-blue-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm ${className}`}
          placeholder={placeholder}
          rows={4}
          style={style}
        />
      );
    }
    return (
      <input
        ref={inputRef}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full border-2 border-blue-400 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm ${className}`}
        placeholder={placeholder}
        style={style}
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-gray-50 hover:ring-1 hover:ring-blue-300 transition-all rounded-lg px-2 py-1 -mx-2 -my-1 ${!value ? 'text-gray-400 italic' : 'text-gray-800'} ${className}`}
      style={style}
    >
      {value || placeholder || 'Nhấn để nhập'}
    </div>
  );
};

// Component Avatar - upload ảnh đại diện
const AvatarUpload = ({ avatar, onUpload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {avatar ? (
        <img 
          src={avatar} 
          alt="Avatar" 
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-lg">
          <UserIcon className="h-10 w-10 text-gray-400" />
        </div>
      )}
      {isHovered && (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-all"
        >
          <CameraIcon className="h-6 w-6 text-white" />
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

// Component chính
const CVForm = ({ template, cvData, onUpdate, onBack, onNext }) => {
  const [avatar, setAvatar] = useState(cvData.personalInfo?.avatar || '');

  const updateField = (path, value) => {
    const newData = { ...cvData };
    const keys = path.split('.');
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onUpdate(newData);
  };

  const updateAvatar = (avatarData) => {
    setAvatar(avatarData);
    updateField('personalInfo.avatar', avatarData);
  };

  // Màu sắc theo từng mẫu
  const getTemplateColors = () => {
    const colors = {
      'minimal-1': { primary: 'from-gray-600 to-gray-800', accent: 'gray-600', bg: 'bg-gray-50' },
      'minimal-2': { primary: 'from-gray-600 to-gray-800', accent: 'gray-600', bg: 'bg-gray-50' },
      'minimal-3': { primary: 'from-gray-600 to-gray-800', accent: 'gray-600', bg: 'bg-gray-50' },
      'minimal-4': { primary: 'from-gray-600 to-gray-800', accent: 'gray-600', bg: 'bg-gray-50' },
      'minimal-5': { primary: 'from-gray-600 to-gray-800', accent: 'gray-600', bg: 'bg-gray-50' },
      'modern-1': { primary: 'from-purple-600 to-pink-600', accent: 'purple-600', bg: 'bg-purple-50' },
      'modern-2': { primary: 'from-blue-600 to-indigo-600', accent: 'blue-600', bg: 'bg-blue-50' },
      'modern-3': { primary: 'from-green-600 to-emerald-600', accent: 'green-600', bg: 'bg-green-50' },
      'modern-4': { primary: 'from-gray-600 to-gray-800', accent: 'gray-600', bg: 'bg-gray-50' },
      'modern-5': { primary: 'from-red-600 to-pink-600', accent: 'red-600', bg: 'bg-red-50' },
      'professional-1': { primary: 'from-blue-600 to-indigo-600', accent: 'blue-600', bg: 'bg-blue-50' },
      'professional-2': { primary: 'from-green-600 to-emerald-600', accent: 'green-600', bg: 'bg-green-50' },
      'professional-3': { primary: 'from-purple-600 to-pink-600', accent: 'purple-600', bg: 'bg-purple-50' },
      'professional-4': { primary: 'from-pink-600 to-rose-600', accent: 'pink-600', bg: 'bg-pink-50' },
      'professional-5': { primary: 'from-gray-600 to-gray-800', accent: 'gray-600', bg: 'bg-gray-50' },
    };
    return colors[template.id] || colors['minimal-1'];
  };

  const colors = getTemplateColors();

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden`}>
      {/* Header với màu sắc theo mẫu */}
      <div className={`bg-gradient-to-r ${colors.primary} p-6 text-white`}>
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{template.icon}</span>
          <div>
            <h2 className="text-2xl font-bold">Mẫu {template.name}</h2>
            <p className="opacity-90 text-sm">{template.description}</p>
          </div>
        </div>
      </div>

      {/* Form - Giao diện CV thật */}
      <div className="p-8 max-w-4xl mx-auto">
        {/* Avatar và tên */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 border-b border-gray-200 pb-8">
          <div className="flex items-center space-x-4">
            <AvatarUpload avatar={avatar} onUpload={updateAvatar} />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                <EditableField
                  value={cvData.personalInfo?.fullName}
                  onSave={(v) => updateField('personalInfo.fullName', v)}
                  placeholder="Họ và tên"
                  className="font-bold"
                />
              </h1>
              <p className="text-lg text-gray-500 mt-1">
                <EditableField
                  value={cvData.personalInfo?.title}
                  onSave={(v) => updateField('personalInfo.title', v)}
                  placeholder="Chức danh"
                />
              </p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500 space-y-1">
            <div><EditableField value={cvData.personalInfo?.linkedin} onSave={(v) => updateField('personalInfo.linkedin', v)} placeholder="LinkedIn" /></div>
            <div><EditableField value={cvData.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="Email" /></div>
            <div><EditableField value={cvData.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="Số điện thoại" /></div>
            <div><EditableField value={cvData.personalInfo?.website} onSave={(v) => updateField('personalInfo.website', v)} placeholder="Website" /></div>
          </div>
        </div>

        {/* Tiểu sử */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-3">
            <div className={`w-1 h-6 bg-${colors.accent} rounded-full`}></div>
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Tiểu sử</h2>
          </div>
          <EditableField
            value={cvData.personalInfo?.summary}
            onSave={(v) => updateField('personalInfo.summary', v)}
            placeholder="Giới thiệu về bản thân, kinh nghiệm, thành tích nổi bật..."
            multiline
            className="text-gray-700 leading-relaxed"
          />
          <div className="mt-2">
            <EditableField
              value={cvData.personalInfo?.portfolioLink}
              onSave={(v) => updateField('personalInfo.portfolioLink', v)}
              placeholder="Xem hồ sơ năng lực tại đây"
              className="text-blue-600 text-sm"
            />
          </div>
        </div>

        {/* Kinh nghiệm làm việc */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-1 h-6 bg-${colors.accent} rounded-full`}></div>
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Kinh nghiệm làm việc</h2>
            </div>
            <button
              onClick={() => {
                const newExperiences = [...(cvData.experiences || []), {
                  position: '', company: '', startDate: '', endDate: '', description: ''
                }];
                onUpdate({ ...cvData, experiences: newExperiences });
              }}
              className={`text-sm text-${colors.accent} hover:text-${colors.accent.replace('600', '700')} font-medium flex items-center space-x-1`}
            >
              <PlusIcon className="h-4 w-4" />
              <span>Thêm kinh nghiệm</span>
            </button>
          </div>
          <div className="space-y-6">
            {(cvData.experiences || []).length === 0 ? (
              <p className="text-gray-400 text-sm italic text-center py-4">Chưa có kinh nghiệm. Nhấn "+ Thêm kinh nghiệm" để thêm.</p>
            ) : (
              (cvData.experiences || []).map((exp, idx) => (
                <div key={idx} className="group relative border-l-2 border-gray-200 pl-4 pb-2">
                  <button
                    onClick={() => {
                      const newExperiences = (cvData.experiences || []).filter((_, i) => i !== idx);
                      onUpdate({ ...cvData, experiences: newExperiences });
                    }}
                    className="absolute -top-2 -right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                    <h3 className="font-semibold text-gray-800">
                      <EditableField
                        value={exp.position}
                        onSave={(v) => {
                          const newExperiences = [...(cvData.experiences || [])];
                          newExperiences[idx] = { ...exp, position: v };
                          onUpdate({ ...cvData, experiences: newExperiences });
                        }}
                        placeholder="Vị trí"
                      />
                    </h3>
                    <span className="text-sm text-gray-400">
                      <EditableField
                        value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''}
                        onSave={(v) => {
                          const [start, end] = v.split('-').map(s => s.trim());
                          const newExperiences = [...(cvData.experiences || [])];
                          newExperiences[idx] = { ...exp, startDate: start || '', endDate: end || '' };
                          onUpdate({ ...cvData, experiences: newExperiences });
                        }}
                        placeholder="Thời gian"
                      />
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    <EditableField
                      value={exp.company}
                      onSave={(v) => {
                        const newExperiences = [...(cvData.experiences || [])];
                        newExperiences[idx] = { ...exp, company: v };
                        onUpdate({ ...cvData, experiences: newExperiences });
                      }}
                      placeholder="Công ty"
                    />
                  </p>
                  <EditableField
                    value={exp.description}
                    onSave={(v) => {
                      const newExperiences = [...(cvData.experiences || [])];
                      newExperiences[idx] = { ...exp, description: v };
                      onUpdate({ ...cvData, experiences: newExperiences });
                    }}
                    placeholder="Mô tả công việc và thành tích..."
                    multiline
                    className="text-gray-600 text-sm"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kỹ năng chuyên môn */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-1 h-6 bg-${colors.accent} rounded-full`}></div>
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Kỹ năng chuyên môn</h2>
            </div>
            <button
              onClick={() => {
                const newSkills = [...(cvData.skills || []), ''];
                onUpdate({ ...cvData, skills: newSkills });
              }}
              className={`text-sm text-${colors.accent} hover:text-${colors.accent.replace('600', '700')} font-medium flex items-center space-x-1`}
            >
              <PlusIcon className="h-4 w-4" />
              <span>Thêm kỹ năng</span>
            </button>
          </div>
          <div className="space-y-2">
            {(cvData.skills || []).length === 0 ? (
              <p className="text-gray-400 text-sm italic text-center py-4">Chưa có kỹ năng. Nhấn "+ Thêm kỹ năng" để thêm.</p>
            ) : (
              (cvData.skills || []).map((skill, idx) => (
                <div key={idx} className="group flex items-center">
                  <span className="text-gray-500 mr-2">•</span>
                  <EditableField
                    value={skill}
                    onSave={(v) => {
                      const newSkills = [...(cvData.skills || [])];
                      newSkills[idx] = v;
                      onUpdate({ ...cvData, skills: newSkills });
                    }}
                    placeholder={`Kỹ năng ${idx + 1}`}
                    className="flex-1"
                  />
                  <button
                    onClick={() => {
                      const newSkills = (cvData.skills || []).filter((_, i) => i !== idx);
                      onUpdate({ ...cvData, skills: newSkills });
                    }}
                    className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Học vấn */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-1 h-6 bg-${colors.accent} rounded-full`}></div>
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Quá trình học tập</h2>
            </div>
            <button
              onClick={() => {
                const newEducations = [...(cvData.educations || []), {
                  school: '', degree: '', fieldOfStudy: '', graduationYear: '', description: ''
                }];
                onUpdate({ ...cvData, educations: newEducations });
              }}
              className={`text-sm text-${colors.accent} hover:text-${colors.accent.replace('600', '700')} font-medium flex items-center space-x-1`}
            >
              <PlusIcon className="h-4 w-4" />
              <span>Thêm học vấn</span>
            </button>
          </div>
          <div className="space-y-5">
            {(cvData.educations || []).length === 0 ? (
              <p className="text-gray-400 text-sm italic text-center py-4">Chưa có học vấn. Nhấn "+ Thêm học vấn" để thêm.</p>
            ) : (
              (cvData.educations || []).map((edu, idx) => (
                <div key={idx} className="group relative border-l-2 border-gray-200 pl-4 pb-2">
                  <button
                    onClick={() => {
                      const newEducations = (cvData.educations || []).filter((_, i) => i !== idx);
                      onUpdate({ ...cvData, educations: newEducations });
                    }}
                    className="absolute -top-2 -right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                    <h3 className="font-semibold text-gray-800">
                      <EditableField
                        value={edu.school}
                        onSave={(v) => {
                          const newEducations = [...(cvData.educations || [])];
                          newEducations[idx] = { ...edu, school: v };
                          onUpdate({ ...cvData, educations: newEducations });
                        }}
                        placeholder="Trường học"
                      />
                    </h3>
                    <span className="text-sm text-gray-400">
                      <EditableField
                        value={edu.graduationYear}
                        onSave={(v) => {
                          const newEducations = [...(cvData.educations || [])];
                          newEducations[idx] = { ...edu, graduationYear: v };
                          onUpdate({ ...cvData, educations: newEducations });
                        }}
                        placeholder="Năm tốt nghiệp"
                      />
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    <EditableField
                      value={edu.degree && edu.fieldOfStudy ? `${edu.degree} - ${edu.fieldOfStudy}` : ''}
                      onSave={(v) => {
                        const match = v.match(/^(.+?)\s*-\s*(.+)$/);
                        const newEducations = [...(cvData.educations || [])];
                        if (match) {
                          newEducations[idx] = { ...edu, degree: match[1], fieldOfStudy: match[2] };
                        } else {
                          newEducations[idx] = { ...edu, degree: v };
                        }
                        onUpdate({ ...cvData, educations: newEducations });
                      }}
                      placeholder="Bằng cấp - Chuyên ngành"
                    />
                  </p>
                  <EditableField
                    value={edu.description}
                    onSave={(v) => {
                      const newEducations = [...(cvData.educations || [])];
                      newEducations[idx] = { ...edu, description: v };
                      onUpdate({ ...cvData, educations: newEducations });
                    }}
                    placeholder="Thành tích, hoạt động nổi bật..."
                    multiline
                    className="text-gray-500 text-sm"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Nút điều hướng */}
        <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
          <button
            onClick={onBack}
            className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            ← Quay lại chọn mẫu
          </button>
          <button
            onClick={onNext}
            className={`px-6 py-2.5 bg-gradient-to-r ${colors.primary} text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-md`}
          >
            Xem trước CV →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVForm;