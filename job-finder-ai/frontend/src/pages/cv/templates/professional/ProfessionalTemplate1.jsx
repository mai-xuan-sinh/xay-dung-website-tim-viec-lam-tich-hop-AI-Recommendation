// src/pages/cv/templates/professional/ProfessionalTemplate1.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ProfessionalTemplate1 = ({ data, onUpdate }) => {
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
        {/* Header - Tên lớn + Chức danh */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 uppercase">
            <EditableField
              value={data.personalInfo?.fullName}
              onSave={(v) => updateField('personalInfo.fullName', v)}
              placeholder="ANH HUY"
              className="font-bold uppercase"
            />
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            <EditableField
              value={data.personalInfo?.title}
              onSave={(v) => updateField('personalInfo.title', v)}
              placeholder="CHUYÊN VIÊN THIẾT KẾ ĐỒ HỌA"
            />
          </p>
        </div>

        {/* Giới thiệu */}
        <div className="mb-6">
          <EditableField
            value={data.personalInfo?.summary}
            onSave={(v) => updateField('personalInfo.summary', v)}
            placeholder="Tôi là chuyên viên thiết kế đồ họa dày dặn kinh nghiệm, hiện nay là một trong những người quan trọng của Công ty. Chủ yếu là về UX (Trải nghiệm người dùng), UI (Giao diện người dùng) và Thuyết minh."
            multiline
            className="text-gray-600 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột trái */}
          <div className="space-y-6">
            {/* Thông tin liên hệ */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">THÔNG TIN LIÊN HỆ</h2>
              <div className="space-y-1 text-sm text-gray-600">
                <div><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="0123 456 789" /></div>
                <div><EditableField value={data.personalInfo?.address} onSave={(v) => updateField('personalInfo.address', v)} placeholder="123 Nguyễn Hữu Cảnh, Quận Bình Thạnh, TPHCM" /></div>
                <div><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="xinchao@trangwebhay.vn" /></div>
                <div><EditableField value={data.personalInfo?.website} onSave={(v) => updateField('personalInfo.website', v)} placeholder="www.trangwebhay.vn" /></div>
                <div><EditableField value={data.personalInfo?.linkedin} onSave={(v) => updateField('personalInfo.linkedin', v)} placeholder="Linkedin: @trangwebhay.vn" /></div>
              </div>
            </div>

            {/* Trình độ học vấn */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">TRÌNH ĐỘ HỌC VẤN</h2>
                <button onClick={addEducation} className="text-xs text-blue-600">+</button>
              </div>
              <div className="space-y-4">
                {(data.educations || []).map((edu, idx) => (
                  <div key={idx} className="group relative">
                    {idx > 0 && (
                      <button onClick={() => removeEducation(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-600">✕</button>
                    )}
                    <h3 className="font-semibold text-gray-800">
                      <EditableField value={edu.school} onSave={(v) => updateEducation(idx, 'school', v)} placeholder="Đại học Hồng Bàng" />
                    </h3>
                    <p className="text-sm text-gray-500">
                      <EditableField value={edu.degree && edu.fieldOfStudy ? `${edu.degree} - ${edu.fieldOfStudy}` : ''} onSave={(v) => updateEducation(idx, 'degree', v)} placeholder="Thạc sĩ Mỹ thuật Ứng dụng" />
                    </p>
                    <EditableField value={edu.description} onSave={(v) => updateEducation(idx, 'description', v)} placeholder="Thành tích nổi bật..." multiline className="text-gray-500 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải */}
          <div className="space-y-6">
            {/* Chuyên môn / Kỹ năng */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">CHUYÊN MÔN</h2>
                <button onClick={addSkill} className="text-xs text-blue-600">+</button>
              </div>
              <div className="space-y-2">
                {(data.skills || []).map((skill, idx) => (
                  <div key={idx} className="group flex items-center">
                    <span className="text-gray-600 mr-2">•</span>
                    <EditableField value={skill} onSave={(v) => updateSkill(idx, v)} placeholder="Kỹ năng" className="flex-1" />
                    <button onClick={() => removeSkill(idx)} className="text-red-400 hover:text-red-600">✕</button>
                  </div>
                ))}
              </div>
            </div>

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
                        <EditableField value={exp.position} onSave={(v) => updateExperience(idx, 'position', v)} placeholder="Giám Đốc Nghệ Thuật Cấp Cao" />
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
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          CV được tạo tại ĐANANG WORK
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate1;