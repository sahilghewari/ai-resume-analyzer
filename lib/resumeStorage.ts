const CURRENT_RESUME_KEY = 'current_resume_v1';

export interface SavedResume {
  id: string;
  name: string;
  createdAt: number;
  lastModified: number;
  data: any;
  templateId: string;
}

function createNewResume(): SavedResume {
  return {
    id: `resume_${Date.now()}`,
    name: 'Untitled Resume',
    createdAt: Date.now(),
    lastModified: Date.now(),
    data: {},  // Initialize with empty object instead of null
    templateId: 'modern'
  };
}

function getCurrentResume(): SavedResume | null {
  try {
    const saved = localStorage.getItem(CURRENT_RESUME_KEY);
    if (!saved) return null;
    
    const resume = JSON.parse(saved);
    // Ensure data object exists
    resume.data = resume.data || {};
    return resume;
  } catch {
    return null;
  }
}

function setCurrentResume(resume: SavedResume | null): void {
  if (resume) {
    localStorage.setItem(CURRENT_RESUME_KEY, JSON.stringify(resume));
  } else {
    localStorage.removeItem(CURRENT_RESUME_KEY);
  }
}

function saveResume(resume: SavedResume): SavedResume {
  const updatedResume = {
    ...resume,
    lastModified: Date.now(),
    name: resume.data?.personalInfo?.name || 'Untitled Resume'
  };
  
  setCurrentResume(updatedResume);
  return updatedResume;
}

function getAutoSaveDebounce(callback: () => void, delay = 1000) {
  let timeoutId: NodeJS.Timeout;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}

// Single export statement for all functions
export {  createNewResume,  getCurrentResume,  setCurrentResume,  saveResume,  getAutoSaveDebounce};