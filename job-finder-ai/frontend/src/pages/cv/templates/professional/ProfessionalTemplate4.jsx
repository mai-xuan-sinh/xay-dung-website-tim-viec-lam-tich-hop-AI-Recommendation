// src/pages/cv/templates/professional/ProfessionalTemplate4.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ProfessionalTemplate4 = ({ data, onUpdate }) => {
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
    const newSkills = [...(data.skills || []), { name: '', description: '' }];
    onUpdate({ ...data, skills: newSkills });
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...(data.skills || [])];
    if (!newSkills[index]) newSkills[index] = {};
    newSkills[index][field] = value;
    onUpdate({ ...data, skills: newSkills });
  };

  const removeSkill = (index) => {
    const newSkills = (data.skills || []).filter((_, i) => i !== index);
    onUpdate({ ...data, skills: newSkills });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="p-8 md:p-10">
        {/* Header - Thông tin liên hệ */}
        <div className="mb-8 text-center border-b border-gray-200 pb-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-4">
            <EditableField value={data.personalInfo?.address} onSave={(v) => updateField('personalInfo.address', v)} placeholder="123 Từ Xương, Thanh Miện, Hải Dương" />
            <EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="0912 3456 8789" />
            <EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="xinchao@trangwebhay.vn" />
            <EditableField value={data.personalInfo?.website} onSave={(v) => updateField('personalInfo.website', v)} placeholder="www.trangwebhay.vn" />
            <EditableField value={data.personalInfo?.social} onSave={(v) => updateField('personalInfo.social', v)} placeholder="@trangwebhay" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            <EditableField
              value={data.personalInfo?.fullName}
              onSave={(v) => updateField('personalInfo.fullName', v)}
              placeholder="NGUYỄN LAN ANH"
              className="font-bold"
            />
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            <EditableField
              value={data.personalInfo?.title}
              onSave={(v) => updateField('personalInfo.title', v)}
              placeholder="Nhà thiết kế thời trang"
            />
          </p>
        </div>

        {/* Giới thiệu */}
        <div className="mb-6">
          <EditableField
            value={data.personalInfo?.summary}
            onSave={(v) => updateField('personalInfo.summary', v)}
            placeholder="Nhà thiết kế thời trang tài năng và sáng tạo với mong muốn đảm nhận một vị trí cấp cao nhằm chứng tỏ hiệu quả và danh tiếng. Có kinh nghiệm thiết kế thực tiễn cả hàng may mà không thể ngây mặt từ thực tập."
            multiline
            className="text-gray-600 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột trái - Kinh nghiệm */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">KINH NGHIỆM LIÊN QUAN</h2>
              <button onClick={addExperience} className="text-xs text-blue-600">+</button>
            </div>
            <div className="space-y-4">
              {(data.experiences || []).map((exp, idx) => (
                <div key={idx} className="group relative">
                  {idx > 0 && (
                    <button onClick={() => removeExperience(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-600">✕</button>
                  )}
                  <h3 className="font-semibold text-gray-800">
                    <EditableField value={exp.position} onSave={(v) => updateExperience(idx, 'position', v)} placeholder="Thực tập sinh Thiết kế Thời trang" />
                  </h3>
                  <p className="text-sm text-gray-500">
                    <EditableField value={exp.company} onSave={(v) => updateExperience(idx, 'company', v)} placeholder="Thời trang Như Ý" />
                  </p>
                  <p className="text-xs text-gray-400">
                    <EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => {
                      const [start, end] = v.split('-').map(s => s.trim());
                      if (start) updateExperience(idx, 'startDate', start);
                      if (end) updateExperience(idx, 'endDate', end);
                    }} placeholder="Tháng 3 đến Tháng 5/2025" />
                  </p>
                  <EditableField value={exp.description} onSave={(v) => updateExperience(idx, 'description', v)} placeholder="Mô tả..." multiline className="text-gray-600 text-sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Cột phải - Học vấn */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">NỀN TẢNG HỌC VẤN</h2>
              <button onClick={addEducation} className="text-xs text-blue-600">+</button>
            </div>
            <div className="space-y-4">
              {(data.educations || []).map((edu, idx) => (
                <div key={idx} className="group relative">
                  {idx > 0 && (
                    <button onClick={() => removeEducation(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-600">✕</button>
                  )}
                  <h3 className="font-semibold text-gray-800">
                    <EditableField value={edu.school} onSave={(v) => updateEducation(idx, 'school', v)} placeholder="Đại học Cửu Long" />
                  </h3>
                  <p className="text-sm text-gray-500">
                    <EditableField value={edu.degree && edu.fieldOfStudy ? `${edu.degree} - ${edu.fieldOfStudy}` : ''} onSave={(v) => updateEducation(idx, 'degree', v)} placeholder="Cử nhân Mỹ thuật - Thiết kế Thời trang" />
                  </p>
                  <p className="text-xs text-gray-400">
                    <EditableField value={edu.graduationYear} onSave={(v) => updateEducation(idx, 'graduationYear', v)} placeholder="Tháng 6/2025" />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kỹ năng chuyên môn */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">KỸ NĂNG CHUYÊN MÔN</h2>
            <button onClick={addSkill} className="text-xs text-blue-600">+</button>
          </div>
          <div className="space-y-4">
            {(data.skills || []).map((skill, idx) => (
              <div key={idx} className="group relative">
                {idx > 0 && (
                  <button onClick={() => removeSkill(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-600">✕</button>
                )}
                <h3 className="font-semibold text-gray-800">
                  <EditableField value={skill.name} onSave={(v) => updateSkill(idx, 'name', v)} placeholder="Tạo mẫu Thời trang" />
                </h3>
                <EditableField value={skill.description} onSave={(v) => updateSkill(idx, 'description', v)} placeholder="Mô tả chi tiết..." multiline className="text-gray-600 text-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Đào tạo và Hội thảo */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">ĐÀO TẠO VÀ HỘI THẢO CHUYÊN ĐỀ</h2>
          <div className="space-y-2">
            <EditableField value={data.personalInfo?.training1} onSave={(v) => updateField('personalInfo.training1', v)} placeholder="Khóa học Ngắn về Công nghệ Đột may & Tạo kiểu Thời trang (Viện Thiết kế Kim Cương Đen, Tháng 10/2019)" multiline className="text-gray-600 text-sm" />
            <EditableField value={data.personalInfo?.training2} onSave={(v) => updateField('personalInfo.training2', v)} placeholder="Trại Thiết kế Thời trang Thanh thiếu niên (Tháng 8/2019)" multiline className="text-gray-600 text-sm" />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          CV được tạo tại ĐANANG WORK
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate4;