import React, { useState } from 'react';
import { ProjectData, INITIAL_PROJECT_DATA, AnalysisResult } from './types';
import InputForm from './components/InputForm';
import ReportView from './components/ReportView';
import { analyzeBIMRisk } from './services/gemini';
import { Building2 } from 'lucide-react';

const App: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectData>(INITIAL_PROJECT_DATA);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (key: keyof ProjectData, value: string) => {
    setProjectData(prev => ({ ...prev, [key]: value }));
  };

  const handleAnalyze = async () => {
    if (!projectData.projectName) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeBIMRisk(projectData);
      setAnalysisResult(result);
    } catch (err) {
      setError("Failed to analyze risk. Please check your API key and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
               <Building2 className="w-6 h-6" />
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">Smart BIM Risk Analyzer</h1>
                <p className="text-xs text-slate-500 font-medium -mt-1">AI-Powered Project Health Check</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">Beta Preview</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
                <span className="font-bold">Error:</span> {error}
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)] min-h-[600px]">
          {/* Input Section */}
          <div className="lg:col-span-4 h-full">
            <InputForm 
              data={projectData} 
              onChange={handleInputChange} 
              onSubmit={handleAnalyze} 
              isLoading={loading}
            />
          </div>

          {/* Output Section */}
          <div className="lg:col-span-8 h-full">
            <ReportView result={analysisResult} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
