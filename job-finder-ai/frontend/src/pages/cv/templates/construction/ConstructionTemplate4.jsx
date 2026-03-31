// src/pages/cv/templates/construction/ConstructionTemplate4.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ConstructionTemplate4 = ({ data, onUpdate }) => {
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
    const newExperiences = [...(data.experiences || []), { position: '', company: '', startDate: '', endDate: '', description: '', safetyRecord: '' }];
    onUpdate({ ...data, experiences: newExperiences });
  };
  const updateExperience = (i, f, v) => { const e = [...(data.experiences || [])]; e[i] = { ...e[i], [f]: v }; onUpdate({ ...data, experiences: e }); };
  const removeExperience = (i) => { onUpdate({ ...data, experiences: (data.experiences || []).filter((_, idx) => idx !== i) }); };

  const addSkill = () => { onUpdate({ ...data, skills: [...(data.skills || []), ''] }); };
  const updateSkill = (i, v) => { const s = [...(data.skills || [])]; s[i] = v; onUpdate({ ...data, skills: s }); };
  const removeSkill = (i) => { onUpdate({ ...data, skills: (data.skills || []).filter((_, idx) => idx !== i) }); };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-yellow-600 text-white p-6">
          <div className="text-center mb-4"><div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2"><span className="text-3xl font-bold"><EditableField value={data.personalInfo?.fullName?.charAt(0)} onSave={()=>{}} placeholder="A" /></span></div>
          <h1 className="text-xl font-bold"><EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="LÊ VĂN C" /></h1>
          <p className="text-yellow-200 text-sm"><EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="SAFETY OFFICER" /></p></div>
          <h2 className="text-xs font-semibold uppercase text-yellow-200 mb-2">CONTACT</h2>
          <div className="space-y-1 text-sm mb-4"><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" /><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="safety@company.com" /></div>
          <h2 className="text-xs font-semibold uppercase text-yellow-200 mb-2">CERTIFICATIONS</h2>
          <EditableField value={data.personalInfo?.cert1} onSave={(v) => updateField('personalInfo.cert1', v)} placeholder="OSHA Certified" />
          <EditableField value={data.personalInfo?.cert2} onSave={(v) => updateField('personalInfo.cert2', v)} placeholder="First Aid Certified" />
          <h2 className="text-xs font-semibold uppercase text-yellow-200 mt-4 mb-2">SKILLS</h2>
          {(data.skills || []).map((s, i) => (<div key={i} className="group mb-1"><div className="flex justify-between"><EditableField value={s} onSave={(v) => updateSkill(i, v)} placeholder="Risk Assessment" /><button onClick={()=>removeSkill(i)} className="text-red-300 text-xs">✕</button></div></div>))}
          <button onClick={addSkill} className="text-yellow-200 text-xs">+ Add Skill</button>
        </div>
        <div className="md:w-2/3 p-6">
          <h2 className="text-sm font-semibold text-yellow-600 mb-2">PROFILE</h2>
          <EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="Safety Officer with 6+ years of experience ensuring workplace safety..." multiline className="text-gray-600 mb-4" />
          <h2 className="text-sm font-semibold text-yellow-600 mb-2">WORK EXPERIENCE</h2>
          {(data.experiences || []).map((exp, i) => (
            <div key={i} className="mb-4 group relative"><div className="flex justify-between"><h3 className="font-semibold"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="Safety Officer" /></h3><span className="text-xs text-gray-400"><EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="2019 - Present" /></span></div>
            <p className="text-yellow-600 text-sm"><EditableField value={exp.company} onSave={(v) => updateExperience(i, 'company', v)} placeholder="Construction Company" /></p>
            <EditableField value={exp.description} onSave={(v) => updateExperience(i, 'description', v)} placeholder="Implemented safety protocols reducing incidents by 40%..." multiline className="text-gray-600 text-sm" />
            {exp.safetyRecord && <p className="text-green-600 text-xs mt-1">📋 Safety Record: <EditableField value={exp.safetyRecord} onSave={(v) => updateExperience(i, 'safetyRecord', v)} placeholder="0 incidents in 2 years" /></p>}</div>
          ))}
          <button onClick={addExperience} className="text-yellow-600 text-sm">+ Add Experience</button>
        </div>
      </div>
    </div>
  );
};

export default ConstructionTemplate4;