export interface DecisionOption {
  id: string;
  name: string;
  pros: string;
  cons: string;
}

export interface DecisionFormData {
  title: string;
  options: DecisionOption[];
  priorities: string[];
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface DecisionResult {
  recommendedOption: string;
  confidenceScore: number;
  reasoning: string;
  risks: string[];
  alternativeOption?: string;
  alternativeReasoning?: string;
}

export type AppState = 'form' | 'loading' | 'result';
