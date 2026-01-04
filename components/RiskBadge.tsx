import React from 'react';
import { AlertTriangle, ShieldCheck, AlertOctagon, Info } from 'lucide-react';

interface RiskBadgeProps {
  level: string;
  size?: 'sm' | 'md' | 'lg';
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md' }) => {
  let colorClass = "";
  let Icon = Info;

  switch (level) {
    case "Critical":
      colorClass = "bg-red-100 text-red-700 border-red-200";
      Icon = AlertOctagon;
      break;
    case "High":
      colorClass = "bg-orange-100 text-orange-700 border-orange-200";
      Icon = AlertTriangle;
      break;
    case "Medium":
      colorClass = "bg-amber-100 text-amber-700 border-amber-200";
      Icon = AlertTriangle;
      break;
    case "Low":
      colorClass = "bg-emerald-100 text-emerald-700 border-emerald-200";
      Icon = ShieldCheck;
      break;
    default:
      colorClass = "bg-slate-100 text-slate-700 border-slate-200";
  }

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-4 py-2 text-lg' : 'px-3 py-1 text-sm';
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 24 : 16;

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium border rounded-full ${colorClass} ${sizeClass}`}>
      <Icon size={iconSize} />
      {level}
    </span>
  );
};

export default RiskBadge;
