// src/pages/cv/templates/construction/ConstructionTemplate5.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ConstructionTemplate5 = ({ data, onUpdate }) => {
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

  const addSkill = () => { onUpdate({ ...data, skills: [...(data.skills || []), { name: '', percentage: 0 }] }); };
  const updateSkill = (i, f, v) => { const s = [...(data.skills || [])]; if (!s[i]) s[i] = { name: '', percentage: 0 }; s[i][f] = v; onUpdate({ ...data, skills: s }); };
  const removeSkill = (i) => { onUpdate({ ...data, skills: (data.skills || []).filter((_, idx) => idx !== i) }); };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="p-8 border-b border-gray-200">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div><h1 className="text-4xl font-light text-gray-900 mb-1"><EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="PHẠM THỊ D" /></h1><p className="text-gray-500"><EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="ARCHITECT" /></p></div>
          <div className="text-right text-sm text-gray-500"><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="architect@email.com" /><br /><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" /></div>
        </div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div><h2 className="text-sm font-semibold uppercase text-gray-400 mb-2">ABOUT</h2><EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="Architect with 8+ years of experience in residential and commercial projects..." multiline className="text-gray-600" /></div>
          <div><h2 className="text-sm font-semibold uppercase text-gray-400 mb-2">SOFTWARE SKILLS</h2>{(data.skills || []).map((s,i)=>(<div key={i} className="mb-2"><div className="flex justify-between"><EditableField value={s.name} onSave={(v)=>updateSkill(i,'name',v)} placeholder="AutoCAD" /><span>{s.percentage || 90}%</span><button onClick={()=>removeSkill(i)} className="text-red-400 text-xs">✕</button></div><div className="h-1 bg-gray-200 rounded"><div className="h-full bg-blue-600 rounded" style={{width: `${s.percentage || 90}%`}}></div></div></div>))}<button onClick={addSkill} className="text-blue-600 text-sm">+ Add Skill</button></div>
        </div>
        <h2 className="text-sm font-semibold uppercase text-gray-400 mt-6 mb-2">PROJECTS</h2>
        {(data.experiences || []).map((exp, i) => (
          <div key={i} className="mb-4 group relative"><div className="flex justify-between"><h3 className="font-semibold"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="Lead Architect" /></h3><span className="text-sm text-gray-400"><EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="2021 - 2023" /></span></div>
          <p className="text-blue-600 text-sm"><EditableField value={exp.company} onSave={(v) => updateExperience(i, 'company', v)} placeholder="Project Name" /></p>
          <EditableField value={exp.description} onSave={(v) => updateExperience(i, 'description', v)} placeholder="Designed 25-story residential building..." multiline className="text-gray-600 text-sm" /></div>
        ))}
        <button onClick={addExperience} className="text-blue-600 text-sm">+ Add Project</button>
        <h2 className="text-sm font-semibold uppercase text-gray-400 mt-4 mb-2">EDUCATION</h2>
        {(data.educations || []).map((edu, i) => (<div key={i}><h3 className="font-semibold"><EditableField value={edu.school} onSave={(v) => updateEducation(i, 'school', v)} placeholder="University of Architecture" /></h3><p className="text-gray-500 text-sm"><EditableField value={edu.degree} onSave={(v) => updateEducation(i, 'degree', v)} placeholder="Master in Architecture" /></p></div>))}
        <button onClick={addEducation} className="text-blue-600 text-sm">+ Add Education</button>
      </div>
    </div>
  );
};

export default ConstructionTemplate5;