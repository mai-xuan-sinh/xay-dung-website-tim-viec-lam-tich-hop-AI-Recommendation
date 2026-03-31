// src/pages/cv/templates/business/BusinessTemplate4.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const BusinessTemplate4 = ({ data, onUpdate }) => {
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
    const newExperiences = [...(data.experiences || []), { position: '', company: '', startDate: '', endDate: '', description: '', revenue: '' }];
    onUpdate({ ...data, experiences: newExperiences });
  };
  const updateExperience = (i, f, v) => { const e = [...(data.experiences || [])]; e[i] = { ...e[i], [f]: v }; onUpdate({ ...data, experiences: e }); };
  const removeExperience = (i) => { onUpdate({ ...data, experiences: (data.experiences || []).filter((_, idx) => idx !== i) }); };

  const addSkill = () => { onUpdate({ ...data, skills: [...(data.skills || []), { name: '', percentage: 0 }] }); };
  const updateSkill = (i, f, v) => { const s = [...(data.skills || [])]; if (!s[i]) s[i] = { name: '', percentage: 0 }; s[i][f] = v; onUpdate({ ...data, skills: s }); };
  const removeSkill = (i) => { onUpdate({ ...data, skills: (data.skills || []).filter((_, idx) => idx !== i) }); };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-blue-900 text-white p-6">
          <h1 className="text-2xl font-bold mb-1"><EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="PHẠM VĂN C" /></h1>
          <p className="text-blue-300 text-sm mb-6"><EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="BUSINESS ANALYST" /></p>
          <h2 className="text-xs font-semibold uppercase text-blue-300 mb-2">CONTACT</h2>
          <div className="space-y-1 text-sm mb-6"><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" /><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="email@company.com" /></div>
          <h2 className="text-xs font-semibold uppercase text-blue-300 mb-2">KEY METRICS</h2>
          <div className="mb-4"><div className="text-2xl font-bold"><EditableField value={data.personalInfo?.metric1} onSave={(v) => updateField('personalInfo.metric1', v)} placeholder="+45%" /></div><div className="text-xs">Revenue Growth</div></div>
          <div className="mb-4"><div className="text-2xl font-bold"><EditableField value={data.personalInfo?.metric2} onSave={(v) => updateField('personalInfo.metric2', v)} placeholder="30+" /></div><div className="text-xs">Projects Completed</div></div>
          <h2 className="text-xs font-semibold uppercase text-blue-300 mb-2">SKILLS</h2>
          {(data.skills || []).map((s, i) => (<div key={i} className="mb-2"><div className="flex justify-between text-sm"><EditableField value={s.name} onSave={(v) => updateSkill(i, 'name', v)} placeholder="Skill" /><span>{s.percentage || 85}%</span></div><div className="h-1 bg-blue-700 rounded"><div className="h-full bg-blue-400 rounded" style={{width: `${s.percentage || 85}%`}}></div></div></div>))}
          <button onClick={addSkill} className="text-blue-300 text-xs">+ Add Skill</button>
        </div>
        <div className="md:w-2/3 p-6">
          <h2 className="text-sm font-semibold text-blue-600 mb-2">PROFILE</h2>
          <EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="Business Analyst with 5+ years of experience in data analysis..." multiline className="text-gray-600 mb-4" />
          <h2 className="text-sm font-semibold text-blue-600 mb-2">WORK EXPERIENCE</h2>
          {(data.experiences || []).map((exp, i) => (
            <div key={i} className="mb-4 group relative border-l-2 border-blue-200 pl-3">
              <div className="flex justify-between"><h3 className="font-semibold"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="Business Analyst" /></h3><span className="text-xs text-gray-400"><EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="2021 - Present" /></span></div>
              <p className="text-blue-600 text-sm"><EditableField value={exp.company} onSave={(v) => updateExperience(i, 'company', v)} placeholder="Company" /></p>
              <EditableField value={exp.description} onSave={(v) => updateExperience(i, 'description', v)} placeholder="Description..." multiline className="text-gray-600 text-sm" />
              {exp.revenue && <p className="text-green-600 text-xs mt-1">📈 Revenue: <EditableField value={exp.revenue} onSave={(v) => updateExperience(i, 'revenue', v)} placeholder="+25%" /></p>}
            </div>
          ))}
          <button onClick={addExperience} className="text-blue-600 text-sm">+ Add Experience</button>
        </div>
      </div>
    </div>
  );
};

export default BusinessTemplate4;