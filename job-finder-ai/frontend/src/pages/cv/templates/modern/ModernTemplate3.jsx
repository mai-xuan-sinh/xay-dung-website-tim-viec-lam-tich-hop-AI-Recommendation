// src/pages/cv/templates/modern/ModernTemplate3.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ModernTemplate3 = ({ data, onUpdate }) => {
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
      fieldOfStudy: '',
      graduationYear: '',
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

  const addReference = () => {
    const newReferences = [...(data.references || []), { name: '', title: '', phone: '', email: '' }];
    onUpdate({ ...data, references: newReferences });
  };

  const updateReference = (index, field, value) => {
    const newReferences = [...(data.references || [])];
    if (!newReferences[index]) newReferences[index] = {};
    newReferences[index][field] = value;
    onUpdate({ ...data, references: newReferences });
  };

  const removeReference = (index) => {
    const newReferences = (data.references || []).filter((_, i) => i !== index);
    onUpdate({ ...data, references: newReferences });
  };

  const addAward = () => {
    const newAwards = [...(data.awards || []), { title: '', organization: '', year: '' }];
    onUpdate({ ...data, awards: newAwards });
  };

  const updateAward = (index, field, value) => {
    const newAwards = [...(data.awards || [])];
    if (!newAwards[index]) newAwards[index] = {};
    newAwards[index][field] = value;
    onUpdate({ ...data, awards: newAwards });
  };

  const removeAward = (index) => {
    const newAwards = (data.awards || []).filter((_, i) => i !== index);
    onUpdate({ ...data, awards: newAwards });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="p-8 md:p-10">
        {/* Header - Tên + chức danh */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            <EditableField
              value={data.personalInfo?.fullName}
              onSave={(v) => updateField('personalInfo.fullName', v)}
              placeholder="Phan Kiên Trung"
              className="font-bold"
            />
          </h1>
          <p className="text-lg text-gray-500">
            <EditableField
              value={data.personalInfo?.title}
              onSave={(v) => updateField('personalInfo.title', v)}
              placeholder="NHIẾP ẢNH GIA"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột trái */}
          <div className="md:col-span-1 space-y-6">
            {/* Về tôi */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">VỀ TÔI</h2>
              <EditableField
                value={data.personalInfo?.summary}
                onSave={(v) => updateField('personalInfo.summary', v)}
                placeholder="Tôi có quyết tâm cao trong việc nâng cao kỹ năng và phát triển sự nghiệp..."
                multiline
                className="text-gray-600 text-sm leading-relaxed"
              />
            </div>

            {/* Giải thưởng */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">GIẢI THƯỞNG</h2>
                <button onClick={addAward} className="text-xs text-blue-600">+</button>
              </div>
              <div className="space-y-3">
                {(data.awards || []).map((award, idx) => (
                  <div key={idx} className="group relative">
                    {idx > 0 && (
                      <button onClick={() => removeAward(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-600">✕</button>
                    )}
                    <h3 className="font-semibold text-gray-800 text-sm">
                      <EditableField value={award.title} onSave={(v) => updateAward(idx, 'title', v)} placeholder="Tên giải thưởng" />
                    </h3>
                    <p className="text-xs text-gray-500">
                      <EditableField value={award.organization} onSave={(v) => updateAward(idx, 'organization', v)} placeholder="Tổ chức" />
                    </p>
                    <p className="text-xs text-gray-400">
                      <EditableField value={award.year} onSave={(v) => updateAward(idx, 'year', v)} placeholder="Năm" />
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Liên hệ */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">LIÊN HỆ</h2>
              <div className="space-y-1 text-sm">
                <div><EditableField value={data.personalInfo?.phone} onSave={(v) => updateField('personalInfo.phone', v)} placeholder="Điện thoại: 090 1234 567" /></div>
                <div><EditableField value={data.personalInfo?.address} onSave={(v) => updateField('personalInfo.address', v)} placeholder="Địa chỉ" /></div>
                <div><EditableField value={data.personalInfo?.email} onSave={(v) => updateField('personalInfo.email', v)} placeholder="Email" /></div>
                <div><EditableField value={data.personalInfo?.website} onSave={(v) => updateField('personalInfo.website', v)} placeholder="Website" /></div>
              </div>
            </div>
          </div>

          {/* Cột phải */}
          <div className="md:col-span-2 space-y-6">
            {/* Học vấn */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">HỌC VẤN</h2>
                <button onClick={addEducation} className="text-xs text-blue-600">+</button>
              </div>
              <div className="space-y-3">
                {(data.educations || []).map((edu, idx) => (
                  <div key={idx} className="group relative">
                    {idx > 0 && (
                      <button onClick={() => removeEducation(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-600">✕</button>
                    )}
                    <h3 className="font-semibold text-gray-800">
                      <EditableField value={edu.school} onSave={(v) => updateEducation(idx, 'school', v)} placeholder="Trường học" />
                    </h3>
                    <p className="text-sm text-gray-500">
                      <EditableField value={edu.degree && edu.fieldOfStudy ? `${edu.degree} - ${edu.fieldOfStudy}` : ''} onSave={(v) => {
                        const match = v.match(/^(.+?)\s*-\s*(.+)$/);
                        if (match) { updateEducation(idx, 'degree', match[1]); updateEducation(idx, 'fieldOfStudy', match[2]); }
                        else { updateEducation(idx, 'degree', v); }
                      }} placeholder="Bằng cấp - Chuyên ngành" />
                    </p>
                    <p className="text-xs text-gray-400">
                      <EditableField value={edu.graduationYear} onSave={(v) => updateEducation(idx, 'graduationYear', v)} placeholder="Năm tốt nghiệp" />
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kinh nghiệm */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">KINH NGHIỆM</h2>
                <button onClick={addExperience} className="text-xs text-blue-600">+</button>
              </div>
              <div className="space-y-4">
                {(data.experiences || []).map((exp, idx) => (
                  <div key={idx} className="group relative">
                    {idx > 0 && (
                      <button onClick={() => removeExperience(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-600">✕</button>
                    )}
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-gray-800">
                        <EditableField value={exp.position} onSave={(v) => updateExperience(idx, 'position', v)} placeholder="Vị trí" />
                      </h3>
                      <span className="text-xs text-gray-400">
                        <EditableField value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''} onSave={(v) => {
                          const [start, end] = v.split('-').map(s => s.trim());
                          if (start) updateExperience(idx, 'startDate', start);
                          if (end) updateExperience(idx, 'endDate', end);
                        }} placeholder="Thời gian" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      <EditableField value={exp.company} onSave={(v) => updateExperience(idx, 'company', v)} placeholder="Công ty" />
                    </p>
                    <EditableField value={exp.description} onSave={(v) => updateExperience(idx, 'description', v)} placeholder="Mô tả..." multiline className="text-gray-600 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Người giới thiệu */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">NGƯỜI GIỚI THIỆU</h2>
            <button onClick={addReference} className="text-xs text-blue-600">+</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(data.references || []).map((ref, idx) => (
              <div key={idx} className="group relative bg-gray-50 p-3 rounded-lg">
                {idx > 0 && (
                  <button onClick={() => removeReference(idx)} className="absolute -top-2 -right-2 text-red-400 hover:text-red-600">✕</button>
                )}
                <h3 className="font-semibold text-gray-800">
                  <EditableField value={ref.name} onSave={(v) => updateReference(idx, 'name', v)} placeholder="Tên người giới thiệu" />
                </h3>
                <p className="text-xs text-gray-500">
                  <EditableField value={ref.title} onSave={(v) => updateReference(idx, 'title', v)} placeholder="Chức danh" />
                </p>
                <p className="text-xs text-gray-400">
                  <EditableField value={ref.phone} onSave={(v) => updateReference(idx, 'phone', v)} placeholder="Điện thoại" />
                </p>
                <p className="text-xs text-gray-400">
                  <EditableField value={ref.email} onSave={(v) => updateReference(idx, 'email', v)} placeholder="Email" />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          CV được tạo tại ĐANANG WORK
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate3;