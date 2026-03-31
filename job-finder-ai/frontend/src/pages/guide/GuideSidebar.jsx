import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const GuideSidebar = ({ sections, activeSection, setActiveSection }) => {
  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Nội dung</h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 ${
                activeSection === section.id
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CheckCircleIcon className={`h-4 w-4 ${activeSection === section.id ? 'text-blue-600' : 'text-gray-400'}`} />
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuideSidebar;