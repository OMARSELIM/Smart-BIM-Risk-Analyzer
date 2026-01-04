import React from 'react';
import { ProjectData } from '../types';
import { Layers, Activity, FileText, AlertCircle } from 'lucide-react';

interface InputFormProps {
  data: ProjectData;
  onChange: (key: keyof ProjectData, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ data, onChange, onSubmit, isLoading }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Project Input
        </h2>
        <p className="text-slate-500 text-sm mt-1">Provide project details to analyze BIM risks.</p>
      </div>

      <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {/* Project Basics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
            <input
              type="text"
              value={data.projectName}
              onChange={(e) => onChange('projectName', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Skyline Tower"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Current Phase</label>
            <select
              value={data.phase}
              onChange={(e) => onChange('phase', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
            >
              <option>Pre-Design / Concept</option>
              <option>Design Development</option>
              <option>Construction Documentation</option>
              <option>Tender / Bidding</option>
              <option>Construction</option>
              <option>Handover / Operations</option>
            </select>
          </div>
        </div>

        {/* General Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            General Status / Description
          </label>
          <textarea
            value={data.description}
            onChange={(e) => onChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Describe the current situation, main concerns, or upload BIM audit summary text here..."
          />
        </div>

        <div className="border-t border-slate-100 pt-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-slate-500" />
                Risk Indicators
            </h3>
            
            {/* Clashes */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Clash Detection Status
                </label>
                <div className="relative">
                    <AlertCircle className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={data.clashStatus}
                        onChange={(e) => onChange('clashStatus', e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g. 500+ clashes in MEP vs Structure, unresolved for 2 weeks..."
                    />
                </div>
            </div>

            {/* Coordination */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Coordination & Communication
                </label>
                <div className="relative">
                    <Layers className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={data.coordinationStatus}
                        onChange={(e) => onChange('coordinationStatus', e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Weekly meetings skipped, structural team unresponsive..."
                    />
                </div>
            </div>

            {/* Info Delivery */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Information Delivery & Responsibilities
                </label>
                <div className="relative">
                    <FileText className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={data.infoDeliveryStatus}
                        onChange={(e) => onChange('infoDeliveryStatus', e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g. BEP unclear, asset data missing for facilities management..."
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onSubmit}
          disabled={isLoading || !data.projectName}
          className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-white font-semibold transition-all shadow-lg shadow-blue-500/20
            ${isLoading || !data.projectName 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02]'}`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Risks...
            </>
          ) : (
            <>
              Run Risk Analysis
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
