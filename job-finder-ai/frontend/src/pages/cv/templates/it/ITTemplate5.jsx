// src/pages/cv/templates/it/ITTemplate5.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ITTemplate5 = ({ data, onUpdate }) => {
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
    const newSkills = [...(data.skills || []), ''];
    onUpdate({ ...data, skills: newSkills });
  };

  const updateSkill = (index, value) => {
    const newSkills = [...(data.skills || [])];
    newSkills[index] = value;
    onUpdate({ ...data, skills: newSkills });
  };

  const removeSkill = (index) => {
    const newSkills = (data.skills || []).filter((_, i) => i !== index);
    onUpdate({ ...data, skills: newSkills });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="p-10">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-4xl font-light text-gray-900 mb-2">
            <EditableField
              value={data.personalInfo?.fullName}
              onSave={(v) => updateField('personalInfo.fullName', v)}
              placeholder="Michael Chen"
              className="font-light"
            />
          </h1>
          <p className="text-lg text-gray-500 mb-4">
            <EditableField
              value={data.personalInfo?.title}
              onSave={(v) => updateField('personalInfo.title', v)}
              placeholder="SOFTWARE ARCHITECT"
            />
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="michael@email.com" />
            <EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" />
            <EditableField value={data.personalInfo?.github} onSave={(v) => updateField('personalInfo.github', v)} placeholder="github.com/michael" />
            <EditableField value={data.personalInfo?.linkedin} onSave={(v) => updateField('personalInfo.linkedin', v)} placeholder="linkedin.com/in/michael" />
          </div>
        </div>

        {/* Profile */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">PROFILE</h2>
          <EditableField
            value={data.personalInfo?.summary}
            onSave={(v) => updateField('personalInfo.summary', v)}
            placeholder="Software Architect with 8+ years of experience designing scalable systems. Expert in cloud architecture and microservices."
            multiline
            className="text-gray-600 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">TECHNICAL SKILLS</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {(data.skills || []).map((skill, idx) => (
                <div key={idx} className="group relative">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    <EditableField value={skill} onSave={(v) => updateSkill(idx, v)} placeholder={`Skill ${idx + 1}`} />
                  </span>
                  <button onClick={() => removeSkill(idx)} className="ml-1 text-red-400 text-xs opacity-0 group-hover:opacity-100">✕</button>
                </div>
              ))}
              <button onClick={addSkill} className="text-blue-600 text-sm">+ Add Skill</button>
            </div>

            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">EDUCATION</h2>
            {(data.educations || []).map((edu, idx) => (
              <div key={idx} className="mb-3 group relative">
                {idx > 0 && <button onClick={() => removeEducation(idx)} className="absolute -top-2 -right-2 text-red-400 text-xs opacity-0 group-hover:opacity-100">✕</button>}
                <h3 className="font-semibold text-gray-800">
                  <EditableField value={edu.degree} onSave={(v) => updateEducation(idx, 'degree', v)} placeholder="Master in Computer Science" />
                </h3>
                <p className="text-gray-600 text-sm">
                  <EditableField value={edu.school} onSave={(v) => updateEducation(idx, 'school', v)} placeholder="Stanford University" />
                </p>
                <p className="text-gray-400 text-xs">
                  <EditableField value={edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : ''} onSave={(v) => {
                    const [start, end] = v.split('-').map(s => s.trim());
                    if (start) updateEducation(idx, 'startDate', start);
                    if (end) updateEducation(idx, 'endDate', end);
                  }} placeholder="2012 - 2014" />
                </p>
              </div>
            ))}
            <button onClick={addEducation} className="text-blue-600 text-sm">+ Add Education</button>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">WORK EXPERIENCE</h2>
            {(data.experiences || []).map((exp, idx) => (
              <div key={idx} className="mb-4 group relative">
                {idx > 0 && (
                  <button onClick={() => removeExperience(idx)} className="absolute -top-2 -right-2 text-red-400 text-xs opacity-0 group-hover:opacity-100">✕</button>
                )}
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800">
                    <EditableField value={exp.position} onSave={(v) => updateExperience(idx, 'position', v)} placeholder="Senior Software Engineer" />
                  </h3>
                  <span className="text-sm text-gray-400">
                    <EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => {
                      const [start, end] = v.split('-').map(s => s.trim());
                      if (start) updateExperience(idx, 'startDate', start);
                      if (end) updateExperience(idx, 'endDate', end);
                    }} placeholder="2019 - Present" />
                  </span>
                </div>
                <p className="text-blue-600 text-sm mb-1">
                  <EditableField value={exp.company} onSave={(v) => updateExperience(idx, 'company', v)} placeholder="Tech Company" />
                </p>
                <EditableField
                  value={exp.description}
                  onSave={(v) => updateExperience(idx, 'description', v)}
                  placeholder="Led development of microservices architecture..."
                  multiline
                  className="text-gray-600 text-sm"
                />
              </div>
            ))}
            <button onClick={addExperience} className="text-blue-600 text-sm">+ Add Experience</button>
          </div>
        </div>
      </div>

      <div className="px-10 py-4 border-t border-gray-100 text-center text-xs text-gray-400">
        CV được tạo tại ĐANANG WORK
      </div>
    </div>
  );
};

export default ITTemplate5;