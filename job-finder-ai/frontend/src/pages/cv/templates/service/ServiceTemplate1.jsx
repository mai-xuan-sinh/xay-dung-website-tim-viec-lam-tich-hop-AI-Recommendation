// src/pages/cv/templates/service/ServiceTemplate1.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ServiceTemplate1 = ({ data, onUpdate }) => {
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
    const newExperiences = [...(data.experiences || []), { position: '', company: '', startDate: '', endDate: '', description: '' }];
    onUpdate({ ...data, experiences: newExperiences });
  };
  const updateExperience = (i, f, v) => { const e = [...(data.experiences || [])]; e[i] = { ...e[i], [f]: v }; onUpdate({ ...data, experiences: e }); };
  const removeExperience = (i) => { onUpdate({ ...data, experiences: (data.experiences || []).filter((_, idx) => idx !== i) }); };

  const addEducation = () => {
    const newEducations = [...(data.educations || []), { school: '', degree: '', startDate: '', endDate: '' }];
    onUpdate({ ...data, educations: newEducations });
  };
  const updateEducation = (i, f, v) => { const e = [...(data.educations || [])]; e[i] = { ...e[i], [f]: v }; onUpdate({ ...data, educations: e }); };
  const removeEducation = (i) => { onUpdate({ ...data, educations: (data.educations || []).filter((_, idx) => idx !== i) }); };

  const addSkill = () => { onUpdate({ ...data, skills: [...(data.skills || []), ''] }); };
  const updateSkill = (i, v) => { const s = [...(data.skills || [])]; s[i] = v; onUpdate({ ...data, skills: s }); };
  const removeSkill = (i) => { onUpdate({ ...data, skills: (data.skills || []).filter((_, idx) => idx !== i) }); };

  const addLanguage = () => { onUpdate({ ...data, languages: [...(data.languages || []), { name: '', level: '' }] }); };
  const updateLanguage = (i, f, v) => { const l = [...(data.languages || [])]; if (!l[i]) l[i] = {}; l[i][f] = v; onUpdate({ ...data, languages: l }); };
  const removeLanguage = (i) => { onUpdate({ ...data, languages: (data.languages || []).filter((_, idx) => idx !== i) }); };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar trái - Màu xám */}
        <div className="md:w-1/3 bg-gray-100 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            <EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="Alexander Aronowitz" />
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            <EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="Professional Graphic Designer" />
          </p>

          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">CONTACT</h2>
          <div className="space-y-2 text-sm text-gray-600 mb-6">
            <div>📞 <EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="123-456-7890" /></div>
            <div>📧 <EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="hello@reallygreatsite.com" /></div>
            <div>📍 <EditableField value={data.personalInfo?.address} onSave={(v) => updateField('personalInfo.address', v)} placeholder="123 Anywhere St., Any City" /></div>
          </div>

          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">EDUCATION</h2>
          {(data.educations || []).map((edu, i) => (
            <div key={i} className="mb-3 group relative">
              {i > 0 && <button onClick={() => removeEducation(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
              <div className="flex items-start gap-2">
                <span>🎓</span>
                <div><h3 className="font-semibold"><EditableField value={edu.school} onSave={(v) => updateEducation(i, 'school', v)} placeholder="Elementary School" /></h3>
                <p className="text-xs text-gray-500"><EditableField value={edu.startDate && edu.endDate ? `${edu.startDate} to ${edu.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('to').map(t=>t.trim()); if(s) updateEducation(i,'startDate',s); if(e) updateEducation(i,'endDate',e); }} placeholder="Apr 2016 to May 2019" /></p></div>
              </div>
            </div>
          ))}
          <button onClick={addEducation} className="text-blue-600 text-sm">+ Add Education</button>

          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mt-6 mb-3">LANGUAGE</h2>
          {(data.languages || []).map((lang, i) => (
            <div key={i} className="mb-2 group relative flex items-center gap-2">
              <span>🌐</span>
              <EditableField value={lang.name} onSave={(v) => updateLanguage(i, 'name', v)} placeholder="English" className="flex-1" />
              <EditableField value={lang.level} onSave={(v) => updateLanguage(i, 'level', v)} placeholder="Fluent" className="w-20 text-right" />
              <button onClick={() => removeLanguage(i)} className="text-red-400 text-xs">✕</button>
            </div>
          ))}
          <button onClick={addLanguage} className="text-blue-600 text-sm">+ Add Language</button>
        </div>

        {/* Nội dung chính */}
        <div className="md:w-2/3 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">ABOUT ME</h2>
          <EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="My name is Alexander Aronowitz, a professional graphic designer from California. I've worked as a designer for well over five years." multiline className="text-gray-600 mb-6" />

          <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">WORK EXPERIENCE</h2>
          {(data.experiences || []).map((exp, i) => (
            <div key={i} className="mb-4 group relative">
              {i > 0 && <button onClick={() => removeExperience(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
              <h3 className="font-semibold"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="Designer at Borcelle" /></h3>
              <p className="text-sm text-gray-500"><EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} to ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('to').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="2026 to 2027" /></p>
            </div>
          ))}
          <button onClick={addExperience} className="text-blue-600 text-sm">+ Add Experience</button>

          <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mt-6 mb-3">SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {(data.skills || []).map((skill, i) => (
              <div key={i} className="group relative bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                <EditableField value={skill} onSave={(v) => updateSkill(i, v)} placeholder="Design" />
                <button onClick={() => removeSkill(i)} className="ml-1 text-red-400 text-xs opacity-0 group-hover:opacity-100">✕</button>
              </div>
            ))}
            <button onClick={addSkill} className="text-blue-600 text-sm">+ Add Skill</button>
          </div>
        </div>
      </div>
      <div className="p-3 bg-gray-50 text-center text-xs text-gray-400">CV được tạo tại ĐANANG WORK</div>
    </div>
  );
};

export default ServiceTemplate1;