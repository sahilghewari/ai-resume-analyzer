"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Download, Copy, RefreshCw, Sparkles, CheckCircle } from "lucide-react"

export default function CoverLetterGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    jobDescription: "",
    tone: "professional",
    includePersonal: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      includePersonal: checked,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      tone: value,
    })
  }

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const generatedLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.position} position at ${formData.company}. With over 7 years of experience in frontend development and a passion for creating exceptional user experiences, I am excited about the opportunity to contribute to your innovative team.

Throughout my career, I have successfully delivered responsive web applications using modern technologies like React.js, Redux, and TypeScript. My experience aligns perfectly with the requirements outlined in your job description, particularly in developing scalable frontend architectures and optimizing application performance.

In my current role at TechCorp, I spearheaded a website performance optimization initiative that reduced load time by 65%, directly contributing to a 20% increase in user retention. I also implemented a comprehensive bug tracking and resolution system that decreased reported issues by 78% within three months.

I am particularly drawn to ${formData.company}'s commitment to innovation and user-centered design. Your recent project on AI-powered user interfaces particularly resonates with my professional interests and expertise.

I would welcome the opportunity to discuss how my skills and experience can benefit your team. Thank you for considering my application.

Sincerely,
Your Name`

      setCoverLetter(generatedLetter)
      setIsGenerating(false)
      setIsGenerated(true)
    }, 3000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter)
  }

  return (
    <div className="space-y-6">
      {!isGenerated ? (
        <Card>
          <CardHeader>
            <CardTitle>Cover Letter Generator</CardTitle>
            <CardDescription>Generate a personalized cover letter for your job application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="e.g., Acme Corporation"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    name="position"
                    placeholder="e.g., Frontend Developer"
                    value={formData.position}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description (Key Points)</Label>
                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  placeholder="Paste key points from the job description..."
                  className="min-h-[150px]"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select value={formData.tone} onValueChange={handleSelectChange}>
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="confident">Confident</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-y-0 pt-5">
                  <Label htmlFor="includePersonal">Include Personal Touch</Label>
                  <Switch
                    id="includePersonal"
                    checked={formData.includePersonal}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleGenerate}
                disabled={isGenerating || !formData.company || !formData.position}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating Cover Letter...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate Cover Letter
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Cover Letter</CardTitle>
                  <CardDescription>
                    Personalized for {formData.position} at {formData.company}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <Card className="border bg-card">
                    <CardContent className="p-6 whitespace-pre-line font-serif">{coverLetter}</CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="edit" className="mt-4">
                  <Textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="min-h-[500px] font-mono text-sm"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setIsGenerated(false)}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
            <Button>
              <CheckCircle className="mr-2 h-4 w-4" />
              Save to Resume
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

