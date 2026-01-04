import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { RiskLevel } from '../types';

interface AnalysisChartProps {
  score: number;
  level: RiskLevel;
}

const AnalysisChart: React.FC<AnalysisChartProps> = ({ score, level }) => {
  
  const getColor = (s: number) => {
    if (s < 30) return '#10b981'; // emerald-500
    if (s < 60) return '#f59e0b'; // amber-500
    if (s < 80) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  };

  const data = [
    {
      name: 'Risk Score',
      value: score,
      fill: getColor(score),
    },
  ];

  return (
    <div className="w-full h-64 relative flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="70%" 
          outerRadius="90%" 
          barSize={20} 
          data={data} 
          startAngle={180} 
          endAngle={0}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
            label={false}
          />
          <Tooltip 
             contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: 'none', color: '#fff' }}
             itemStyle={{ color: '#fff' }}
             formatter={(value: number) => [`${value}/100`, 'Risk Score']}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center mt-6">
        <div className="text-4xl font-bold text-slate-800">{score}</div>
        <div className={`text-sm font-semibold uppercase tracking-wider ${
          level === RiskLevel.CRITICAL ? 'text-red-600' :
          level === RiskLevel.HIGH ? 'text-orange-600' :
          level === RiskLevel.MEDIUM ? 'text-amber-600' :
          'text-emerald-600'
        }`}>
          {level} Risk
        </div>
      </div>
    </div>
  );
};

export default AnalysisChart;
