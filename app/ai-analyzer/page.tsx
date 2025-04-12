"use client"

import { useState, useRef } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UploadSection from "@/app/ai-analyzer/components/upload-section"
import AnalysisDashboard from "@/app/ai-analyzer/components/analysis-dashboard"
import JobMatching from "@/app/ai-analyzer/components/job-matching"
import AiEnhancement from "@/app/ai-analyzer/components/ai-enhancement"
import CoverLetterGenerator from "@/app/ai-analyzer/components/cover-letter-generator"
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { saveAnalysis } from "@/lib/historyStorage"
import { extractTextFromPDF } from "@/lib/pdfParser"
import { extractPDFText } from "@/lib/pdfUtils"

// Analysis result type
type AnalysisResult = {
  atsScore: number;
  format: { score: number; feedback: string[]; improvements: string[] };
  content: { score: number; strengths: string[]; weaknesses: string[]; suggestions: string[] };
  keywords: { score: number; missing: string[]; present: string[]; recommended: string[] };
  improvements: { critical: string[]; important: string[]; optional: string[] };
}

interface ParsedResumeData {
  basicInfo: {
    name: string;
    email: string;
    phone: string;
    title?: string;
    linkedin?: string;
  };
  summary?: string;
  experience: Array<{
    company: string;
    title: string;
    duration: string;
    highlights: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    duration: string;
    details?: string[];
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [parsedResumeData, setParsedResumeData] = useState<ParsedResumeData | null>(null);
  const genAI = useRef(new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!));

  // Handle file upload and read content
  const handleFileUpload = async (uploadedFile: File | null, content?: string) => {
    if (!uploadedFile) {
      console.log('No file provided');
      return;
    }

    try {
      setFile(uploadedFile);
      console.log('Processing file:', uploadedFile.name);

      if (uploadedFile.type === 'application/pdf') {
        const pdfText = await extractPDFText(uploadedFile);
        setFileContent(pdfText);
        console.log('PDF processed successfully, content length:', pdfText.length);
      } else {
        setFileContent(content || '');
      }

      // Continue with resume parsing
      const parsedData = await parseResume(uploadedFile);
      setParsedResumeData(parsedData);

    } catch (error) {
      console.error('File processing failed:', error);
      setErrorMessage(
        error.message.includes('scanned') 
          ? 'Please upload a PDF with selectable text, not a scanned document.'
          : 'Failed to process the PDF. Please try another file.'
      );
      setFile(null);
      setFileContent('');
    }
  };

  const readFileContent = async (file: File): Promise<string> => {
    console.log('Reading file:', file.name, file.type);
    
    try {
      if (file.type === 'application/pdf') {
        console.log('Processing PDF file');
        const text = await extractPDFText(file);
        console.log('PDF content extracted, length:', text.length);
        return text;
      } else {
        console.log('Processing text file');
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result as string;
            console.log('Text file content length:', content.length);
            resolve(content);
          };
          reader.onerror = (e) => {
            console.error('File read error:', e);
            reject(new Error('Failed to read file'));
          };
          reader.readAsText(file);
        });
      }
    } catch (error) {
      console.error('File reading error:', error);
      throw new Error(`Failed to read file: ${error.message}`);
    }
  };

  const parseResume = async (file: File): Promise<ParsedResumeData> => {
    const content = await readFileContent(file);
    
    // Use Gemini to parse and structure the resume content
    const model = genAI.current.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Parse this resume content into a structured format:
    ${content}

    Return a JSON object that matches this structure:
    {
      "basicInfo": {
        "name": "extracted name",
        "email": "extracted email",
        "phone": "extracted phone",
        "title": "extracted job title",
        "linkedin": "extracted linkedin (if present)"
      },
      "summary": "extracted summary",
      "experience": [{
        "company": "company name",
        "title": "job title",
        "duration": "time period",
        "highlights": ["achievement 1", "achievement 2"]
      }],
      "education": [{
        "school": "institution name",
        "degree": "degree name",
        "duration": "time period",
        "details": ["relevant detail 1", "relevant detail 2"]
      }],
      "skills": ["skill 1", "skill 2"],
      "projects": [{
        "name": "project name",
        "description": "project description",
        "technologies": ["tech 1", "tech 2"],
        "url": "project url (if present)"
      }]
    }`;

    const response = await model.generateContent(prompt);
    const parsed = cleanAndParseJSON(response.response.text());
    return parsed;
  };

  const handleJobDescriptionChange = (description: string) => {
    setJobDescription(description);
    setErrorMessage('');
  };

  const cleanAndParseJSON = (text: string) => {
    // Remove markdown code block syntax
    let cleaned = text.replace(/```json\s*/, '').replace(/```\s*$/, '');
    
    // Fix common JSON issues
    cleaned = cleaned.replace(/,\s*([}\]])/g, '$1') // Remove trailing commas
                    .replace(/\/\/[^\n]*/g, '') // Remove single-line comments
                    .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments
    
    try {
      return JSON.parse(cleaned);
    } catch (e) {
      console.error('Initial parse failed, attempting to fix JSON:', e);
      // If still fails, try more aggressive cleaning
      cleaned = cleaned.replace(/[\n\r\t]/g, ' ') // Remove newlines and tabs
                      .replace(/\s+/g, ' ') // Normalize spaces
                      .replace(/"\s+}/g, '"}') // Fix spacing issues
                      .replace(/"\s+]/g, '"]'); // Fix array spacing issues
      return JSON.parse(cleaned);
    }
  };

  const handleAnalysis = async () => {
    if (!fileContent || !jobDescription) {
      setErrorMessage('Please provide both resume and job description');
      return;
    }

    setIsAnalyzing(true);
    try {
      const model = genAI.current.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Analyze this resume against the job description. Focus on identifying specific strengths and requirements matching.

      RESUME:
      ${fileContent}

      JOB DESCRIPTION:
      ${jobDescription}

      Analyze and return JSON with focus on requirements matching:
      {
        "atsScore": <0-100>,
        "format": {
          "score": <0-100>,
          "sections": {
            "summary": {"present": boolean, "quality": <0-100>, "feedback": "specific feedback"},
            "experience": {"present": boolean, "quality": <0-100>, "feedback": "specific feedback"},
            "education": {"present": boolean, "quality": <0-100>, "feedback": "specific feedback"},
            "skills": {"present": boolean, "quality": <0-100>, "feedback": "specific feedback"}
          },
          "feedback": ["overall format feedback"],
          "improvements": ["format improvement suggestions"]
        },
        "content": {
          "score": <0-100>,
          "strengths": ["specific strength with section reference"],
          "weaknesses": ["specific weakness with section reference"],
          "suggestions": ["actionable content suggestions"]
        },
        "keywords": {
          "score": <0-100>,
          "missing": ["missing required skills"],
          "present": ["found matching skills"],
          "recommended": ["recommended additions"]
        },
        "improvements": {
          "critical": ["highest priority changes"],
          "important": ["medium priority changes"],
          "optional": ["nice-to-have changes"]
        },
        "requirements": {
          "items": [
            {
              "requirement": "specific requirement from job description",
              "satisfied": boolean,
              "score": number 0-100,
              "feedback": "detailed feedback about match"
            }
          ]
        }
      }`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      try {
        const cleanJson = text.replace(/```json\s*|\s*```/g, '').trim();
        const analysisData = JSON.parse(cleanJson);
        
        // Transform data to include section analysis
        const transformedData = {
          ...analysisData,
          sections: analysisData.format.sections || {},
          format: {
            ...analysisData.format,
            score: analysisData.format.score || 0,
            feedback: Array.isArray(analysisData.format.feedback) ? analysisData.format.feedback : [],
            improvements: Array.isArray(analysisData.format.improvements) ? analysisData.format.improvements : []
          }
        };

        setAnalysisResult(transformedData);
        
        // Save to history
        saveAnalysis({
          fileName: file?.name || 'Untitled Resume',
          jobTitle: jobDescription.split('\n')[0]?.substring(0, 50) || 'Untitled Job',
          atsScore: transformedData.atsScore,
          analysisResult: transformedData
        });

      } catch (error) {
        console.error('Analysis parsing failed:', error);
        setErrorMessage('Failed to analyze resume. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="">
      <Navbar />
      <div className="container mx-auto mt-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Resume Analyzer</h1>
          <p className="text-muted-foreground">AI-powered resume analysis and enhancement</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <UploadSection 
              onFileUpload={handleFileUpload}
              onJobDescriptionChange={handleJobDescriptionChange}
              onAnalyze={handleAnalysis}
              isAnalyzing={isAnalyzing}
              errorMessage={errorMessage}
            />
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="analysis" className="w-full">

            
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="job-matching">Job Matching</TabsTrigger>
                <TabsTrigger value="ai-enhancement">AI Enhancement</TabsTrigger>
                <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
              </TabsList>
              <TabsContent value="analysis">
                <AnalysisDashboard 
                  isAnalyzing={isAnalyzing}
                  result={analysisResult}
                />
              </TabsContent>
              <TabsContent value="job-matching">
                <JobMatching 
                  result={analysisResult}
                  jobDescription={jobDescription}
                />
              </TabsContent>
              <TabsContent value="ai-enhancement">
                <AiEnhancement 
                  result={analysisResult}
                  onEnhance={handleAnalysis}
                />
              </TabsContent>
              <TabsContent value="cover-letter">
                <CoverLetterGenerator 
                  resumeData={file}
                  jobDescription={jobDescription}
                  aiModel={genAI.current}
                />
              </TabsContent>
              
            </Tabs>
          </div>
        </div>
      </div>
      <Footer  />
    </main>
  )
}

