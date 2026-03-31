// src/pages/cv/templates/service/ServiceTemplate4.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ServiceTemplate4 = ({ data, onUpdate }) => {
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
    const newExperiences = [...(data.experiences || []), { position: '', company: '', startDate: '', endDate: '', description: '', efficiency: '' }];
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
        <div className="md:w-1/3 bg-green-700 text-white p-6">
          <h1 className="text-2xl font-bold mb-1"><EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="LÊ VĂN C" /></h1>
          <p className="text-green-200 text-sm mb-6"><EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="LOGISTICS COORDINATOR" /></p>
          <h2 className="text-xs font-semibold uppercase text-green-300 mb-2">CONTACT</h2>
          <div className="space-y-1 text-sm mb-6"><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" /><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="logistics@company.com" /></div>
          <h2 className="text-xs font-semibold uppercase text-green-300 mb-2">SKILLS</h2>
          {(data.skills || []).map((s, i) => (<div key={i} className="mb-2 group"><div className="flex justify-between"><EditableField value={s} onSave={(v) => updateSkill(i, v)} placeholder="Supply Chain" /><button onClick={()=>removeSkill(i)} className="text-red-300 text-xs">✕</button></div><div className="h-1 bg-green-600 rounded"><div className="h-full bg-green-400 rounded" style={{width: `${Math.random() * 30 + 70}%`}}></div></div></div>))}
          <button onClick={addSkill} className="text-green-300 text-xs">+ Add Skill</button>
          <h2 className="text-xs font-semibold uppercase text-green-300 mt-4 mb-2">CERTIFICATES</h2>
          <EditableField value={data.personalInfo?.cert1} onSave={(v) => updateField('personalInfo.cert1', v)} placeholder="Supply Chain Management" />
        </div>
        <div className="md:w-2/3 p-6">
          <h2 className="text-sm font-semibold text-green-600 mb-2">PROFILE</h2>
          <EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="Logistics Coordinator with 6+ years of experience in supply chain management..." multiline className="text-gray-600 mb-4" />
          <h2 className="text-sm font-semibold text-green-600 mb-2">WORK EXPERIENCE</h2>
          {(data.experiences || []).map((exp, i) => (
            <div key={i} className="mb-4 group relative border-l-2 border-green-200 pl-3">
              <div className="flex justify-between"><h3 className="font-semibold"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="Logistics Coordinator" /></h3><span className="text-xs text-gray-400"><EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="2020 - Present" /></span></div>
              <p className="text-green-600 text-sm"><EditableField value={exp.company} onSave={(v) => updateExperience(i, 'company', v)} placeholder="Logistics Company" /></p>
              <EditableField value={exp.description} onSave={(v) => updateExperience(i, 'description', v)} placeholder="Managed shipping routes for 50+ daily deliveries..." multiline className="text-gray-600 text-sm" />
              {exp.efficiency && <p className="text-green-600 text-xs mt-1">📦 Efficiency: <EditableField value={exp.efficiency} onSave={(v) => updateExperience(i, 'efficiency', v)} placeholder="+25%" /></p>}
            </div>
          ))}
          <button onClick={addExperience} className="text-green-600 text-sm">+ Add Experience</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceTemplate4;