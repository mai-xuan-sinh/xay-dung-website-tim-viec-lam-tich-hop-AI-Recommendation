// src/pages/cv/templates/it/ITTemplate2.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ITTemplate2 = ({ data, onUpdate }) => {
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

  const addProject = () => {
    const newProjects = [...(data.projects || []), {
      name: '',
      techStack: '',
      description: ''
    }];
    onUpdate({ ...data, projects: newProjects });
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...(data.projects || [])];
    if (!newProjects[index]) newProjects[index] = {};
    newProjects[index][field] = value;
    onUpdate({ ...data, projects: newProjects });
  };

  const removeProject = (index) => {
    const newProjects = (data.projects || []).filter((_, i) => i !== index);
    onUpdate({ ...data, projects: newProjects });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar trái - Màu xanh dương đậm tech */}
        <div className="md:w-1/3 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-8">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/50">
              <span className="text-4xl font-bold">
                {data.personalInfo?.fullName?.charAt(0) || 'A'}
              </span>
            </div>
          </div>

          {/* Tên và chức danh */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              <EditableField
                value={data.personalInfo?.fullName}
                onSave={(v) => updateField('personalInfo.fullName', v)}
                placeholder="John Doe"
                className="text-white font-bold"
              />
            </h1>
            <p className="text-blue-200 text-sm">
              <EditableField
                value={data.personalInfo?.title}
                onSave={(v) => updateField('personalInfo.title', v)}
                placeholder="SENIOR SOFTWARE ENGINEER"
              />
            </p>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-4">CONTACT</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="+84 123 456 789" className="text-blue-100" />
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="john.doe@email.com" className="text-blue-100" />
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <EditableField value={data.personalInfo?.address} onSave={(v) => updateField('personalInfo.address', v)} placeholder="Da Nang, Vietnam" className="text-blue-100" />
              </div>
              <div className="flex items-center space-x-2">
                <span>💻</span>
                <EditableField value={data.personalInfo?.github} onSave={(v) => updateField('personalInfo.github', v)} placeholder="github.com/johndoe" className="text-blue-100" />
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-300">TECHNICAL SKILLS</h2>
              <button onClick={addSkill} className="text-xs text-blue-300 hover:text-white">+</button>
            </div>
            <div className="space-y-3">
              {(data.skills || []).map((skill, idx) => (
                <div key={idx} className="group relative">
                  {idx > 0 && (
                    <button onClick={() => removeSkill(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100">✕</button>
                  )}
                  <div className="flex justify-between text-sm mb-1">
                    <EditableField value={skill.name} onSave={(v) => updateSkill(idx, 'name', v)} placeholder="JavaScript" className="text-blue-100" />
                    <span className="text-blue-300 text-xs">{skill.percentage || 85}%</span>
                  </div>
                  <div className="h-1.5 bg-blue-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: `${skill.percentage || 85}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-4">LANGUAGES</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>English</span>
                <span className="text-blue-300">Fluent</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vietnamese</span>
                <span className="text-blue-300">Native</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="md:w-2/3 p-8">
          {/* Profile */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">PROFILE</h2>
            <EditableField
              value={data.personalInfo?.summary}
              onSave={(v) => updateField('personalInfo.summary', v)}
              placeholder="Senior Software Engineer with 5+ years of experience in full-stack development. Passionate about building scalable applications and solving complex problems."
              multiline
              className="text-gray-600 text-sm leading-relaxed"
            />
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600">WORK EXPERIENCE</h2>
              <button onClick={addExperience} className="text-xs text-blue-600">+ Add</button>
            </div>
            <div className="space-y-5">
              {(data.experiences || []).map((exp, idx) => (
                <div key={idx} className="group relative border-l-2 border-blue-200 pl-4">
                  {idx > 0 && (
                    <button onClick={() => removeExperience(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100">✕</button>
                  )}
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-800">
                      <EditableField value={exp.position} onSave={(v) => updateExperience(idx, 'position', v)} placeholder="Software Engineer" />
                    </h3>
                    <span className="text-sm text-gray-400">
                      <EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => {
                        const [start, end] = v.split('-').map(s => s.trim());
                        if (start) updateExperience(idx, 'startDate', start);
                        if (end) updateExperience(idx, 'endDate', end);
                      }} placeholder="2020 - Present" />
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">
                    <EditableField value={exp.company} onSave={(v) => updateExperience(idx, 'company', v)} placeholder="Tech Company" />
                  </p>
                  <EditableField value={exp.description} onSave={(v) => updateExperience(idx, 'description', v)} placeholder="Developed and maintained web applications using React and Node.js." multiline className="text-gray-600 text-sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600">FEATURED PROJECTS</h2>
              <button onClick={addProject} className="text-xs text-blue-600">+ Add</button>
            </div>
            <div className="space-y-4">
              {(data.projects || []).map((proj, idx) => (
                <div key={idx} className="group relative bg-gray-50 p-4 rounded-lg">
                  {idx > 0 && (
                    <button onClick={() => removeProject(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100">✕</button>
                  )}
                  <h3 className="font-semibold text-gray-800">
                    <EditableField value={proj.name} onSave={(v) => updateProject(idx, 'name', v)} placeholder="Project Name" />
                  </h3>
                  <p className="text-xs text-blue-600 mb-2">
                    <EditableField value={proj.techStack} onSave={(v) => updateProject(idx, 'techStack', v)} placeholder="React, Node.js, MongoDB" />
                  </p>
                  <EditableField value={proj.description} onSave={(v) => updateProject(idx, 'description', v)} placeholder="Description of the project..." multiline className="text-gray-600 text-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 border-t border-gray-100 text-center text-xs text-gray-400">
        CV được tạo tại ĐANANG WORK
      </div>
    </div>
  );
};

export default ITTemplate2;