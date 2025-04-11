export interface ResumeHistory {
  id: string;
  timestamp: number;
  fileName: string;
  jobTitle?: string;
  atsScore: number;
  analysisResult: any;
}

const HISTORY_KEY = 'resume_analysis_history';

export const saveAnalysis = (analysis: Omit<ResumeHistory, 'id' | 'timestamp'>) => {
  const history = getHistory();
  const newEntry = {
    ...analysis,
    id: generateId(),
    timestamp: Date.now(),
  };
  
  history.unshift(newEntry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return newEntry;
};

export const getHistory = (): ResumeHistory[] => {
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

export const deleteAnalysis = (id: string) => {
  const history = getHistory().filter(item => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getAnalysisById = (id: string): ResumeHistory | null => {
  const history = getHistory();
  return history.find(item => item.id === id) || null;
};

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);
