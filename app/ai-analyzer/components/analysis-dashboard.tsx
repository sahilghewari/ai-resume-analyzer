"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, AlertCircle, Lightbulb, Award, Briefcase, GraduationCap, Code } from "lucide-react"
import { motion } from "framer-motion"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface AnalysisResult {
  atsScore: number;
  format: { score: number; feedback: string[]; improvements: string[] };
  content: { score: number; strengths: string[]; weaknesses: string[]; suggestions: string[] };
  keywords: { score: number; missing: string[]; present: string[]; recommended: string[] };
  improvements: { critical: string[]; important: string[]; optional: string[] };
}

interface AnalysisDashboardProps {
  isAnalyzing: boolean;
  jobDescription?: string;
  result: AnalysisResult | null;
}

export default function AnalysisDashboard({ isAnalyzing, jobDescription, result }: AnalysisDashboardProps) {
  const safeScore = (score: number | undefined) => score ?? 0;
  const safeArray = (arr: string[] | undefined) => arr || [];
  const safeObject = <T extends object>(obj: T | undefined | null): T => (
    obj || {} as T
  );

  if (!result && !isAnalyzing) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Start the analysis to see results
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <LoadingSpinner className="h-8 w-8" />
        <span className="ml-2">Analyzing your resume...</span>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-center space-y-4">
          <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">Upload a resume and job description to see analysis</p>
        </div>
      </div>
    );
  }

  const {
    atsScore = 0,
    format = { score: 0, feedback: [], improvements: [] },
    content = { 
      score: 0, 
      strengths: ['No strengths identified'], 
      weaknesses: ['No weaknesses identified'], 
      suggestions: ['No suggestions available'] 
    },
    keywords = { 
      score: 0, 
      missing: ['No missing keywords identified'], 
      present: ['No matching keywords found'], 
      recommended: ['No recommendations available'] 
    }
  } = result || {};

  const hasKeywords = keywords.missing.length > 0 || keywords.present.length > 0;
  const hasContent = content.strengths.length > 0 || content.weaknesses.length > 0;

  return (
    <div className="space-y-6">
      {jobDescription && (
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <CardDescription>The job requirements being analyzed against</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-sm text-muted-foreground">
              {jobDescription}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">ATS Compatibility</CardTitle>
            <CardDescription>How well your resume works with ATS systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pt-2">
              <div className="flex justify-between mb-1 text-sm">
                <span>Score</span>
                <span className="font-medium">{safeScore(atsScore)}%</span>
              </div>
              <div className="h-3 relative rounded-full overflow-hidden">
                <div className="w-full h-full bg-primary/20 absolute"></div>
                <motion.div
                  className="h-full bg-primary absolute"
                  initial={{ width: 0 }}
                  animate={{ width: `${safeScore(atsScore)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {safeScore(atsScore) >= 70 ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                )}
                <span>
                  {safeScore(atsScore) >= 70 ? "Your resume is ATS-friendly" : "Needs improvement for ATS compatibility"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Keyword Match</CardTitle>
            <CardDescription>Matching with job description keywords</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pt-2">
              <div className="flex justify-between mb-1 text-sm">
                <span>Match</span>
                <span className="font-medium">{safeScore(safeObject(keywords).score)}%</span>
              </div>
              <div className="h-3 relative rounded-full overflow-hidden">
                <div className="w-full h-full bg-primary/20 absolute"></div>
                <motion.div
                  className="h-full bg-primary absolute"
                  initial={{ width: 0 }}
                  animate={{ width: `${safeScore(safeObject(keywords).score)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Format & Structure</CardTitle>
            <CardDescription>Resume layout and organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pt-2">
              <div className="flex justify-between mb-1 text-sm">
                <span>Score</span>
                <span className="font-medium">{safeScore(format.score)}%</span>
              </div>
              <div className="h-3 relative rounded-full overflow-hidden">
                <div className="w-full h-full bg-primary/20 absolute"></div>
                <motion.div
                  className="h-full bg-primary absolute"
                  initial={{ width: 0 }}
                  animate={{ width: `${safeScore(format.score)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {safeScore(format.score) >= 70 ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                )}
                <span>{safeScore(format.score) >= 70 ? "Excellent formatting" : "Format needs improvement"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Detailed Analysis</CardTitle>
            <CardDescription>
              {hasContent ? 'Strengths, weaknesses, and suggestions' : 'No detailed analysis available'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="strengths">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="strengths">Strengths</TabsTrigger>
                <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              </TabsList>
              <TabsContent value="strengths" className="space-y-4 pt-4">
                {safeArray(content.strengths).map((strength, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>{strength}</span>
                  </motion.div>
                ))}
              </TabsContent>
              <TabsContent value="weaknesses" className="space-y-4 pt-4">
                {safeArray(content.weaknesses).map((weakness, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <span>{weakness}</span>
                  </motion.div>
                ))}
              </TabsContent>
              <TabsContent value="suggestions" className="space-y-4 pt-4">
                {safeArray(content.suggestions).map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                    <span>{suggestion}</span>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Missing Skills</CardTitle>
            <CardDescription>
              {hasKeywords ? 
                'Skills mentioned in the job description but missing from your resume' : 
                'No missing skills identified'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {keywords.missing.length > 0 ? (
                keywords.missing.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-primary" />
                      <span>{skill}</span>
                    </div>
                    <Badge variant="destructive">Missing</Badge>
                  </motion.div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  No missing skills identified
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Section Analysis</CardTitle>
          <CardDescription>Detailed breakdown of each resume section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {safeArray(format.feedback).map((feedback, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">{`Section ${index + 1}`}</h3>
                </div>
                <Progress value={safeScore(format.score)} className="h-2" />
                <p className="text-sm text-muted-foreground">{feedback}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

