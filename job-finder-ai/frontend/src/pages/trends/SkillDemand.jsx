import React from 'react';

const SkillDemand = ({ selectedYear }) => {
  const getSkillData = () => {
    const data = {
      2024: { it: ['React.js (85%)', 'Python (78%)', 'Java (72%)'], ai: '65%', digital: '70%' },
      2025: { it: ['React.js (88%)', 'Python (82%)', 'Node.js (75%)'], ai: '70%', digital: '75%' },
      2026: { it: ['React.js (92%)', 'Python (88%)', 'Node.js (85%)', 'AI/ML (78%)'], ai: '78%', digital: '80%' },
      2027: { it: ['AI/ML (95%)', 'Python (92%)', 'Data Science (88%)'], ai: '88%', digital: '85%' },
      2028: { it: ['AI/ML (98%)', 'Data Science (95%)', 'Blockchain (85%)'], ai: '92%', digital: '90%' },
      2029: { it: ['Generative AI (99%)', 'AI/ML (98%)', 'Data Science (96%)'], ai: '96%', digital: '94%' },
      2030: { it: ['AI/ML (99%)', 'Quantum Computing (95%)', 'Data Science (98%)'], ai: '98%', digital: '97%' },
    };
    return data[selectedYear] || data[2026];
  };

  const skillData = getSkillData();

  const skillCategories = [
    { category: 'Công nghệ thông tin', skills: skillData.it },
    { category: 'AI & Machine Learning', skills: [`Nhu cầu: ${skillData.ai}`, 'Chatbot Development', 'Computer Vision'] },
    { category: 'Digital Marketing', skills: [`Nhu cầu: ${skillData.digital}`, 'TikTok Marketing', 'AI Content Creation'] },
    { category: 'Kỹ năng mềm', skills: ['Tiếng Anh (95%)', 'Giao tiếp (92%)', 'Tư duy phản biện (85%)'] },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Kỹ năng được săn đón nhất {selectedYear}</h2>
        <p className="text-gray-600 mb-6">Top kỹ năng có nhu cầu tuyển dụng cao nhất trên thị trường Đà Nẵng</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="border border-gray-100 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">{cat.category}</h3>
              <ul className="space-y-2">
                {cat.skills.map((skill, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-orange-50 rounded-xl">
          <p className="text-sm text-orange-700">
            💡 Dự báo năm {selectedYear}: {selectedYear >= 2027 ? 'AI và Machine Learning sẽ là xu hướng chủ đạo' : 'Công nghệ thông tin và Digital Marketing vẫn là ngành hot nhất'}.
            Hãy trang bị ngay những kỹ năng này để tăng cơ hội việc làm!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillDemand;