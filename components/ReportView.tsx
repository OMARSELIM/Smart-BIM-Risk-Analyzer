import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AnalysisResult } from '../types';
import AnalysisChart from './AnalysisChart';
import RiskBadge from './RiskBadge';
import { ShieldAlert, CheckCircle2, ClipboardList, Target } from 'lucide-react';

interface ReportViewProps {
  result: AnalysisResult | null;
}

const ReportView: React.FC<ReportViewProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 border border-dashed border-slate-300 rounded-2xl bg-slate-50/50">
        <Target className="w-16 h-16 mb-4 opacity-20" />
        <h3 className="text-lg font-medium text-slate-500">No Analysis Yet</h3>
        <p className="text-sm text-center max-w-xs mt-2">
          Fill out the project details and click "Run Risk Analysis" to see the AI assessment.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
        
      {/* Header Summary */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
             <div className="flex items-center gap-3 mb-2">
                 <h2 className="text-2xl font-bold text-slate-800">Risk Assessment Report</h2>
                 <RiskBadge level={result.riskLevel} size="lg" />
             </div>
             <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {result.summary}
             </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-48 bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
             <AnalysisChart score={result.riskScore} level={result.riskLevel} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        
        {/* Key Identified Risks Grid */}
        <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-orange-500" />
                Key Risk Factors Identified
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.keyRisks.map((risk, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                            risk.severity === 'Critical' ? 'bg-red-500' :
                            risk.severity === 'High' ? 'bg-orange-500' :
                            risk.severity === 'Medium' ? 'bg-amber-500' :
                            'bg-emerald-500'
                        }`}></div>
                        <div className="flex justify-between items-start mb-2 pl-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{risk.category}</span>
                            <RiskBadge level={risk.severity} size="sm" />
                        </div>
                        <p className="text-slate-700 font-medium pl-2">{risk.description}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Mitigation Plan */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
             <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-blue-600" />
                Recommended Mitigation Strategy
            </h3>
            <div className="prose prose-slate prose-sm max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-800">
                <ReactMarkdown components={{
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />
                }}>
                    {result.mitigationPlan}
                </ReactMarkdown>
            </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-end">
            <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
                <CheckCircle2 className="w-4 h-4" />
                Export / Print Report
            </button>
        </div>

      </div>
    </div>
  );
};

export default ReportView;
