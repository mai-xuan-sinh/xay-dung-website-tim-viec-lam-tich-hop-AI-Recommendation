// src/pages/cv/templates/tourism/TourismTemplate4.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const TourismTemplate4 = ({ data, onUpdate }) => {
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

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-gradient-to-b from-emerald-700 to-green-800 text-white p-6">
          <div className="text-center mb-4">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3"><span className="text-3xl font-bold"><EditableField value={data.personalInfo?.fullName?.charAt(0)} onSave={()=>{}} placeholder="A" /></span></div>
            <h1 className="text-xl font-bold"><EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="Anna Nguyen" /></h1>
            <p className="text-emerald-200 text-sm"><EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="RESORT MANAGER" /></p>
          </div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2">CONTACT</h2>
          <div className="space-y-1 text-sm mb-4"><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" /><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="anna@resort.com" /></div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2">SKILLS</h2>
          {(data.skills || []).map((s, i) => (<div key={i} className="group relative mb-1"><div className="flex justify-between text-sm"><EditableField value={s} onSave={(v) => updateSkill(i, v)} placeholder="Skill" /><button onClick={() => removeSkill(i)} className="text-red-300 text-xs opacity-0 group-hover:opacity-100">✕</button></div><div className="h-1 bg-emerald-600 rounded"><div className="h-full bg-emerald-400 rounded" style={{width: `${Math.random() * 40 + 60}%`}}></div></div></div>))}
          <button onClick={addSkill} className="text-emerald-300 text-xs">+ Add Skill</button>
        </div>
        <div className="md:w-2/3 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-600 mb-2">PROFILE</h2>
          <EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="Experienced Resort Manager with 10+ years in luxury hospitality..." multiline className="text-gray-600 mb-4" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-600 mb-2">WORK EXPERIENCE</h2>
          {(data.experiences || []).map((exp, i) => (
            <div key={i} className="mb-3 group relative">
              {i > 0 && <button onClick={() => removeExperience(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
              <div className="flex justify-between"><h3 className="font-semibold"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="Position" /></h3>
              <span className="text-xs text-gray-400"><EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="2018 - Present" /></span></div>
              <p className="text-emerald-600 text-sm"><EditableField value={exp.company} onSave={(v) => updateExperience(i, 'company', v)} placeholder="Company" /></p>
              <EditableField value={exp.description} onSave={(v) => updateExperience(i, 'description', v)} placeholder="Description..." multiline className="text-gray-600 text-sm" />
            </div>
          ))}
          <button onClick={addExperience} className="text-emerald-600 text-sm">+ Add Experience</button>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-600 mt-4 mb-2">EDUCATION</h2>
          {(data.educations || []).map((edu, i) => (
            <div key={i} className="mb-2 group relative">
              {i > 0 && <button onClick={() => removeEducation(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
              <h3 className="font-semibold"><EditableField value={edu.school} onSave={(v) => updateEducation(i, 'school', v)} placeholder="University" /></h3>
              <p className="text-sm text-gray-500"><EditableField value={edu.degree} onSave={(v) => updateEducation(i, 'degree', v)} placeholder="Degree" /></p>
            </div>
          ))}
          <button onClick={addEducation} className="text-emerald-600 text-sm">+ Add Education</button>
        </div>
      </div>
      <div className="p-3 bg-gray-50 text-center text-xs text-gray-400">CV được tạo tại ĐANANG WORK</div>
    </div>
  );
};

export default TourismTemplate4;