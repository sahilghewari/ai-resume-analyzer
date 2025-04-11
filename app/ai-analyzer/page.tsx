"use client"

import { useState, useRef } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UploadSection from "@/app/ai-analyzer/components/upload-section"
import AnalysisDashboard from "@/app/ai-analyzer/components/analysis-dashboard"
import JobMatching from "@/app/ai-analyzer/components/job-matching"
import AiEnhancement from "@/app/ai-analyzer/components/ai-enhancement"
import CoverLetterGenerator from "@/app/ai-analyzer/components/cover-letter-generator"
import ResumePreview from "@/app/ai-analyzer/components/resume-preview"

import { pdfjs } from 'react-pdf';

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.min.mjs';
}

// Analysis result type
type AnalysisResult = {
  atsScore: number;
  format: { score: number; feedback: string[]; improvements: string[] };
  content: { score: number; strengths: string[]; weaknesses: string[]; suggestions: string[] };
  keywords: { score: number; missing: string[]; present: string[]; recommended: string[] };
  improvements: { critical: string[]; important: string[]; optional: string[] };
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const genAI = useRef(new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!));

  // Handle file upload and read content
  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    try {
      const content = await readFileContent(uploadedFile);
      setFileContent(content);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const formatResumeText = (sections: { [key: string]: string[] }): string => {
    const orderedSections = [
      'header',
      'summary',
      'objective',
      'experience',
      'work_experience',
      'professional_experience',
      'education',
      'skills',
      'projects',
      'certifications',
      'awards',
      'unclassified'
    ];

    return orderedSections
      .filter(section => sections[section]?.length > 0)
      .map(section => {
        const content = sections[section]
          .join(' ')
          .replace(/\s+/g, ' ')
          .replace(/[^\w\s.,;:-]/g, '') // Remove special characters except basic punctuation
          .trim();

        const sectionTitle = section.toUpperCase().replace(/_/g, ' ');
        return `### ${sectionTitle} ###\n${content}\n`;
      })
      .join('\n\n');
  };

  const readFileContent = async (file: File): Promise<string> => {
    if (file.type === 'application/pdf') {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await pdfjs.getDocument({
          data: arrayBuffer,
          useWorker: true,
        }).promise;

        let sections: { [key: string]: string[] } = {
          header: [],
          unclassified: []
        };
        let currentSection = 'unclassified';

        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const textContent = await page.getTextContent();
          const items = textContent.items as { str: string; transform: number[]; }[];

          let lastY = 0;
          let lineBuffer: string[] = [];

          // Group text by vertical position for better line detection
          items.forEach((item, index) => {
            const [, , , y] = item.transform;
            const text = item.str.trim();

            if (!text) return;

            // New line detection
            if (lastY && Math.abs(y - lastY) > 5) {
              if (lineBuffer.length > 0) {
                const line = lineBuffer.join(' ').trim();
                if (line.length > 2) {
                  // Detect section headers
                  if (/^[A-Z\s]{3,}$/.test(line) || line.toUpperCase() === line) {
                    currentSection = line.toLowerCase().replace(/\s+/g, '_');
                    sections[currentSection] = sections[currentSection] || [];
                  } else {
                    sections[currentSection].push(line);
                  }
                }
              }
              lineBuffer = [];
            }

            lineBuffer.push(text);
            lastY = y;
          });

          // Handle last line
          if (lineBuffer.length > 0) {
            sections[currentSection].push(lineBuffer.join(' ').trim());
          }
        }

        const formattedText = formatResumeText(sections);
        console.log('Formatted resume text:', formattedText); // For debugging
        return formattedText;

      } catch (error) {
        console.error('PDF parsing error:', error);
        throw new Error('Unable to extract text from PDF. Please ensure it contains selectable text.');
      }
    } else {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
      });
    }
  };

  const handleAnalysis = async () => {
    if (!fileContent || !jobDescription) {
      alert("Please provide both resume and job description");
      return;
    }

    setIsAnalyzing(true);
    try {
      const model = genAI.current.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `As an ATS system expert, analyze this resume. The content is structured in sections.
      Provide detailed feedback on formatting, content, and ATS compatibility.
      
      Job Description: ${jobDescription}

      Resume Content (with sections):
      ${fileContent}

      Return analysis in this exact JSON format:
      {
        "atsScore": <0-100>,
        "format": {
          "score": <0-100>,
          "feedback": ["Analysis of each section's formatting", "Section organization feedback"],
          "improvements": ["Section-specific formatting suggestions"]
        },
        "content": {
          "score": <0-100>,
          "strengths": ["Strong points in each section"],
          "weaknesses": ["Areas needing improvement by section"],
          "suggestions": ["Section-specific improvement suggestions"]
        },
        "keywords": {
          "score": <0-100>,
          "missing": ["Keywords not found in any section"],
          "present": ["Keywords found and their sections"],
          "recommended": ["Suggested keywords for specific sections"]
        },
        "improvements": {
          "critical": ["Highest priority section changes"],
          "important": ["Important section enhancements"],
          "optional": ["Optional section improvements"]
        }
      }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();
      
      try {
        // Clean and parse the response
        const cleanJson = text.replace(/^```json\s*/, '').replace(/```$/, '').trim();
        const analysisData = JSON.parse(cleanJson);
        
        // Ensure all arrays have content
        const ensureArrayContent = (arr: string[]) => 
          arr.length === 0 ? ["No specific items identified"] : arr;

        // Add default message if analysis returns empty arrays
        const processedData = {
          ...analysisData,
          format: {
            ...analysisData.format,
            feedback: ensureArrayContent(analysisData.format.feedback),
            improvements: ensureArrayContent(analysisData.format.improvements)
          },
          content: {
            ...analysisData.content,
            strengths: ensureArrayContent(analysisData.content.strengths),
            weaknesses: ensureArrayContent(analysisData.content.weaknesses),
            suggestions: ensureArrayContent(analysisData.content.suggestions)
          },
          keywords: {
            ...analysisData.keywords,
            missing: ensureArrayContent(analysisData.keywords.missing),
            present: ensureArrayContent(analysisData.keywords.present),
            recommended: ensureArrayContent(analysisData.keywords.recommended)
          },
          improvements: {
            ...analysisData.improvements,
            critical: ensureArrayContent(analysisData.improvements.critical),
            important: ensureArrayContent(analysisData.improvements.important),
            optional: ensureArrayContent(analysisData.improvements.optional)
          }
        };
        
        setAnalysisResult(processedData);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.log('Raw response:', text);
        alert('Failed to parse analysis results. Please try again.');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Resume Analyzer</h1>
        <p className="text-muted-foreground">AI-powered resume analysis and enhancement</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UploadSection 
            onFileUpload={handleFileUpload}
            onJobDescriptionChange={setJobDescription}
            onAnalyze={handleAnalysis}
            isAnalyzing={isAnalyzing}
          />
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="job-matching">Job Matching</TabsTrigger>
              <TabsTrigger value="ai-enhancement">AI Enhancement</TabsTrigger>
              <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
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
            <TabsContent value="preview">
              <ResumePreview file={file} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

