// src/pages/cv/templates/service/ServiceTemplate5.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ServiceTemplate5 = ({ data, onUpdate }) => {
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

  const addSkill = () => { onUpdate({ ...data, skills: [...(data.skills || []), ''] }); };
  const updateSkill = (i, v) => { const s = [...(data.skills || [])]; s[i] = v; onUpdate({ ...data, skills: s }); };
  const removeSkill = (i) => { onUpdate({ ...data, skills: (data.skills || []).filter((_, idx) => idx !== i) }); };

  const addLanguage = () => { onUpdate({ ...data, languages: [...(data.languages || []), { name: '', level: '' }] }); };
  const updateLanguage = (i, f, v) => { const l = [...(data.languages || [])]; if (!l[i]) l[i] = {}; l[i][f] = v; onUpdate({ ...data, languages: l }); };
  const removeLanguage = (i) => { onUpdate({ ...data, languages: (data.languages || []).filter((_, idx) => idx !== i) }); };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="p-8 border-b border-gray-200">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div><h1 className="text-4xl font-light text-gray-900 mb-1"><EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="PHẠM THỊ D" /></h1><p className="text-gray-500"><EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="FRONT DESK MANAGER" /></p></div>
          <div className="text-right text-sm text-gray-500"><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="frontdesk@hotel.com" /><br /><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" /></div>
        </div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div><h2 className="text-sm font-semibold uppercase text-gray-400 mb-2">ABOUT</h2><EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="Front Desk Manager with 5+ years of experience in 5-star hotels..." multiline className="text-gray-600" /></div>
          <div><h2 className="text-sm font-semibold uppercase text-gray-400 mb-2">LANGUAGES</h2>{(data.languages || []).map((lang,i)=>(<div key={i} className="flex justify-between"><EditableField value={lang.name} onSave={(v)=>updateLanguage(i,'name',v)} placeholder="English" /> <EditableField value={lang.level} onSave={(v)=>updateLanguage(i,'level',v)} placeholder="Fluent" /><button onClick={()=>removeLanguage(i)} className="text-red-400">✕</button></div>))}<button onClick={addLanguage} className="text-blue-600 text-sm">+ Add</button></div>
        </div>
        <h2 className="text-sm font-semibold uppercase text-gray-400 mt-6 mb-2">WORK EXPERIENCE</h2>
        {(data.experiences || []).map((exp, i) => (
          <div key={i} className="mb-4 group relative"><div className="flex justify-between"><h3 className="font-semibold"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="Front Desk Supervisor" /></h3><span className="text-xs text-gray-400"><EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="2021 - Present" /></span></div>
          <p className="text-blue-600 text-sm"><EditableField value={exp.company} onSave={(v) => updateExperience(i, 'company', v)} placeholder="Luxury Hotel" /></p>
          <EditableField value={exp.description} onSave={(v) => updateExperience(i, 'description', v)} placeholder="Managed front desk operations for 300+ rooms..." multiline className="text-gray-600 text-sm" /></div>
        ))}
        <button onClick={addExperience} className="text-blue-600 text-sm">+ Add Experience</button>
        <h2 className="text-sm font-semibold uppercase text-gray-400 mt-4 mb-2">SKILLS</h2>
        <div className="flex flex-wrap gap-2">{(data.skills || []).map((s,i)=>(<div key={i} className="group bg-gray-100 px-3 py-1 rounded-full"><EditableField value={s} onSave={(v)=>updateSkill(i,v)} placeholder="Communication" /><button onClick={()=>removeSkill(i)} className="ml-1 text-red-400">✕</button></div>))}<button onClick={addSkill} className="text-blue-600 text-sm">+</button></div>
      </div>
    </div>
  );
};

export default ServiceTemplate5;