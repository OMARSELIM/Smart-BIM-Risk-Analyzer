import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ProjectData, AnalysisResult, RiskLevel } from "../types";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    riskLevel: {
      type: Type.STRING,
      enum: ["Low", "Medium", "High", "Critical"],
      description: "Overall risk level of the project based on inputs."
    },
    riskScore: {
      type: Type.INTEGER,
      description: "A numerical score from 0 to 100 representing the risk (100 is highest risk)."
    },
    summary: {
      type: Type.STRING,
      description: "A concise executive summary of the risk analysis."
    },
    keyRisks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: "e.g., Coordination, Clashes, Information, Responsibilities" },
          description: { type: Type.STRING },
          severity: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] }
        },
        required: ["category", "description", "severity"]
      }
    },
    mitigationPlan: {
      type: Type.STRING,
      description: "A detailed mitigation plan in Markdown format, addressing the specific risks found."
    }
  },
  required: ["riskLevel", "riskScore", "summary", "keyRisks", "mitigationPlan"]
};

export const analyzeBIMRisk = async (data: ProjectData): Promise<AnalysisResult> => {
  const prompt = `
    Analyze the following BIM project data for risks.
    
    Project Name: ${data.projectName}
    Project Phase: ${data.phase}
    
    Context & Observations:
    ${data.description}
    
    Specific Inputs:
    - Clash Status: ${data.clashStatus}
    - Coordination Status: ${data.coordinationStatus}
    - Information Delivery/Timeline: ${data.infoDeliveryStatus}
    
    FOCUS AREAS:
    1. Poor Coordination (Team silos, lack of communication).
    2. Information Delays (Late models, missing data drops).
    3. Heavy Clashes in Advanced Stages (e.g., many clashes in Construction Documentation is Critical).
    4. Unclear Responsibilities (BEP ambiguity).

    Provide a professional risk assessment for a BIM Manager.
    If the input is in Arabic, please provide the 'summary' and 'mitigationPlan' in Arabic, but keep the schema keys (like riskLevel) in English.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are a Senior BIM Manager and Risk Analyst Expert (ISO 19650 compliant). You evaluate project health based on coordination, geometry, and data maturity."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
