export interface SavedResume {
  id: string;
  lastModified: number;
  name: string;
  data: ResumeData;
  templateId: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    description: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string;
    link: string;
  }>;
}

const RESUMES_KEY = 'user_resumes';
const CURRENT_RESUME_KEY = 'current_resume';
const AUTO_SAVE_DELAY = 1000; // 1 second

export const saveResume = (resume: SavedResume) => {
  const resumes = getResumes();
  const existingIndex = resumes.findIndex(r => r.id === resume.id);
  
  if (existingIndex >= 0) {
    resumes[existingIndex] = resume;
  } else {
    resumes.unshift(resume);
  }
  
  localStorage.setItem(RESUMES_KEY, JSON.stringify(resumes));
};

export const getResumes = (): SavedResume[] => {
  const saved = localStorage.getItem(RESUMES_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const getCurrentResume = (): SavedResume | null => {
  const saved = localStorage.getItem(CURRENT_RESUME_KEY);
  return saved ? JSON.parse(saved) : null;
};

export const setCurrentResume = (resume: SavedResume) => {
  localStorage.setItem(CURRENT_RESUME_KEY, JSON.stringify(resume));
};

export const createNewResume = (): SavedResume => {
  return {
    id: `resume_${Date.now()}`,
    lastModified: Date.now(),
    name: 'Untitled Resume',
    templateId: 'modern',
    data: {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        website: ''
      },
      summary: '',
      experience: [],
      education: [],
      skills: [],
      projects: []
    }
  };
};

export const getAutoSaveDebounce = (callback: () => void) => {
  let timeoutId: NodeJS.Timeout;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, AUTO_SAVE_DELAY);
  };
};
