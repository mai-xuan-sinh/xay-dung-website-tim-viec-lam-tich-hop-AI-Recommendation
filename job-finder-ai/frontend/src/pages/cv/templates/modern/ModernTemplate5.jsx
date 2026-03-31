// src/pages/cv/templates/modern/ModernTemplate5.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ModernTemplate5 = ({ data, onUpdate }) => {
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
        {/* Header - Tên và chức danh */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            <EditableField
              value={data.personalInfo?.fullName}
              onSave={(v) => updateField('personalInfo.fullName', v)}
              placeholder="ĐÀO MỸ NGA"
              className="font-bold"
            />
          </h1>
          <p className="text-lg text-gray-500">
            <EditableField
              value={data.personalInfo?.title}
              onSave={(v) => updateField('personalInfo.title', v)}
              placeholder="Giám đốc Truyền thông Mạng xã hội"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột trái */}
          <div className="space-y-6">
            {/* Lý lịch cá nhân */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">LÝ LỊCH CÁ NHÂN</h2>
              <EditableField
                value={data.personalInfo?.summary}
                onSave={(v) => updateField('personalInfo.summary', v)}
                placeholder="Tôi là một chuyên gia về kỹ thuật số và truyền thông..."
                multiline
                className="text-gray-600 leading-relaxed"
              />
            </div>

            {/* Thành tích */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">THÀNH TÍCH</h2>
              <div className="space-y-2">
                <EditableField
                  value={data.personalInfo?.achievement1}
                  onSave={(v) => updateField('personalInfo.achievement1', v)}
                  placeholder="• Viết trong những trường hợp không chỉ làm tài trợ..."
                  multiline
                  className="text-gray-600 text-sm"
                />
                <EditableField
                  value={data.personalInfo?.achievement2}
                  onSave={(v) => updateField('personalInfo.achievement2', v)}
                  placeholder="• Hỗ trợ các tài khoản công ty được chúng tôi hỗ trợ..."
                  multiline
                  className="text-gray-600 text-sm"
                />
                <EditableField
                  value={data.personalInfo?.achievement3}
                  onSave={(v) => updateField('personalInfo.achievement3', v)}
                  placeholder="• Duy trì tỷ lệ phân bổ 100% một tháng..."
                  multiline
                  className="text-gray-600 text-sm"
                />
              </div>
            </div>

            {/* Thông tin liên hệ */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">THÔNG TIN LIÊN HỆ</h2>
              <div className="space-y-1 text-sm text-gray-600">
                <div><EditableField value={data.personalInfo?.officePhone} onSave={(v) => updateField('personalInfo.officePhone', v)} placeholder="Nhà máy: 024-45 567 890" /></div>
                <div><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="Điện thoại: 0123 456 789" /></div>
                <div><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="Email: contact@trungtruyen.com" /></div>
                <div><EditableField value={data.personalInfo?.website} onSave={(v) => updateField('personalInfo.website', v)} placeholder="Website: www.trungtruyen.com" /></div>
                <div><EditableField value={data.personalInfo?.facebook} onSave={(v) => updateField('personalInfo.facebook', v)} placeholder="Facebook: @trungtruyen" /></div>
              </div>
            </div>
          </div>

          {/* Cột phải */}
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
                    <div className="flex justify-between items-baseline mb-1">
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
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-gray-800">
                        <EditableField value={edu.school} onSave={(v) => updateEducation(idx, 'school', v)} placeholder="Trường học" />
                      </h3>
                      <span className="text-xs text-gray-400">
                        <EditableField value={edu.graduationYear} onSave={(v) => updateEducation(idx, 'graduationYear', v)} placeholder="Năm" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      <EditableField value={edu.degree && edu.fieldOfStudy ? `${edu.degree} - ${edu.fieldOfStudy}` : ''} onSave={(v) => {
                        const match = v.match(/^(.+?)\s*-\s*(.+)$/);
                        if (match) { updateEducation(idx, 'degree', match[1]); updateEducation(idx, 'fieldOfStudy', match[2]); }
                        else { updateEducation(idx, 'degree', v); }
                      }} placeholder="Bằng cấp - Chuyên ngành" />
                    </p>
                    <EditableField value={edu.description} onSave={(v) => updateEducation(idx, 'description', v)} placeholder="Thành tích nổi bật..." multiline className="text-gray-500 text-sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Kỹ năng */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">KỸ NĂNG</h2>
              <div className="space-y-1">
                {(data.skills || []).map((skill, idx) => (
                  <div key={idx} className="group flex items-center">
                    <span className="text-gray-600 mr-2">•</span>
                    <EditableField value={skill} onSave={(v) => updateSkill(idx, v)} placeholder={`Kỹ năng ${idx + 1}`} className="flex-1" />
                    <button onClick={() => removeSkill(idx)} className="text-red-400 hover:text-red-600">✕</button>
                  </div>
                ))}
                <button onClick={addSkill} className="text-blue-600 text-sm">+ Thêm kỹ năng</button>
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

export default ModernTemplate5;