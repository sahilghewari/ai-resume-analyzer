"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Upload, FileText, AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Add these imports at the top of the file
import { motion, AnimatePresence } from "framer-motion"
import GlowingProgressRing from "@/components/animations/glowing-progress-ring"
import TypingEffect from "@/components/animations/typing-effect"
import { useSearchParams } from "next/navigation"

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [atsScore, setAtsScore] = useState(0)
  const searchParams = useSearchParams()

  // Add these state variables after the existing ones
  const [analysisSteps, setAnalysisSteps] = useState<string[]>([])
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState(0)
  const [resumeTitle, setResumeTitle] = useState("")

  // Check if we're re-analyzing an existing resume
  useEffect(() => {
    const resumeId = searchParams.get("id")
    if (resumeId) {
      // In a real app, we would fetch the resume data from an API
      // For now, we'll just simulate having a file
      setFile(new File(["dummy content"], "resume.pdf", { type: "application/pdf" }))
      setResumeTitle("Software Engineer Resume")
    }
  }, [searchParams])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setAnalysisComplete(false)
      setResumeTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ""))
    }
  }

  // Replace the existing handleAnalyze function with this animated version
  const handleAnalyze = () => {
    if (!file) return

    setIsAnalyzing(true)
    setAnalysisSteps([
      "Scanning document structure...",
      "Analyzing experience section...",
      "Checking education details...",
      "Evaluating skills relevance...",
      "Testing ATS compatibility...",
      "Generating recommendations...",
    ])

    // Simulate analysis process with animated steps
    let progress = 0
    let currentStep = 0
    const interval = setInterval(() => {
      progress += 5
      setAtsScore(progress)

      if (progress % 20 === 0 && currentStep < 5) {
        currentStep++
        setCurrentAnalysisStep(currentStep)
      }

      if (progress >= 78) {
        clearInterval(interval)
        setIsAnalyzing(false)
        setAnalysisComplete(true)
      }
    }, 300)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-10 px-4 bg-background transition-theme">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Resume Analyzer</h1>
          <p className="text-lg text-muted-foreground mb-10">
            Upload your resume and get AI-powered feedback to improve your chances of landing interviews.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Resume</CardTitle>
                  <CardDescription>Supported formats: PDF, DOCX</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="resume-upload"
                      className="hidden"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        {file ? file.name : "Drag and drop your resume here or click to browse"}
                      </p>
                      {file && <p className="text-xs text-brand-600 dark:text-brand-400">File selected: {file.name}</p>}
                    </label>
                  </div>

                  <Button
                    className="w-full mt-6 bg-brand-600 hover:bg-brand-700 text-white dark:bg-brand-500 dark:hover:bg-brand-600 transition-colors"
                    onClick={handleAnalyze}
                    disabled={!file || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        {searchParams.get("id") ? "Re-analyze Resume" : "Analyze Resume"}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {!file && !analysisComplete ? (
                <div className="h-full flex items-center justify-center bg-card rounded-lg shadow-sm p-10">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-foreground mb-2">No Resume Uploaded</h3>
                    <p className="text-muted-foreground">
                      Upload your resume to get AI-powered feedback and suggestions.
                    </p>
                  </div>
                </div>
              ) : isAnalyzing ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Analyzing Your Resume</CardTitle>
                    <CardDescription>Our AI is reviewing your resume. This will take just a moment...</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="flex flex-col items-center justify-center py-8">
                      <GlowingProgressRing value={atsScore} size={160} className="mb-8" />

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentAnalysisStep}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="text-brand-600 dark:text-brand-400 font-medium mb-8 h-6"
                        >
                          <TypingEffect text={analysisSteps[currentAnalysisStep]} speed={30} />
                        </motion.div>
                      </AnimatePresence>

                      <div className="w-full max-w-md bg-secondary/50 dark:bg-secondary/30 rounded-lg p-4">
                        <div className="text-sm text-muted-foreground mb-2">Analysis Progress</div>
                        <Progress value={atsScore} className="h-2 mb-1" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Scanning</span>
                          <span>Processing</span>
                          <span>Finalizing</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : analysisComplete ? (
                <Tabs defaultValue="overview">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="keywords">Keywords</TabsTrigger>
                    <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <Card>
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                          <div>
                            <CardTitle className="flex items-center">
                              <span>{resumeTitle || "Resume Analysis"}</span>
                            </CardTitle>
                            <CardDescription>ATS Compatibility Score</CardDescription>
                          </div>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">{atsScore}%</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-6">
                          <Progress value={atsScore} className="h-2 mb-2" />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Needs Improvement</span>
                            <span>Good</span>
                            <span>Excellent</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <Alert variant={atsScore > 70 ? "default" : "destructive"}>
                              <CheckCircle className="h-4 w-4" />
                              <AlertTitle>Format Analysis</AlertTitle>
                              <AlertDescription>
                                Your resume format is clean and ATS-friendly. Good job!
                              </AlertDescription>
                            </Alert>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            <Alert variant={atsScore > 60 ? "default" : "destructive"}>
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Content Analysis</AlertTitle>
                              <AlertDescription>
                                Your experience descriptions could use more quantifiable achievements.
                              </AlertDescription>
                            </Alert>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <Alert variant={atsScore > 50 ? "default" : "destructive"}>
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Keyword Analysis</AlertTitle>
                              <AlertDescription>
                                Your resume is missing some key industry terms that employers look for.
                              </AlertDescription>
                            </Alert>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="content">
                    <Card>
                      <CardHeader>
                        <CardTitle>Content Analysis</CardTitle>
                        <CardDescription>Detailed feedback on your resume's content</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-2">Experience Section</h3>
                            <p className="text-muted-foreground mb-2">
                              Your experience section is well-structured but could use more impact statements.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                              <li>Add more quantifiable achievements (numbers, percentages, metrics)</li>
                              <li>Use more action verbs at the beginning of bullet points</li>
                              <li>Focus on results rather than just responsibilities</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-2">Skills Section</h3>
                            <p className="text-muted-foreground mb-2">
                              Your skills section is comprehensive but could be better organized.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                              <li>Group similar skills together (e.g., technical, soft, language)</li>
                              <li>Prioritize skills mentioned in the job descriptions you're targeting</li>
                              <li>Remove outdated or irrelevant skills</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-2">Education Section</h3>
                            <p className="text-muted-foreground mb-2">
                              Your education section is clear and well-formatted.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                              <li>Consider adding relevant coursework if you're a recent graduate</li>
                              <li>Include GPA if it's above 3.5</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="keywords">
                    <Card>
                      <CardHeader>
                        <CardTitle>Keyword Analysis</CardTitle>
                        <CardDescription>How well your resume matches industry keywords</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-3">Missing Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                              {[
                                "project management",
                                "agile",
                                "scrum",
                                "stakeholder management",
                                "cross-functional",
                                "KPIs",
                              ].map((keyword) => (
                                <div
                                  key={keyword}
                                  className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-3 py-1 rounded-full text-sm"
                                >
                                  {keyword}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-3">Present Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                              {[
                                "leadership",
                                "communication",
                                "analytics",
                                "strategy",
                                "team management",
                                "budget",
                              ].map((keyword) => (
                                <div
                                  key={keyword}
                                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-sm"
                                >
                                  {keyword}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-2">Industry-Specific Recommendations</h3>
                            <p className="text-muted-foreground mb-2">
                              Based on your target industry, consider adding these keywords:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {[
                                "data-driven",
                                "ROI",
                                "cross-platform",
                                "digital transformation",
                                "customer journey",
                              ].map((keyword) => (
                                <div
                                  key={keyword}
                                  className="bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200 px-3 py-1 rounded-full text-sm"
                                >
                                  {keyword}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="suggestions">
                    <Card>
                      <CardHeader>
                        <CardTitle>Improvement Suggestions</CardTitle>
                        <CardDescription>Actionable recommendations to enhance your resume</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 rounded-lg">
                            <h3 className="text-lg font-medium text-amber-800 dark:text-amber-400 mb-2">
                              High Priority
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-amber-800 dark:text-amber-300">
                              <li>
                                Add metrics to your achievements (e.g., "Increased sales by 20%" instead of "Increased
                                sales")
                              </li>
                              <li>Include the missing keywords identified in the Keywords tab</li>
                              <li>Shorten your resume to 1-2 pages by removing redundant information</li>
                            </ul>
                          </div>

                          <div className="p-4 border border-brand-200 bg-brand-50 dark:bg-brand-950/20 dark:border-brand-900 rounded-lg">
                            <h3 className="text-lg font-medium text-brand-800 dark:text-brand-400 mb-2">
                              Medium Priority
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-brand-800 dark:text-brand-300">
                              <li>Reorganize your skills section to highlight the most relevant skills first</li>
                              <li>Use more powerful action verbs at the beginning of bullet points</li>
                              <li>Add a brief professional summary that highlights your unique value proposition</li>
                            </ul>
                          </div>

                          <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 rounded-lg">
                            <h3 className="text-lg font-medium text-green-800 dark:text-green-400 mb-2">
                              Additional Enhancements
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-green-800 dark:text-green-300">
                              <li>Consider adding a section for certifications or professional development</li>
                              <li>Include links to your professional profiles or portfolio</li>
                              <li>
                                Tailor your resume for specific job applications by emphasizing relevant experience
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                          <Button className="bg-brand-600 hover:bg-brand-700 text-white dark:bg-brand-500 dark:hover:bg-brand-600 transition-colors">
                            Apply Suggestions to Resume
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
