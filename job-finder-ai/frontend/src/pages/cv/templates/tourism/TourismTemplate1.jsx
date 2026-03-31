// src/pages/cv/templates/tourism/TourismTemplate1.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const TourismTemplate1 = ({ data, onUpdate }) => {
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
      position: '', company: '', startDate: '', endDate: '', description: ''
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
      school: '', degree: '', startDate: '', endDate: '', description: ''
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

  const addCollaboration = () => {
    const newCollaborations = [...(data.collaborations || []), { name: '', role: '' }];
    onUpdate({ ...data, collaborations: newCollaborations });
  };

  const updateCollaboration = (index, field, value) => {
    const newCollaborations = [...(data.collaborations || [])];
    if (!newCollaborations[index]) newCollaborations[index] = {};
    newCollaborations[index][field] = value;
    onUpdate({ ...data, collaborations: newCollaborations });
  };

  const removeCollaboration = (index) => {
    const newCollaborations = (data.collaborations || []).filter((_, i) => i !== index);
    onUpdate({ ...data, collaborations: newCollaborations });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">
          <EditableField value={data.personalInfo?.fullName} onSave={(v) => updateField('personalInfo.fullName', v)} placeholder="Juliana Silva" className="font-bold" />
        </h1>
        <p className="text-xl text-gray-500 uppercase tracking-wide mb-8">
          <EditableField value={data.personalInfo?.title} onSave={(v) => updateField('personalInfo.title', v)} placeholder="ILLUSTRATION ARTIST" />
        </p>

        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">HELLO!</h2>
        <EditableField value={data.personalInfo?.summary} onSave={(v) => updateField('personalInfo.summary', v)} placeholder="Giới thiệu về bản thân, kinh nghiệm, thành tích nổi bật..." multiline className="text-gray-600 leading-relaxed mb-6" />

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1">PORTFOLIO</h2>
            <EditableField value={data.personalInfo?.portfolio} onSave={(v) => updateField('personalInfo.portfolio', v)} placeholder="www.reallygreatsite.com" className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1">CONTACT</h2>
            <EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="hello@reallygreatsite.com" />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">PAST COLLABORATIONS</h2>
            <button onClick={addCollaboration} className="text-xs text-blue-600">+ Add</button>
          </div>
          {(data.collaborations || []).length === 0 ? (
            <p className="text-gray-400 text-sm italic">No collaborations added. Click "+ Add" to add.</p>
          ) : (
            <table className="w-full">
              <thead><tr><th className="text-left py-2 text-sm text-gray-500">Name</th><th className="text-left py-2 text-sm text-gray-500">Role</th><th></th></tr></thead>
              <tbody>
                {(data.collaborations || []).map((collab, idx) => (
                  <tr key={idx} className="group">
                    <td className="py-1"><EditableField value={collab.name} onSave={(v) => updateCollaboration(idx, 'name', v)} placeholder="Company name" /></td>
                    <td className="py-1"><EditableField value={collab.role} onSave={(v) => updateCollaboration(idx, 'role', v)} placeholder="Role" /></td>
                    <td><button onClick={() => removeCollaboration(idx)} className="text-red-400 opacity-0 group-hover:opacity-100">✕</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-8 pt-4 border-t text-center text-xs text-gray-400">CV được tạo tại ĐANANG WORK</div>
      </div>
    </div>
  );
};

export default TourismTemplate1;