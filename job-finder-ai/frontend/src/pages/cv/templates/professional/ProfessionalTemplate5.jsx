// src/pages/cv/templates/professional/ProfessionalTemplate5.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ProfessionalTemplate5 = ({ data, onUpdate }) => {
  const updateField = (path, value) => {
    const newData = { ...data };
    const keys = path.split('.');
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onUpdate(newData);
  };

  const addExperience = () => {
    const newExperiences = [...(data.experiences || []), {
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    }];
    onUpdate({ ...data, experiences: newExperiences });
  };

  const updateExperience = (index, field, value) => {
    const newExperiences = [...(data.experiences || [])];
    if (!newExperiences[index]) newExperiences[index] = {};
    newExperiences[index][field] = value;
    onUpdate({ ...data, experiences: newExperiences });
  };

  const removeExperience = (index) => {
    const newExperiences = (data.experiences || []).filter((_, i) => i !== index);
    onUpdate({ ...data, experiences: newExperiences });
  };

  const addEducation = () => {
    const newEducations = [...(data.educations || []), {
      school: '',
      degree: '',
      fieldOfStudy: '',
      graduationYear: '',
      description: ''
    }];
    onUpdate({ ...data, educations: newEducations });
  };

  const updateEducation = (index, field, value) => {
    const newEducations = [...(data.educations || [])];
    if (!newEducations[index]) newEducations[index] = {};
    newEducations[index][field] = value;
    onUpdate({ ...data, educations: newEducations });
  };

  const removeEducation = (index) => {
    const newEducations = (data.educations || []).filter((_, i) => i !== index);
    onUpdate({ ...data, educations: newEducations });
  };

  const addSkill = () => {
    const newSkills = [...(data.skills || []), ''];
    onUpdate({ ...data, skills: newSkills });
  };

  const updateSkill = (index, value) => {
    const newSkills = [...(data.skills || [])];
    newSkills[index] = value;
    onUpdate({ ...data, skills: newSkills });
  };

  const removeSkill = (index) => {
    const newSkills = (data.skills || []).filter((_, i) => i !== index);
    onUpdate({ ...data, skills: newSkills });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="p-8 md:p-10">
        {/* Header - Tên + Chức danh + Thông tin liên hệ */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
            <EditableField
              value={data.personalInfo?.fullName}
              onSave={(v) => updateField('personalInfo.fullName', v)}
              placeholder="NGUYỄN VĂN A"
              className="font-bold"
            />
          </h1>
          <p className="text-lg text-gray-500 mb-4">
            <EditableField
              value={data.personalInfo?.title}
              onSave={(v) => updateField('personalInfo.title', v)}
              placeholder="Chuyên viên cao cấp"
            />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 border-t border-gray-200 pt-4">
            <div><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="Email: example@email.com" /></div>
            <div><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="Điện thoại: 0123 456 789" /></div>
            <div><EditableField value={data.personalInfo?.address} onSave={(v) => updateField('personalInfo.address', v)} placeholder="Địa chỉ: 123 Đường ABC, Quận XYZ" /></div>
            <div><EditableField value={data.personalInfo?.website} onSave={(v) => updateField('personalInfo.website', v)} placeholder="Website: www.example.com" /></div>
          </div>
        </div>

        {/* Giới thiệu */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">GIỚI THIỆU</h2>
          <EditableField
            value={data.personalInfo?.summary}
            onSave={(v) => updateField('personalInfo.summary', v)}
            placeholder="Giới thiệu về bản thân, kinh nghiệm, mục tiêu nghề nghiệp..."
            multiline
            className="text-gray-600 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột trái */}
          <div className="space-y-6">
            {/* Kinh nghiệm làm việc */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">KINH NGHIỆM LÀM VIỆC</h2>
                <button onClick={addExperience} className="text-xs text-blue-600">+</button>
              </div>
              <div className="space-y-4">
                {(data.experiences || []).map((exp, idx) => (
                  <div key={idx} className="group relative">
                    {idx > 0 && (
                      <button onClick={() => removeExperience(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-600">✕</button>
                    )}
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-gray-800">
                        <EditableField value={exp.position} onSave={(v) => updateExperience(idx, 'position', v)} placeholder="Vị trí" />
                      </h3>
                      <span className="text-xs text-gray-400">
                        <EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => {
                          const [start, end] = v.split('-').map(s => s.trim());
                          if (start) updateExperience(idx, 'startDate', start);
                          if (end) updateExperience(idx, 'endDate', end);
                        }} placeholder="Thời gian" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      <EditableField value={exp.company} onSave={(v) => updateExperience(idx, 'company', v)} placeholder="Công ty" />
                    </p>
                    <EditableField value={exp.description} onSave={(v) => updateExperience(idx, 'description', v)} placeholder="Mô tả công việc..." multiline className="text-gray-600 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải */}
          <div className="space-y-6">
            {/* Học vấn */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">HỌC VẤN</h2>
                <button onClick={addEducation} className="text-xs text-blue-600">+</button>
              </div>
              <div className="space-y-4">
                {(data.educations || []).map((edu, idx) => (
                  <div key={idx} className="group relative">
                    {idx > 0 && (
                      <button onClick={() => removeEducation(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-600">✕</button>
                    )}
                    <h3 className="font-semibold text-gray-800">
                      <EditableField value={edu.school} onSave={(v) => updateEducation(idx, 'school', v)} placeholder="Trường học" />
                    </h3>
                    <p className="text-sm text-gray-500">
                      <EditableField value={edu.degree && edu.fieldOfStudy ? `${edu.degree} - ${edu.fieldOfStudy}` : ''} onSave={(v) => updateEducation(idx, 'degree', v)} placeholder="Bằng cấp - Chuyên ngành" />
                    </p>
                    <p className="text-xs text-gray-400">
                      <EditableField value={edu.graduationYear} onSave={(v) => updateEducation(idx, 'graduationYear', v)} placeholder="Năm tốt nghiệp" />
                    </p>
                    <EditableField value={edu.description} onSave={(v) => updateEducation(idx, 'description', v)} placeholder="Thành tích..." multiline className="text-gray-500 text-sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Kỹ năng */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">KỸ NĂNG</h2>
                <button onClick={addSkill} className="text-xs text-blue-600">+</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(data.skills || []).map((skill, idx) => (
                  <div key={idx} className="group relative">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      <EditableField value={skill} onSave={(v) => updateSkill(idx, v)} placeholder={`Kỹ năng ${idx + 1}`} />
                    </span>
                    <button onClick={() => removeSkill(idx)} className="ml-1 text-red-400 hover:text-red-600">✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          CV được tạo tại ĐANANG WORK - Tìm việc thông minh tại Đà Nẵng
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate5;