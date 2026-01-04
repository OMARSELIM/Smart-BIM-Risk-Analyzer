export enum RiskLevel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical"
}

export interface RiskFactor {
  category: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
}

export interface AnalysisResult {
  riskLevel: RiskLevel;
  riskScore: number; // 0-100
  summary: string;
  keyRisks: RiskFactor[];
  mitigationPlan: string; // Markdown content
}

export interface ProjectData {
  projectName: string;
  phase: string;
  description: string;
  clashStatus: string;
  coordinationStatus: string;
  infoDeliveryStatus: string;
}

export const INITIAL_PROJECT_DATA: ProjectData = {
  projectName: "",
  phase: "Design Development",
  description: "",
  clashStatus: "",
  coordinationStatus: "",
  infoDeliveryStatus: ""
};
