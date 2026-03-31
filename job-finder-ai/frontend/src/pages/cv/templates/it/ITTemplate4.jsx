// src/pages/cv/templates/it/ITTemplate4.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ITTemplate4 = ({ data, onUpdate }) => {
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
    const newExperiences = [...(data.experiences || []), {
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    }];
    onUpdate({ ...data, experiences: newExperiences });
  };

  const updateExperience = (index, field, value) => {
    const newExperiences = [...(data.experiences || [])];
    if (!newExperiences[index]) newExperiences[index] = {};
    newExperiences[index][field] = value;
    onUpdate({ ...data, experiences: newExperiences });
  };

  const removeExperience = (index) => {
    const newExperiences = (data.experiences || []).filter((_, i) => i !== index);
    onUpdate({ ...data, experiences: newExperiences });
  };

  const addEducation = () => {
    const newEducations = [...(data.educations || []), {
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: ''
    }];
    onUpdate({ ...data, educations: newEducations });
  };

  const updateEducation = (index, field, value) => {
    const newEducations = [...(data.educations || [])];
    if (!newEducations[index]) newEducations[index] = {};
    newEducations[index][field] = value;
    onUpdate({ ...data, educations: newEducations });
  };

  const removeEducation = (index) => {
    const newEducations = (data.educations || []).filter((_, i) => i !== index);
    onUpdate({ ...data, educations: newEducations });
  };

  const addSkill = () => {
    const newSkills = [...(data.skills || []), { name: '', percentage: 0 }];
    onUpdate({ ...data, skills: newSkills });
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...(data.skills || [])];
    if (!newSkills[index]) newSkills[index] = { name: '', percentage: 0 };
    newSkills[index][field] = value;
    onUpdate({ ...data, skills: newSkills });
  };

  const removeSkill = (index) => {
    const newSkills = (data.skills || []).filter((_, i) => i !== index);
    onUpdate({ ...data, skills: newSkills });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        {/* Sidebar trái - Màu cam đậm */}
        <div className="md:col-span-2 bg-gradient-to-b from-orange-600 to-red-600 p-8 text-white">
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 border-4 border-white/50">
              <span className="text-4xl font-bold">{data.personalInfo?.fullName?.charAt(0) || 'A'}</span>
            </div>
            <h1 className="text-2xl font-bold">
              <EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="Sarah Chen" className="text-white" />
            </h1>
            <p className="text-orange-200 text-sm mt-1">
              <EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="DATA SCIENTIST" />
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-200 mb-3">CONTACT</h2>
            <div className="space-y-2 text-sm">
              <div><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" /></div>
              <div><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="sarah@email.com" /></div>
              <div><EditableField value={data.personalInfo?.linkedin} onSave={(v) => updateField('personalInfo.linkedin', v)} placeholder="linkedin.com/in/sarah" /></div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-200 mb-3">EXPERTISE</h2>
            <div className="space-y-3">
              {(data.skills || []).map((skill, idx) => (
                <div key={idx} className="group relative">
                  {idx > 0 && (
                    <button onClick={() => removeSkill(idx)} className="absolute -top-2 -right-2 text-red-300 opacity-0 group-hover:opacity-100">✕</button>
                  )}
                  <div className="flex justify-between text-sm mb-1">
                    <EditableField value={skill.name} onSave={(v) => updateSkill(idx, 'name', v)} placeholder="Python" />
                    <span>{skill.percentage || 90}%</span>
                  </div>
                  <div className="h-1.5 bg-orange-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full" style={{ width: `${skill.percentage || 90}%` }}></div>
                  </div>
                </div>
              ))}
              <button onClick={addSkill} className="text-orange-200 text-xs">+ Add Skill</button>
            </div>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="md:col-span-3 p-8">
          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-2">PROFILE</h2>
            <EditableField
              value={data.personalInfo?.summary}
              onSave={(v) => updateField('personalInfo.summary', v)}
              placeholder="Data Scientist with 4+ years of experience in machine learning and data analysis. Passionate about extracting insights from complex datasets."
              multiline
              className="text-gray-600 text-sm"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-3">WORK EXPERIENCE</h2>
            {(data.experiences || []).map((exp, idx) => (
              <div key={idx} className="mb-4 group relative">
                {idx > 0 && (
                  <button onClick={() => removeExperience(idx)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>
                )}
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800">
                    <EditableField value={exp.position} onSave={(v) => updateExperience(idx, 'position', v)} placeholder="Data Scientist" />
                  </h3>
                  <span className="text-sm text-gray-400">
                    <EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => {
                      const [start, end] = v.split('-').map(s => s.trim());
                      if (start) updateExperience(idx, 'startDate', start);
                      if (end) updateExperience(idx, 'endDate', end);
                    }} placeholder="2021 - Present" />
                  </span>
                </div>
                <p className="text-orange-600 text-sm mb-1">
                  <EditableField value={exp.company} onSave={(v) => updateExperience(idx, 'company', v)} placeholder="Tech Corp" />
                </p>
                <EditableField value={exp.description} onSave={(v) => updateExperience(idx, 'description', v)} placeholder="Developed ML models..." multiline className="text-gray-600 text-sm" />
              </div>
            ))}
            <button onClick={addExperience} className="text-orange-600 text-sm">+ Add Experience</button>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-3">EDUCATION</h2>
            {(data.educations || []).map((edu, idx) => (
              <div key={idx} className="mb-3 group relative">
                {idx > 0 && (
                  <button onClick={() => removeEducation(idx)} className="absolute -top-2 -right-2 text-red-400 opacity-0 group-hover:opacity-100">✕</button>
                )}
                <h3 className="font-semibold text-gray-800">
                  <EditableField value={edu.degree} onSave={(v) => updateEducation(idx, 'degree', v)} placeholder="Master in Data Science" />
                </h3>
                <p className="text-gray-600 text-sm">
                  <EditableField value={edu.school} onSave={(v) => updateEducation(idx, 'school', v)} placeholder="University" />
                </p>
                <p className="text-gray-400 text-xs">
                  <EditableField value={edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : ''} onSave={(v) => {
                    const [start, end] = v.split('-').map(s => s.trim());
                    if (start) updateEducation(idx, 'startDate', start);
                    if (end) updateEducation(idx, 'endDate', end);
                  }} placeholder="2016 - 2020" />
                </p>
              </div>
            ))}
            <button onClick={addEducation} className="text-orange-600 text-sm">+ Add Education</button>
          </div>
        </div>
      </div>

      <div className="px-8 py-3 bg-gray-50 text-center text-xs text-gray-400 border-t border-gray-200">
        CV được tạo tại ĐANANG WORK
      </div>
    </div>
  );
};

export default ITTemplate4;