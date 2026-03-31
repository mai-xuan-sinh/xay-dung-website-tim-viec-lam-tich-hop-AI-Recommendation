// src/pages/cv/templates/service/ServiceTemplate2.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ServiceTemplate2 = ({ data, onUpdate }) => {
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
    const newExperiences = [...(data.experiences || []), { position: '', company: '', startDate: '', endDate: '', description: '', achievement: '' }];
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
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6">
          <h1 className="text-2xl font-bold mb-1"><EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="NGUYỄN THỊ A" /></h1>
          <p className="text-blue-200 text-sm mb-6"><EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="CUSTOMER SERVICE SPECIALIST" /></p>
          <h2 className="text-xs font-semibold uppercase text-blue-300 mb-2">CONTACT</h2>
          <div className="space-y-1 text-sm mb-6"><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" /><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="service@email.com" /></div>
          <h2 className="text-xs font-semibold uppercase text-blue-300 mb-2">LANGUAGES</h2>
          {(data.languages || []).map((lang, i) => (<div key={i} className="flex justify-between text-sm mb-1"><EditableField value={lang.name} onSave={(v) => updateLanguage(i, 'name', v)} placeholder="English" /> <EditableField value={lang.level} onSave={(v) => updateLanguage(i, 'level', v)} placeholder="Fluent" /></div>))}
          <button onClick={addLanguage} className="text-blue-300 text-xs">+ Add Language</button>
          <h2 className="text-xs font-semibold uppercase text-blue-300 mt-4 mb-2">SKILLS</h2>
          {(data.skills || []).map((s, i) => (<div key={i} className="group"><div className="flex justify-between"><EditableField value={s} onSave={(v) => updateSkill(i, v)} placeholder="Communication" /><button onClick={()=>removeSkill(i)} className="text-red-300 text-xs">✕</button></div></div>))}
          <button onClick={addSkill} className="text-blue-300 text-xs">+ Add Skill</button>
        </div>
        <div className="md:w-2/3 p-6">
          <h2 className="text-sm font-semibold text-blue-600 mb-2">ABOUT ME</h2>
          <EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="Dedicated Customer Service Specialist with 5+ years of experience in hospitality..." multiline className="text-gray-600 mb-4" />
          <h2 className="text-sm font-semibold text-blue-600 mb-2">WORK EXPERIENCE</h2>
          {(data.experiences || []).map((exp, i) => (
            <div key={i} className="mb-4 group relative border-l-2 border-blue-200 pl-3">
              <div className="flex justify-between"><h3 className="font-semibold"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="Customer Service Manager" /></h3><span className="text-xs text-gray-400"><EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="2021 - Present" /></span></div>
              <p className="text-blue-600 text-sm"><EditableField value={exp.company} onSave={(v) => updateExperience(i, 'company', v)} placeholder="Company Name" /></p>
              <EditableField value={exp.description} onSave={(v) => updateExperience(i, 'description', v)} placeholder="Managed team of 15 customer service representatives..." multiline className="text-gray-600 text-sm" />
              {exp.achievement && <p className="text-green-600 text-xs mt-1">🏆 <EditableField value={exp.achievement} onSave={(v) => updateExperience(i, 'achievement', v)} placeholder="Achievement" /></p>}
            </div>
          ))}
          <button onClick={addExperience} className="text-blue-600 text-sm">+ Add Experience</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceTemplate2;