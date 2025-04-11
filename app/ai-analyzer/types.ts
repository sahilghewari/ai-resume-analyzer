export type AnalysisResult = {
  atsScore: number;
  format: {
    score: number;
    feedback: string[];
    improvements: string[];
  };
  content: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  keywords: {
    score: number;
    missing: string[];
    present: string[];
    recommended: string[];
  };
  improvements: {
    critical: string[];
    important: string[];
    optional: string[];
  };
}

export type AnalysisContextType = {
  file: File | null;
  jobDescription: string;
  isAnalyzing: boolean;
  analysisResult: AnalysisResult | null;
  onFileUpload: (file: File) => void;
  onJobDescriptionChange: (desc: string) => void;
  onAnalyze: (fileContent: string, jobDesc: string) => Promise<void>;
}
