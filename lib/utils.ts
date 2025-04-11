import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const SAVED_RESUMES_KEY = 'saved_resumes';

export interface SavedResume {
  id: string;
  name: string;
  createdAt: number;
  lastModified: number;
  data: any;
  template: string;
}

export function saveResume(resume: Omit<SavedResume, 'id' | 'createdAt'>) {
  const resumes = getSavedResumes();
  const newResume = {
    ...resume,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: Date.now(),
  };
  
  resumes.unshift(newResume);
  localStorage.setItem(SAVED_RESUMES_KEY, JSON.stringify(resumes));
  return newResume;
}

export function getSavedResumes(): SavedResume[] {
  const saved = localStorage.getItem(SAVED_RESUMES_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function deleteResume(id: string) {
  const resumes = getSavedResumes();
  const filtered = resumes.filter(resume => resume.id !== id);
  localStorage.setItem(SAVED_RESUMES_KEY, JSON.stringify(filtered));
}
