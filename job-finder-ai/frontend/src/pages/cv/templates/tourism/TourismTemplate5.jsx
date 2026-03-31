// src/pages/cv/templates/tourism/TourismTemplate5.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const TourismTemplate5 = ({ data, onUpdate }) => {
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
      <div className="p-8 border-b border-gray-200">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div><h1 className="text-4xl font-bold text-gray-900 mb-1"><EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="Sophia Le" /></h1>
          <p className="text-gray-500"><EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="TRAVEL CONSULTANT" /></p></div>
          <div className="text-right text-sm text-gray-500"><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="sophia@travel.com" /><br />
          <EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" /></div>
        </div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">ABOUT ME</h2>
            <EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="Passionate travel consultant with 5 years of experience creating unforgettable journeys..." multiline className="text-gray-600 mb-4" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">SKILLS</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {(data.skills || []).map((s, i) => (<div key={i} className="group relative"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"><EditableField value={s} onSave={(v) => updateSkill(i, v)} placeholder="Skill" /></span><button onClick={() => removeSkill(i)} className="ml-1 text-red-400 text-xs opacity-0 group-hover:opacity-100">✕</button></div>))}
              <button onClick={addSkill} className="text-blue-600 text-sm">+ Add</button>
            </div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">LANGUAGES</h2>
            <EditableField value={data.personalInfo?.lang1} onSave={(v) => updateField('personalInfo.lang1', v)} placeholder="English - Fluent" /><br />
            <EditableField value={data.personalInfo?.lang2} onSave={(v) => updateField('personalInfo.lang2', v)} placeholder="Korean - Intermediate" />
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">WORK EXPERIENCE</h2>
            {(data.experiences || []).map((exp, i) => (
              <div key={i} className="mb-4 group relative">
                {i > 0 && <button onClick={() => removeExperience(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
                <div className="flex justify-between"><h3 className="font-semibold"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="Position" /></h3>
                <span className="text-xs text-gray-400"><EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="2021 - Present" /></span></div>
                <p className="text-blue-600 text-sm"><EditableField value={exp.company} onSave={(v) => updateExperience(i, 'company', v)} placeholder="Company" /></p>
                <EditableField value={exp.description} onSave={(v) => updateExperience(i, 'description', v)} placeholder="Description..." multiline className="text-gray-600 text-sm" />
              </div>
            ))}
            <button onClick={addExperience} className="text-blue-600 text-sm">+ Add Experience</button>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mt-4 mb-2">EDUCATION</h2>
            {(data.educations || []).map((edu, i) => (
              <div key={i} className="mb-2 group relative">
                {i > 0 && <button onClick={() => removeEducation(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
                <h3 className="font-semibold"><EditableField value={edu.school} onSave={(v) => updateEducation(i, 'school', v)} placeholder="University" /></h3>
                <p className="text-sm text-gray-500"><EditableField value={edu.degree} onSave={(v) => updateEducation(i, 'degree', v)} placeholder="Degree" /> | <EditableField value={edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateEducation(i,'startDate',s); if(e) updateEducation(i,'endDate',e); }} placeholder="2015 - 2019" /></p>
              </div>
            ))}
            <button onClick={addEducation} className="text-blue-600 text-sm">+ Add Education</button>
          </div>
        </div>
      </div>
      <div className="p-3 bg-gray-50 text-center text-xs text-gray-400">CV được tạo tại ĐANANG WORK</div>
    </div>
  );
};

export default TourismTemplate5;