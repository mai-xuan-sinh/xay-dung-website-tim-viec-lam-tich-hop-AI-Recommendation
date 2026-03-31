// src/pages/cv/templates/construction/ConstructionTemplate1.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ConstructionTemplate1 = ({ data, onUpdate }) => {
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
  const updateExperience = (i, f, v) => { const e = [...(data.experiences || [])]; e[i] = { ...e[i], [f]: v }; onUpdate({ ...data, experiences: e }); };
  const removeExperience = (i) => { onUpdate({ ...data, experiences: (data.experiences || []).filter((_, idx) => idx !== i) }); };

  const addEducation = () => {
    const newEducations = [...(data.educations || []), { school: '', degree: '', startDate: '', endDate: '', description: '' }];
    onUpdate({ ...data, educations: newEducations });
  };
  const updateEducation = (i, f, v) => { const e = [...(data.educations || [])]; e[i] = { ...e[i], [f]: v }; onUpdate({ ...data, educations: e }); };
  const removeEducation = (i) => { onUpdate({ ...data, educations: (data.educations || []).filter((_, idx) => idx !== i) }); };

  const addSkill = () => { onUpdate({ ...data, skills: [...(data.skills || []), ''] }); };
  const updateSkill = (i, v) => { const s = [...(data.skills || [])]; s[i] = v; onUpdate({ ...data, skills: s }); };
  const removeSkill = (i) => { onUpdate({ ...data, skills: (data.skills || []).filter((_, idx) => idx !== i) }); };

  const addAward = () => { onUpdate({ ...data, awards: [...(data.awards || []), { title: '', year: '', description: '' }] }); };
  const updateAward = (i, f, v) => { const a = [...(data.awards || [])]; if (!a[i]) a[i] = {}; a[i][f] = v; onUpdate({ ...data, awards: a }); };
  const removeAward = (i) => { onUpdate({ ...data, awards: (data.awards || []).filter((_, idx) => idx !== i) }); };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="p-8">
        {/* Header */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            <EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="Minh Chương" className="font-bold" />
          </h1>
          <div className="flex gap-2">
            <p className="text-gray-500 uppercase tracking-wide"><EditableField value={data.personalInfo?.title1} onSave={(v) => updateField('personalInfo.title1', v)} placeholder="SÁNG TẠO" /></p>
            <span className="text-gray-300">|</span>
            <p className="text-gray-500 uppercase tracking-wide"><EditableField value={data.personalInfo?.title2} onSave={(v) => updateField('personalInfo.title2', v)} placeholder="CHUYÊN VIÊN" /></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột trái */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-2">LỊCH SỬ CÁ NHÂN</h2>
            <EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="Tôi là giám đốc sáng tạo, và đã dẫn dắt một đội ngũ sáng tạo trong hơn ba năm. Tôi chuyên đưa ra ý tưởng mới nhất cho các chiến dịch." multiline className="text-gray-600 mb-4" />

            <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-2">KỸ NĂNG & NĂNG LỰC</h2>
            <ul className="space-y-2 mb-4">
              {(data.skills || []).map((skill, i) => (
                <li key={i} className="group relative flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <EditableField value={skill} onSave={(v) => updateSkill(i, v)} placeholder="Kỹ năng" className="flex-1" />
                  <button onClick={() => removeSkill(i)} className="text-red-400 text-xs opacity-0 group-hover:opacity-100">✕</button>
                </li>
              ))}
              <button onClick={addSkill} className="text-orange-600 text-sm">+ Thêm kỹ năng</button>
            </ul>

            <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-2">THÔNG TIN LIÊN HỆ</h2>
            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <div><EditableField value={data.personalInfo?.address} onSave={(v) => updateField('personalInfo.address', v)} placeholder="Địa chỉ: 123 Nguyễn Trãi, TP.HCM" /></div>
              <div><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="Điện thoại: 0912 345 678" /></div>
              <div><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="Email: xinchao@trangwebhay.vn" /></div>
              <div><EditableField value={data.personalInfo?.website} onSave={(v) => updateField('personalInfo.website', v)} placeholder="Website: www.trangwebhay.vn" /></div>
            </div>
          </div>

          {/* Cột phải */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-2">GIẢI THƯỞNG & THÀNH TÍCH</h2>
            {(data.awards || []).map((award, i) => (
              <div key={i} className="mb-3 group relative">
                {i > 0 && <button onClick={() => removeAward(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
                <h3 className="font-semibold text-gray-800"><EditableField value={award.title} onSave={(v) => updateAward(i, 'title', v)} placeholder="Giải thưởng" /></h3>
                <p className="text-sm text-gray-500"><EditableField value={award.year} onSave={(v) => updateAward(i, 'year', v)} placeholder="Năm" /></p>
                <EditableField value={award.description} onSave={(v) => updateAward(i, 'description', v)} placeholder="Mô tả..." multiline className="text-gray-600 text-sm" />
              </div>
            ))}
            <button onClick={addAward} className="text-orange-600 text-sm mb-4">+ Thêm giải thưởng</button>

            <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-2">KINH NGHIỆM LÀM VIỆC</h2>
            {(data.experiences || []).map((exp, i) => (
              <div key={i} className="mb-4 group relative">
                {i > 0 && <button onClick={() => removeExperience(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
                <div className="flex justify-between"><h3 className="font-semibold text-gray-800"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="GIÁM ĐỐC SÁNG TẠO" /></h3><span className="text-sm text-gray-400"><EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="Tháng 4/2020 - nay" /></span></div>
                <p className="text-orange-600 text-sm"><EditableField value={exp.company} onSave={(v) => updateExperience(i, 'company', v)} placeholder="Truyền Thông Khang" /></p>
                <EditableField value={exp.description} onSave={(v) => updateExperience(i, 'description', v)} placeholder="Mô tả công việc..." multiline className="text-gray-600 text-sm" />
              </div>
            ))}
            <button onClick={addExperience} className="text-orange-600 text-sm mb-4">+ Thêm kinh nghiệm</button>

            <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-2">HỌC VẤN & ĐÀO TẠO</h2>
            {(data.educations || []).map((edu, i) => (
              <div key={i} className="mb-3 group relative">
                {i > 0 && <button onClick={() => removeEducation(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
                <h3 className="font-semibold text-gray-800"><EditableField value={edu.school} onSave={(v) => updateEducation(i, 'school', v)} placeholder="ĐẠI HỌC HOA SEN" /></h3>
                <p className="text-sm text-gray-500"><EditableField value={edu.degree} onSave={(v) => updateEducation(i, 'degree', v)} placeholder="Thạc sĩ Truyền thông" /> | <EditableField value={edu.graduationYear} onSave={(v) => updateEducation(i, 'graduationYear', v)} placeholder="Tốt nghiệp 3/2015" /></p>
                <EditableField value={edu.description} onSave={(v) => updateEducation(i, 'description', v)} placeholder="Thành tích..." multiline className="text-gray-500 text-sm" />
              </div>
            ))}
            <button onClick={addEducation} className="text-orange-600 text-sm">+ Thêm học vấn</button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t text-center text-xs text-gray-400">CV được tạo tại ĐANANG WORK</div>
      </div>
    </div>
  );
};

export default ConstructionTemplate1;