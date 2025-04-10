"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Edit, FileText, RefreshCw, Trash2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

// Mock data for resume history
const mockResumes = [
  {
    id: "1",
    title: "Software Engineer Resume",
    createdAt: "2023-10-15T14:30:00Z",
    updatedAt: "2023-10-16T09:45:00Z",
    type: "analyzed",
    atsScore: 82,
    skillsMatch: 78,
    keywords: ["React", "Node.js", "TypeScript"],
    template: "modern",
  },
  {
    id: "2",
    title: "Product Manager Resume",
    createdAt: "2023-10-10T11:20:00Z",
    updatedAt: "2023-10-10T11:20:00Z",
    type: "built",
    atsScore: 75,
    skillsMatch: 85,
    keywords: ["Product Strategy", "Agile", "Roadmap"],
    template: "professional",
  },
  {
    id: "3",
    title: "UX Designer Resume",
    createdAt: "2023-09-28T16:15:00Z",
    updatedAt: "2023-10-05T13:40:00Z",
    type: "both",
    atsScore: 90,
    skillsMatch: 92,
    keywords: ["Figma", "User Research", "Prototyping"],
    template: "creative",
  },
  {
    id: "4",
    title: "Marketing Specialist Resume",
    createdAt: "2023-09-20T10:05:00Z",
    updatedAt: "2023-09-20T10:05:00Z",
    type: "analyzed",
    atsScore: 68,
    skillsMatch: 72,
    keywords: ["SEO", "Content Marketing", "Analytics"],
    template: "modern",
  },
  {
    id: "5",
    title: "Data Scientist Resume",
    createdAt: "2023-09-15T14:30:00Z",
    updatedAt: "2023-09-18T11:20:00Z",
    type: "built",
    atsScore: 88,
    skillsMatch: 90,
    keywords: ["Python", "Machine Learning", "SQL"],
    template: "minimal",
  },
]

export default function HistoryPage() {
  const [resumes, setResumes] = useState(mockResumes)
  const [activeTab, setActiveTab] = useState("all")

  const filteredResumes = resumes.filter((resume) => {
    if (activeTab === "all") return true
    return resume.type === activeTab || resume.type === "both"
  })

  const handleDelete = (id: string) => {
    setResumes(resumes.filter((resume) => resume.id !== id))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-10 px-4 bg-background transition-theme">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Resume History</h1>
              <p className="text-muted-foreground">View and manage your previously created and analyzed resumes</p>
            </div>
            <div className="flex gap-3">
              <Link href="/builder">
                <Button className="bg-brand-600 hover:bg-brand-700 text-white dark:bg-brand-500 dark:hover:bg-brand-600 transition-colors">
                  <FileText className="mr-2 h-4 w-4" />
                  Create New Resume
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="all">All Resumes</TabsTrigger>
              <TabsTrigger value="analyzed">Analyzed</TabsTrigger>
              <TabsTrigger value="built">Built</TabsTrigger>
            </TabsList>
          </Tabs>

          {filteredResumes.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg border border-border">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">No Resumes Found</h3>
              <p className="text-muted-foreground mb-6">
                You don't have any {activeTab !== "all" ? activeTab : ""} resumes yet.
              </p>
              <Link href={activeTab === "built" || activeTab === "all" ? "/builder" : "/analyzer"}>
                <Button className="bg-brand-600 hover:bg-brand-700 text-white dark:bg-brand-500 dark:hover:bg-brand-600 transition-colors">
                  {activeTab === "built" || activeTab === "all" ? "Create Resume" : "Analyze Resume"}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{resume.title}</CardTitle>
                        <Badge
                          variant={
                            resume.type === "analyzed" ? "secondary" : resume.type === "built" ? "outline" : "default"
                          }
                        >
                          {resume.type === "both" ? "Built & Analyzed" : resume.type === "built" ? "Built" : "Analyzed"}
                        </Badge>
                      </div>
                      <CardDescription>
                        Created: {formatDate(resume.createdAt)}
                        {resume.createdAt !== resume.updatedAt && <> • Updated: {formatDate(resume.updatedAt)}</>}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-4">
                        {(resume.type === "analyzed" || resume.type === "both") && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-secondary/50 dark:bg-secondary/30 p-3 rounded-lg text-center">
                              <div className="text-sm text-muted-foreground mb-1">ATS Score</div>
                              <div className="text-xl font-semibold text-brand-600 dark:text-brand-400">
                                {resume.atsScore}%
                              </div>
                            </div>
                            <div className="bg-secondary/50 dark:bg-secondary/30 p-3 rounded-lg text-center">
                              <div className="text-sm text-muted-foreground mb-1">Skills Match</div>
                              <div className="text-xl font-semibold text-brand-600 dark:text-brand-400">
                                {resume.skillsMatch}%
                              </div>
                            </div>
                          </div>
                        )}

                        {resume.keywords && resume.keywords.length > 0 && (
                          <div>
                            <div className="text-sm text-muted-foreground mb-2">Top Keywords</div>
                            <div className="flex flex-wrap gap-2">
                              {resume.keywords.map((keyword, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200"
                                >
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {resume.type === "built" && (
                          <div>
                            <div className="text-sm text-muted-foreground mb-2">Template</div>
                            <Badge variant="outline" className="capitalize">
                              {resume.template}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex flex-wrap gap-2">
                      {(resume.type === "built" || resume.type === "both") && (
                        <Link href={`/builder?id=${resume.id}`} className="flex-1">
                          <Button variant="outline" className="w-full" size="sm">
                            <Edit className="mr-2 h-3.5 w-3.5" />
                            Edit
                          </Button>
                        </Link>
                      )}
                      {(resume.type === "analyzed" || resume.type === "both") && (
                        <Link href={`/analyzer?id=${resume.id}`} className="flex-1">
                          <Button variant="outline" className="w-full" size="sm">
                            <RefreshCw className="mr-2 h-3.5 w-3.5" />
                            Re-analyze
                          </Button>
                        </Link>
                      )}
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="mr-2 h-3.5 w-3.5" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(resume.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
