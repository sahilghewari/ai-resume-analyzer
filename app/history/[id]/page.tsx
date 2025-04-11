"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ResumeHistory, getAnalysisById } from "@/lib/historyStorage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Calendar, BarChart2 } from "lucide-react"
import Navbar from "@/components/navbar"
import AnalysisDashboard from "@/app/ai-analyzer/components/analysis-dashboard"

export default function ViewAnalysis() {
  const params = useParams()
  const router = useRouter()
  const [analysis, setAnalysis] = useState<ResumeHistory | null>(null)

  useEffect(() => {
    const id = params.id as string
    const data = getAnalysisById(id)
    if (!data) {
      router.push('/history')
    }
    setAnalysis(data)
  }, [params.id, router])

  if (!analysis) return null

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/history')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to History
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <FileText className="h-6 w-6" />
              {analysis.fileName}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(analysis.timestamp).toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="font-medium">ATS Score: {analysis.atsScore}</span>
            </div>
            {analysis.jobTitle && (
              <div className="text-sm">
                <span className="font-medium">Job Title:</span> {analysis.jobTitle}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8">
          <AnalysisDashboard
            result={analysis.analysisResult}
            isAnalyzing={false}
          />
        </div>
      </div>
    </div>
  )
}
