// src/pages/cv/templates/tourism/TourismTemplate3.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const TourismTemplate3 = ({ data, onUpdate }) => {
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

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-1"><EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="David Tran" className="text-white" /></h1>
        <p className="text-amber-100 text-lg"><EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="PROFESSIONAL TOUR GUIDE" /></p>
        <div className="flex justify-center gap-4 mt-3 text-sm">
          <EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="david@tour.com" />
          <span>|</span>
          <EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" />
        </div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div><h2 className="text-sm font-semibold text-amber-600 mb-1">LANGUAGES</h2>
              <EditableField value={data.personalInfo?.lang1} onSave={(v) => updateField('personalInfo.lang1', v)} placeholder="English - Native" />
              <EditableField value={data.personalInfo?.lang2} onSave={(v) => updateField('personalInfo.lang2', v)} placeholder="Korean - Fluent" />
              <EditableField value={data.personalInfo?.lang3} onSave={(v) => updateField('personalInfo.lang3', v)} placeholder="Japanese - Basic" />
            </div>
            <div><h2 className="text-sm font-semibold text-amber-600 mb-1">CERTIFICATES</h2>
              <EditableField value={data.personalInfo?.cert1} onSave={(v) => updateField('personalInfo.cert1', v)} placeholder="Tour Guide License" />
              <EditableField value={data.personalInfo?.cert2} onSave={(v) => updateField('personalInfo.cert2', v)} placeholder="First Aid Certified" />
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-sm font-semibold text-amber-600 mb-2">ABOUT ME</h2>
            <EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="Passionate tour guide with 5 years of experience showcasing the beauty of Danang..." multiline className="text-gray-600 mb-4" />
            <h2 className="text-sm font-semibold text-amber-600 mb-2">SKILLS</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {(data.skills || []).map((s, i) => (<div key={i} className="group relative"><span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"><EditableField value={s} onSave={(v) => updateSkill(i, v)} placeholder="Skill" /></span><button onClick={() => removeSkill(i)} className="ml-1 text-red-400 text-xs opacity-0 group-hover:opacity-100">✕</button></div>))}
              <button onClick={addSkill} className="text-amber-600 text-sm">+ Add</button>
            </div>
            <h2 className="text-sm font-semibold text-amber-600 mb-2">EXPERIENCE</h2>
            {(data.experiences || []).map((exp, i) => (
              <div key={i} className="mb-3 group relative border-l-2 border-amber-200 pl-3">
                {i > 0 && <button onClick={() => removeExperience(i)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>}
                <div className="flex justify-between"><h3 className="font-semibold"><EditableField value={exp.position} onSave={(v) => updateExperience(i, 'position', v)} placeholder="Position" /></h3>
                <span className="text-xs text-gray-400"><EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => { const [s, e] = v.split('-').map(t=>t.trim()); if(s) updateExperience(i,'startDate',s); if(e) updateExperience(i,'endDate',e); }} placeholder="2022 - Present" /></span></div>
                <p className="text-amber-600 text-sm"><EditableField value={exp.company} onSave={(v) => updateExperience(i, 'company', v)} placeholder="Company" /></p>
                <EditableField value={exp.description} onSave={(v) => updateExperience(i, 'description', v)} placeholder="Description..." multiline className="text-gray-600 text-sm" />
              </div>
            ))}
            <button onClick={addExperience} className="text-amber-600 text-sm">+ Add Experience</button>
          </div>
        </div>
      </div>
      <div className="p-3 bg-gray-50 text-center text-xs text-gray-400">CV được tạo tại ĐANANG WORK</div>
    </div>
  );
};

export default TourismTemplate3;