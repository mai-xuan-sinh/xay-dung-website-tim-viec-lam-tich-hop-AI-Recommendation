// src/pages/cv/templates/business/BusinessTemplate3.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const BusinessTemplate3 = ({ data, onUpdate }) => {
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
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white text-center">
        <h1 className="text-3xl font-bold mb-1"><EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="TRẦN THỊ B" /></h1>
        <p className="text-purple-200"><EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="MARKETING DIRECTOR" /></p>
        <div className="flex justify-center gap-4 mt-2 text-sm"><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="email@company.com" /> | <EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" /></div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div><h2 className="text-sm font-semibold text-purple-600 mb-2">ABOUT</h2><EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="Marketing Director with 10+ years of experience..." multiline className="text-gray-600 text-sm" /></div>
          <div><h2 className="text-sm font-semibold text-purple-600 mb-2">SKILLS</h2><div className="flex flex-wrap gap-2">{(data.skills || []).map((s,i)=>(<div key={i} className="group"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm"><EditableField value={s} onSave={(v)=>updateSkill(i,v)} placeholder="Skill" /></span><button onClick={()=>removeSkill(i)} className="ml-1 text-red-400 text-xs">✕</button></div>))}<button onClick={addSkill} className="text-purple-600 text-sm">+</button></div></div>
          <div><h2 className="text-sm font-semibold text-purple-600 mb-2">LANGUAGES</h2><EditableField value={data.personalInfo?.lang1} onSave={(v) => updateField('personalInfo.lang1', v)} placeholder="English - Fluent" /><EditableField value={data.personalInfo?.lang2} onSave={(v) => updateField('personalInfo.lang2', v)} placeholder="Korean - Intermediate" /></div>
        </div>
        <h2 className="text-sm font-semibold text-purple-600 mt-6 mb-2">WORK EXPERIENCE</h2>
        {(data.experiences || []).map((exp, i) => (
          <div key={i} className="mb-4 group relative"><h3 className="font-semibold"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="Position" /></h3><p className="text-purple-600 text-sm"><EditableField value={exp.company} onSave={(v) => updateExperience(i, 'company', v)} placeholder="Company" /> | <EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="2020 - Present" /></p><EditableField value={exp.description} onSave={(v) => updateExperience(i, 'description', v)} placeholder="Description..." multiline className="text-gray-600 text-sm" /></div>
        ))}
        <button onClick={addExperience} className="text-purple-600 text-sm">+ Add Experience</button>
        <h2 className="text-sm font-semibold text-purple-600 mt-4 mb-2">EDUCATION</h2>
        {(data.educations || []).map((edu, i) => (<div key={i}><h3 className="font-semibold"><EditableField value={edu.school} onSave={(v) => updateEducation(i, 'school', v)} placeholder="University" /></h3><p className="text-gray-500 text-sm"><EditableField value={edu.degree} onSave={(v) => updateEducation(i, 'degree', v)} placeholder="Degree" /></p></div>))}
        <button onClick={addEducation} className="text-purple-600 text-sm">+ Add Education</button>
      </div>
    </div>
  );
};

export default BusinessTemplate3;