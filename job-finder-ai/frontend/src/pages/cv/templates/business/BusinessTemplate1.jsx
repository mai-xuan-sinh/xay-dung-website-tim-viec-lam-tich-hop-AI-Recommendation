// src/pages/cv/templates/business/BusinessTemplate1.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const BusinessTemplate1 = ({ data, onUpdate }) => {
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
      position: '', company: '', startDate: '', endDate: '', description: ''
    }];
    onUpdate({ ...data, experiences: newExperiences });
  };

  const updateExperience = (i, f, v) => {
    const e = [...(data.experiences || [])];
    e[i] = { ...e[i], [f]: v };
    onUpdate({ ...data, experiences: e });
  };

  const removeExperience = (i) => {
    onUpdate({ ...data, experiences: (data.experiences || []).filter((_, idx) => idx !== i) });
  };

  const addEducation = () => {
    const newEducations = [...(data.educations || []), {
      school: '', degree: '', startDate: '', endDate: '', description: ''
    }];
    onUpdate({ ...data, educations: newEducations });
  };

  const updateEducation = (i, f, v) => {
    const e = [...(data.educations || [])];
    e[i] = { ...e[i], [f]: v };
    onUpdate({ ...data, educations: e });
  };

  const removeEducation = (i) => {
    onUpdate({ ...data, educations: (data.educations || []).filter((_, idx) => idx !== i) });
  };

  const addSkill = () => {
    const newSkills = [...(data.skills || []), { name: '', percentage: 0 }];
    onUpdate({ ...data, skills: newSkills });
  };

  const updateSkill = (i, field, v) => {
    const s = [...(data.skills || [])];
    if (!s[i]) s[i] = { name: '', percentage: 0 };
    s[i][field] = v;
    onUpdate({ ...data, skills: s });
  };

  const removeSkill = (i) => {
    onUpdate({ ...data, skills: (data.skills || []).filter((_, idx) => idx !== i) });
  };

  const addHobby = () => {
    const newHobbies = [...(data.hobbies || []), ''];
    onUpdate({ ...data, hobbies: newHobbies });
  };

  const updateHobby = (i, v) => {
    const h = [...(data.hobbies || [])];
    h[i] = v;
    onUpdate({ ...data, hobbies: h });
  };

  const removeHobby = (i) => {
    onUpdate({ ...data, hobbies: (data.hobbies || []).filter((_, idx) => idx !== i) });
  };

  const addAward = () => {
    const newAwards = [...(data.awards || []), { title: '', description: '' }];
    onUpdate({ ...data, awards: newAwards });
  };

  const updateAward = (i, field, v) => {
    const a = [...(data.awards || [])];
    if (!a[i]) a[i] = { title: '', description: '' };
    a[i][field] = v;
    onUpdate({ ...data, awards: a });
  };

  const removeAward = (i) => {
    onUpdate({ ...data, awards: (data.awards || []).filter((_, idx) => idx !== i) });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="p-8">
        {/* Header - Tên và chức danh */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            <EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="HOÀNG THÁI TUYỂN" className="font-bold" />
          </h1>
          <p className="text-gray-500">
            <EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="TRƯỞNG NHÓM SÁNG TẠO" />
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8 pb-4 border-b border-gray-200">
          <div><EditableField value={data.personalInfo?.address} onSave={(v) => updateField('personalInfo.address', v)} placeholder="Địa chỉ: Cầu Giấy, Hà Nội" /></div>
          <div><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="Điện thoại: 0972 567 891" /></div>
          <div><EditableField value={data.personalInfo?.website} onSave={(v) => updateField('personalInfo.website', v)} placeholder="Trang web: trongwebhay.com" /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột trái - Kinh nghiệm */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">LÀM VIỆC</h2>
            {(data.experiences || []).map((exp, i) => (
              <div key={i} className="mb-4 group relative">
                {i > 0 && <button onClick={() => removeExperience(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
                <div className="flex justify-between"><span className="font-semibold text-gray-800"><EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="2020 - 2023" /></span></div>
                <h3 className="font-bold text-gray-800"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="Trưởng nhóm sáng tạo" /></h3>
                <p className="text-sm text-gray-500 mb-1"><EditableField value={exp.company} onSave={(v) => updateExperience(i, 'company', v)} placeholder="Urban Agency" /></p>
                <EditableField value={exp.description} onSave={(v) => updateExperience(i, 'description', v)} placeholder="Lãnh đạo toàn bộ đội ngũ sáng tạo của công ty" multiline className="text-gray-600 text-sm" />
              </div>
            ))}
            <button onClick={addExperience} className="text-blue-600 text-sm">+ Thêm kinh nghiệm</button>
          </div>

          {/* Cột phải - Học vấn, Kỹ năng, Sở thích, Giải thưởng */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">HỌC VẤN</h2>
            {(data.educations || []).map((edu, i) => (
              <div key={i} className="mb-3 group relative">
                {i > 0 && <button onClick={() => removeEducation(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
                <div className="flex justify-between"><span className="text-sm text-gray-500"><EditableField value={edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateEducation(i,'startDate',s); if(e) updateEducation(i,'endDate',e); }} placeholder="2018 - 2020" /></span></div>
                <h3 className="font-semibold"><EditableField value={edu.school} onSave={(v) => updateEducation(i, 'school', v)} placeholder="Đại học Hồng Bàng" /></h3>
                <p className="text-sm text-gray-500"><EditableField value={edu.degree} onSave={(v) => updateEducation(i, 'degree', v)} placeholder="Cử nhân Mỹ thuật" /></p>
              </div>
            ))}
            <button onClick={addEducation} className="text-blue-600 text-sm mb-4">+ Thêm học vấn</button>

            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">KỸ NĂNG</h2>
            {(data.skills || []).map((skill, i) => (
              <div key={i} className="mb-3 group relative">
                {i > 0 && <button onClick={() => removeSkill(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700"><EditableField value={skill.name} onSave={(v) => updateSkill(i, 'name', v)} placeholder="Thiền hướng sáng tạo" /></span>
                  <span className="text-sm font-semibold text-blue-600"><EditableField value={skill.percentage ? `${skill.percentage}%` : ''} onSave={(v) => { const num = parseInt(v); updateSkill(i, 'percentage', isNaN(num) ? 0 : Math.min(100, Math.max(0, num))); }} placeholder="95%" /></span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full mt-1"><div className="h-full bg-blue-600 rounded-full" style={{ width: `${skill.percentage || 95}%` }}></div></div>
              </div>
            ))}
            <button onClick={addSkill} className="text-blue-600 text-sm mb-4">+ Thêm kỹ năng</button>

            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">SỞ THÍCH</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {(data.hobbies || []).map((hobby, i) => (
                <div key={i} className="group relative bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <EditableField value={hobby} onSave={(v) => updateHobby(i, v)} placeholder="Đọc sách" />
                  <button onClick={() => removeHobby(i)} className="ml-1 text-red-400 text-xs opacity-0 group-hover:opacity-100">✕</button>
                </div>
              ))}
              <button onClick={addHobby} className="text-blue-600 text-sm">+ Thêm</button>
            </div>

            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">GIẢI THƯỞNG</h2>
            {(data.awards || []).map((award, i) => (
              <div key={i} className="mb-3 group relative">
                {i > 0 && <button onClick={() => removeAward(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
                <h3 className="font-semibold text-gray-800"><EditableField value={award.title} onSave={(v) => updateAward(i, 'title', v)} placeholder="Giải thưởng" /></h3>
                <EditableField value={award.description} onSave={(v) => updateAward(i, 'description', v)} placeholder="Mô tả giải thưởng..." multiline className="text-gray-600 text-sm" />
              </div>
            ))}
            <button onClick={addAward} className="text-blue-600 text-sm">+ Thêm giải thưởng</button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t text-center text-xs text-gray-400">CV được tạo tại ĐANANG WORK</div>
      </div>
    </div>
  );
};

export default BusinessTemplate1;