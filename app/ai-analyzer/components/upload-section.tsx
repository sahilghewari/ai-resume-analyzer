"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Check, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  onJobDescriptionChange: (description: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export default function UploadSection({ 
  onFileUpload, 
  onJobDescriptionChange, 
  onAnalyze, 
  isAnalyzing 
}: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.type.includes("word"))) {
      handleFileUpload(droppedFile)
    } else {
      setUploadStatus("error")
      setTimeout(() => setUploadStatus("idle"), 3000)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    setFile(file)
    setUploadStatus("uploading")
    onFileUpload(file) // Pass file to parent

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setUploadStatus("success")
      }
    }, 100)
  }

  // Update job description handler
  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setJobDescription(value)
    onJobDescriptionChange(value)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upload Resume</CardTitle>
        <CardDescription>Drag and drop your resume or click to browse</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-all duration-200 text-center",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20",
            uploadStatus === "success" ? "border-green-500 bg-green-500/5" : "",
            uploadStatus === "error" ? "border-red-500 bg-red-500/5" : "",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          <AnimatePresence mode="wait">
            {uploadStatus === "idle" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <Upload className="h-8 w-8 text-primary" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium mb-1">PDF or Word documents only</p>
                  <p className="text-xs text-muted-foreground">Max file size: 5MB</p>
                </div>
                <Button asChild>
                  <label htmlFor="resume-upload">Browse Files</label>
                </Button>
              </motion.div>
            )}

            {uploadStatus === "uploading" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 w-full"
              >
                <FileText className="h-8 w-8 text-primary animate-pulse" />
                <div className="w-full">
                  <p className="text-sm font-medium mb-2">Uploading {file?.name}...</p>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              </motion.div>
            )}

            {uploadStatus === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">{file?.name} uploaded successfully!</p>
                  <p className="text-xs text-muted-foreground mt-1">Your resume is being analyzed...</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setUploadStatus("idle")}>
                  Upload Another
                </Button>
              </motion.div>
            )}

            {uploadStatus === "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Upload failed</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Please ensure your file is a PDF or Word document under 5MB
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setUploadStatus("idle")}>
                  Try Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {uploadStatus === "success" && (
          <div className="mt-6 space-y-4">
            <Card className="bg-muted/50 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium truncate">{file?.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Remove file</span>
                    <AlertCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Job Description</CardTitle>
                <CardDescription>Paste the job description here for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full min-h-[200px] p-3 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Paste job description here..."
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button 
                size="sm" 
                disabled={!jobDescription.trim() || isAnalyzing}
                onClick={onAnalyze}
              >
                {isAnalyzing ? "Analyzing..." : "Start Analysis"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

