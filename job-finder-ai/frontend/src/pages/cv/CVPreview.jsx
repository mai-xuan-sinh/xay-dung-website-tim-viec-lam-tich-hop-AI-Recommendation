// src/pages/cv/CVPreview.jsx
import React from "react";
import {
  PrinterIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import MinimalTemplate1 from "./templates/minimal/MinimalTemplate1";
import MinimalTemplate2 from "./templates/minimal/MinimalTemplate2";
import MinimalTemplate3 from "./templates/minimal/MinimalTemplate3";
import MinimalTemplate4 from "./templates/minimal/MinimalTemplate4";
import MinimalTemplate5 from "./templates/minimal/MinimalTemplate5";
import ProfessionalTemplate1 from './templates/professional/ProfessionalTemplate1';
import ProfessionalTemplate2 from './templates/professional/ProfessionalTemplate2';
import ProfessionalTemplate3 from './templates/professional/ProfessionalTemplate3';
import ProfessionalTemplate4 from './templates/professional/ProfessionalTemplate4';
import ProfessionalTemplate5 from './templates/professional/ProfessionalTemplate5';
import ModernTemplate1 from './templates/modern/ModernTemplate1';
import ModernTemplate2 from './templates/modern/ModernTemplate2';
import ModernTemplate3 from './templates/modern/ModernTemplate3';
import ModernTemplate4 from './templates/modern/ModernTemplate4';
import ModernTemplate5 from './templates/modern/ModernTemplate5';
import ITTemplate1 from './templates/it/ITTemplate1';
import ITTemplate2 from './templates/it/ITTemplate2';
import ITTemplate3 from './templates/it/ITTemplate3';
import ITTemplate4 from './templates/it/ITTemplate4';
import ITTemplate5 from './templates/it/ITTemplate5';
import TourismTemplate from "./templates/TourismTemplate";
import BusinessTemplate from "./templates/BusinessTemplate";
import ConstructionTemplate from "./templates/ConstructionTemplate";
import ServiceTemplate from "./templates/ServiceTemplate";

const CVPreview = ({
  template,
  cvData,
  onBack,
  onSave,
  onPrint,
  onDownload,
}) => {
  const getTemplateComponent = () => {
    switch (template.id) {
      // Minimal templates
      case "minimal-1":
        return <MinimalTemplate1 data={cvData} onUpdate={onSave} />;
      case "minimal-2":
        return <MinimalTemplate2 data={cvData} onUpdate={onSave} />;
      case "minimal-3":
        return <MinimalTemplate3 data={cvData} onUpdate={onSave} />;
      case "minimal-4":
        return <MinimalTemplate4 data={cvData} onUpdate={onSave} />;
      case "minimal-5":
        return <MinimalTemplate5 data={cvData} onUpdate={onSave} />;
      // Modern templates
      case "modern-1":
        return <ModernTemplate1 data={cvData} onUpdate={onSave} />;
      case "modern-2":
        return <ModernTemplate2 data={cvData} onUpdate={onSave} />;
      case "modern-3":
        return <ModernTemplate3 data={cvData} onUpdate={onSave} />;
      case "modern-4":
        return <ModernTemplate4 data={cvData} onUpdate={onSave} />;
      case "modern-5":
        return <ModernTemplate5 data={cvData} onUpdate={onSave} />;

      // Professional templates
      case "professional-1":
        return <ProfessionalTemplate1 data={cvData} onUpdate={onSave} />;
      case "professional-2":
        return <ProfessionalTemplate2 data={cvData} onUpdate={onSave} />;
      case "professional-3":
        return <ProfessionalTemplate3 data={cvData} onUpdate={onSave} />;
      case "professional-4":
        return <ProfessionalTemplate4 data={cvData} onUpdate={onSave} />;
      case "professional-5":
        return <ProfessionalTemplate5 data={cvData} onUpdate={onSave} />;
      // Industry templates
      case 'it-1':
  return <ITTemplate1 data={cvData} onUpdate={onSave} />;
case 'it-2':
  return <ITTemplate2 data={cvData} onUpdate={onSave} />;
case 'it-3':
  return <ITTemplate3 data={cvData} onUpdate={onSave} />;
case 'it-4':
  return <ITTemplate4 data={cvData} onUpdate={onSave} />;
case 'it-5':
  return <ITTemplate5 data={cvData} onUpdate={onSave} />;
      case "tourism":
        return <TourismTemplate data={cvData} onUpdate={onSave} />;
      case "business":
        return <BusinessTemplate data={cvData} onUpdate={onSave} />;
      case "construction":
        return <ConstructionTemplate data={cvData} onUpdate={onSave} />;
      case "service":
        return <ServiceTemplate data={cvData} onUpdate={onSave} />;
      default:
        return <MinimalTemplate1 data={cvData} onUpdate={onSave} />;
    }
  };

  const getColorClass = () => {
    switch (template.id) {
      case "minimal-1":
      case "minimal-2":
      case "minimal-3":
      case "minimal-4":
      case "minimal-5":
        return "from-gray-600 to-gray-800";
      case "modern-1":
        return "from-purple-600 to-pink-600";
      case "professional-1":
        return "from-blue-600 to-indigo-600";
      case "it":
        return "from-cyan-600 to-blue-600";
      case "tourism":
        return "from-green-600 to-emerald-600";
      case "business":
        return "from-yellow-600 to-orange-600";
      case "construction":
        return "from-orange-600 to-red-600";
      case "service":
        return "from-purple-600 to-pink-600";
      default:
        return "from-gray-600 to-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className={`bg-gradient-to-r ${getColorClass()} p-6 text-white`}>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">Xem trước CV</h2>
            <p className="opacity-90 text-sm">Mẫu {template.name}</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onPrint}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            >
              <PrinterIcon className="h-5 w-5" />
              <span>In CV</span>
            </button>
            <button
              onClick={onDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              <span>Tải PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">{getTemplateComponent()}</div>
      </div>

      <div className="p-6 border-t border-gray-100 flex justify-between flex-wrap gap-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Quay lại chỉnh sửa</span>
        </button>
        <button
          onClick={onSave}
          className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
        >
          Lưu CV
        </button>
      </div>
    </div>
  );
};

export default CVPreview;
