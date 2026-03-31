import React, { useEffect, useRef } from 'react';

const GuideSection = ({ id, title, children, setActiveSection }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [id, setActiveSection]);

  return (
    <div id={id} ref={sectionRef} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        {children}
      </div>
    </div>
  );
};

export default GuideSection;