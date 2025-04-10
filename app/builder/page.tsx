"use client"

import type React from "react"

import { useState } from "react"
import { Save, Download, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Add these imports at the top of the file
import { motion, AnimatePresence } from "framer-motion"
import AnimatedInput from "@/components/animations/animated-input"
import TemplateSwitcher from "@/components/animations/template-switcher"
import AISuggestion from "@/components/animations/ai-suggestion"

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedin: string
    website: string
  }
  summary: string
  experience: Array<{
    id: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    degree: string
    institution: string
    location: string
    graduationDate: string
    description: string
  }>
  skills: string[]
  projects: Array<{
    id: string
    title: string
    description: string
    technologies: string
    link: string
  }>
}

export default function ResumeBuilder() {
  const [activeTemplate, setActiveTemplate] = useState("modern")
  const [previewMode, setPreviewMode] = useState(false)
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      location: "New York, NY",
      linkedin: "linkedin.com/in/johndoe",
      website: "johndoe.com",
    },
    summary:
      "Experienced software engineer with a passion for building scalable web applications and solving complex problems.",
    experience: [
      {
        id: "1",
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        location: "New York, NY",
        startDate: "2020-01",
        endDate: "",
        current: true,
        description:
          "Led development of cloud-based applications. Implemented CI/CD pipelines. Mentored junior developers.",
      },
      {
        id: "2",
        title: "Software Developer",
        company: "Digital Innovations",
        location: "Boston, MA",
        startDate: "2017-06",
        endDate: "2019-12",
        current: false,
        description:
          "Developed and maintained web applications using React and Node.js. Collaborated with design team to implement UI/UX improvements.",
      },
    ],
    education: [
      {
        id: "1",
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        location: "Boston, MA",
        graduationDate: "2017-05",
        description:
          "GPA: 3.8/4.0. Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems.",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "Python", "SQL", "Git", "AWS", "Docker", "CI/CD"],
    projects: [
      {
        id: "1",
        title: "E-commerce Platform",
        description:
          "Built a full-stack e-commerce platform with user authentication, product catalog, and payment processing.",
        technologies: "React, Node.js, MongoDB, Stripe API",
        link: "github.com/johndoe/ecommerce",
      },
    ],
  })

  // Add this state for AI suggestions after the existing state variables
  const [aiSuggestions, setAiSuggestions] = useState<
    Array<{
      id: string
      text: string
      field: string
      value: string
    }>
  >([
    {
      id: "1",
      text: "Add more quantifiable achievements to your Senior Software Engineer role.",
      field: "experience",
      value:
        "Led development of cloud-based applications resulting in 40% improved deployment efficiency. Implemented CI/CD pipelines reducing build times by 65%. Mentored 5 junior developers who were all promoted within a year.",
    },
  ])

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    })
  }

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      summary: e.target.value,
    })
  }

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...resumeData.skills]
    updatedSkills[index] = value
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    })
  }

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, ""],
    })
  }

  const removeSkill = (index: number) => {
    const updatedSkills = [...resumeData.skills]
    updatedSkills.splice(index, 1)
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    })
  }

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience],
    })
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      description: "",
    }
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    })
  }

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: "",
      link: "",
    }
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    })
  }

  const updateProject = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    })
  }

  const removeProject = (id: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((proj) => proj.id !== id),
    })
  }

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode)
  }

  const downloadResume = () => {
    // In a real implementation, this would generate a PDF
    alert("Resume download functionality would be implemented here")
  }

  // Add this function to handle applying AI suggestions
  const applyAiSuggestion = (id: string) => {
    const suggestion = aiSuggestions.find((s) => s.id === id)
    if (!suggestion) return

    if (suggestion.field === "experience" && resumeData.experience.length > 0) {
      updateExperience(resumeData.experience[0].id, "description", suggestion.value)
    }

    setAiSuggestions(aiSuggestions.filter((s) => s.id !== id))
  }

  // Add this function to dismiss AI suggestions
  const dismissAiSuggestion = (id: string) => {
    setAiSuggestions(aiSuggestions.filter((s) => s.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-10 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Resume Builder</h1>
            <div className="flex gap-3">
              <Button variant="outline" onClick={togglePreviewMode}>
                {previewMode ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    Edit Mode
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </>
                )}
              </Button>
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700" onClick={downloadResume}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Section */}
            {!previewMode && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <Tabs defaultValue="personal">
                      <TabsList className="grid grid-cols-6 mb-6">
                        <TabsTrigger value="personal">Personal</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="template">Template</TabsTrigger>
                      </TabsList>

                      {/* Replace the personal info tab content with our animated version */}
                      <TabsContent value="personal" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <AnimatedInput
                            id="name"
                            label="Full Name"
                            value={resumeData.personalInfo.name}
                            onChange={handlePersonalInfoChange}
                            name="name"
                          />
                          <AnimatedInput
                            id="email"
                            label="Email"
                            type="email"
                            value={resumeData.personalInfo.email}
                            onChange={handlePersonalInfoChange}
                            name="email"
                          />
                          <AnimatedInput
                            id="phone"
                            label="Phone"
                            value={resumeData.personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                            name="phone"
                          />
                          <AnimatedInput
                            id="location"
                            label="Location"
                            value={resumeData.personalInfo.location}
                            onChange={handlePersonalInfoChange}
                            name="location"
                          />
                          <AnimatedInput
                            id="linkedin"
                            label="LinkedIn"
                            value={resumeData.personalInfo.linkedin}
                            onChange={handlePersonalInfoChange}
                            name="linkedin"
                          />
                          <AnimatedInput
                            id="website"
                            label="Website"
                            value={resumeData.personalInfo.website}
                            onChange={handlePersonalInfoChange}
                            name="website"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="summary">Professional Summary</Label>
                          <motion.div
                            whileFocus={{
                              scale: 1.01,
                              boxShadow: "0 0 0 2px rgba(80, 200, 190, 0.3), 0 0 10px rgba(80, 200, 190, 0.2)",
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <Textarea id="summary" value={resumeData.summary} onChange={handleSummaryChange} rows={4} />
                          </motion.div>
                        </div>
                      </TabsContent>

                      {/* Add AI suggestions to the experience tab */}
                      <TabsContent value="experience">
                        <div className="space-y-6">
                          {aiSuggestions.map(
                            (suggestion) =>
                              suggestion.field === "experience" && (
                                <AISuggestion
                                  key={suggestion.id}
                                  suggestion={suggestion.text}
                                  onApply={() => applyAiSuggestion(suggestion.id)}
                                  onDismiss={() => dismissAiSuggestion(suggestion.id)}
                                />
                              ),
                          )}

                          {/* Keep the existing experience form */}
                          <AnimatePresence>
                            {resumeData.experience.map((exp) => (
                              <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                                transition={{ duration: 0.3 }}
                                className="p-4 border rounded-lg space-y-4"
                              >
                                <div className="flex justify-between items-center">
                                  <h3 className="text-lg font-medium">{exp.title || "New Position"}</h3>
                                  <motion.button
                                    whileHover={{ scale: 1.1, color: "#ef4444" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => removeExperience(exp.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </motion.button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <AnimatedInput
                                    id={`exp-title-${exp.id}`}
                                    label="Job Title"
                                    value={exp.title}
                                    onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                                  />
                                  <AnimatedInput
                                    id={`exp-company-${exp.id}`}
                                    label="Company"
                                    value={exp.company}
                                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                  />
                                  <AnimatedInput
                                    id={`exp-location-${exp.id}`}
                                    label="Location"
                                    value={exp.location}
                                    onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                                  />
                                  <AnimatedInput
                                    id={`exp-start-${exp.id}`}
                                    label="Start Date"
                                    type="month"
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                  />
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id={`exp-current-${exp.id}`}
                                        checked={exp.current}
                                        onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                                        className="rounded border-gray-300"
                                      />
                                      <Label htmlFor={`exp-current-${exp.id}`}>Current Position</Label>
                                    </div>
                                  </div>
                                  {!exp.current && (
                                    <AnimatedInput
                                      id={`exp-end-${exp.id}`}
                                      label="End Date"
                                      type="month"
                                      value={exp.endDate}
                                      onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                    />
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`exp-desc-${exp.id}`}>Description</Label>
                                  <motion.div
                                    whileFocus={{
                                      scale: 1.01,
                                      boxShadow: "0 0 0 2px rgba(80, 200, 190, 0.3), 0 0 10px rgba(80, 200, 190, 0.2)",
                                    }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Textarea
                                      id={`exp-desc-${exp.id}`}
                                      value={exp.description}
                                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                      rows={3}
                                      placeholder="Describe your responsibilities and achievements"
                                    />
                                  </motion.div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>

                          <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "#f0f9f8" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            onClick={addExperience}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Experience
                          </motion.button>
                        </div>
                      </TabsContent>

                      <TabsContent value="education">
                        <div className="space-y-6">
                          {resumeData.education.map((edu) => (
                            <div key={edu.id} className="p-4 border rounded-lg space-y-4">
                              <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">{edu.degree || "New Education"}</h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeEducation(edu.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`edu-degree-${edu.id}`}>Degree</Label>
                                  <Input
                                    id={`edu-degree-${edu.id}`}
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`edu-institution-${edu.id}`}>Institution</Label>
                                  <Input
                                    id={`edu-institution-${edu.id}`}
                                    value={edu.institution}
                                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`edu-location-${edu.id}`}>Location</Label>
                                  <Input
                                    id={`edu-location-${edu.id}`}
                                    value={edu.location}
                                    onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`edu-date-${edu.id}`}>Graduation Date</Label>
                                  <Input
                                    id={`edu-date-${edu.id}`}
                                    type="month"
                                    value={edu.graduationDate}
                                    onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`edu-desc-${edu.id}`}>Description</Label>
                                <Textarea
                                  id={`edu-desc-${edu.id}`}
                                  value={edu.description}
                                  onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                                  rows={2}
                                  placeholder="GPA, honors, relevant coursework, etc."
                                />
                              </div>
                            </div>
                          ))}

                          <Button variant="outline" className="w-full" onClick={addEducation}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Education
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="skills">
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {resumeData.skills.map((skill, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1"
                              >
                                <Input
                                  value={skill}
                                  onChange={(e) => handleSkillChange(index, e.target.value)}
                                  className="border-0 bg-transparent p-0 h-auto w-auto focus:ring-0 focus-visible:ring-0"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeSkill(index)}
                                  className="h-5 w-5 p-0 text-gray-500 hover:text-red-500 hover:bg-transparent"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          <Button variant="outline" onClick={addSkill}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Skill
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="projects">
                        <div className="space-y-6">
                          {resumeData.projects.map((project) => (
                            <div key={project.id} className="p-4 border rounded-lg space-y-4">
                              <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">{project.title || "New Project"}</h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeProject(project.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`proj-title-${project.id}`}>Project Title</Label>
                                  <Input
                                    id={`proj-title-${project.id}`}
                                    value={project.title}
                                    onChange={(e) => updateProject(project.id, "title", e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`proj-link-${project.id}`}>Project Link</Label>
                                  <Input
                                    id={`proj-link-${project.id}`}
                                    value={project.link}
                                    onChange={(e) => updateProject(project.id, "link", e.target.value)}
                                    placeholder="GitHub, website, etc."
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`proj-tech-${project.id}`}>Technologies Used</Label>
                                <Input
                                  id={`proj-tech-${project.id}`}
                                  value={project.technologies}
                                  onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                                  placeholder="React, Node.js, MongoDB, etc."
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`proj-desc-${project.id}`}>Description</Label>
                                <Textarea
                                  id={`proj-desc-${project.id}`}
                                  value={project.description}
                                  onChange={(e) => updateProject(project.id, "description", e.target.value)}
                                  rows={3}
                                  placeholder="Describe the project, your role, and achievements"
                                />
                              </div>
                            </div>
                          ))}

                          <Button variant="outline" className="w-full" onClick={addProject}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Project
                          </Button>
                        </div>
                      </TabsContent>

                      {/* Replace the template selection tab content with our animated version */}
                      <TabsContent value="template">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="template">Resume Template</Label>
                            <Select value={activeTemplate} onValueChange={setActiveTemplate}>
                              <SelectTrigger id="template">
                                <SelectValue placeholder="Select a template" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="modern">Modern</SelectItem>
                                <SelectItem value="professional">Professional</SelectItem>
                                <SelectItem value="creative">Creative</SelectItem>
                                <SelectItem value="minimal">Minimal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <TemplateSwitcher
                            templates={[
                              { id: "modern", name: "Modern", image: "/placeholder.svg?height=200&width=150" },
                              {
                                id: "professional",
                                name: "Professional",
                                image: "/placeholder.svg?height=200&width=150",
                              },
                              { id: "creative", name: "Creative", image: "/placeholder.svg?height=200&width=150" },
                              { id: "minimal", name: "Minimal", image: "/placeholder.svg?height=200&width=150" },
                            ]}
                            activeTemplate={activeTemplate}
                            onSelect={setActiveTemplate}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Preview Section */}
            {/* Add animations to the resume preview */}
            <div className={previewMode ? "col-span-2" : ""}>
              <Card className="bg-white shadow-md">
                <CardContent className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTemplate}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`resume-preview ${activeTemplate}`}
                    >
                      {/* Modern Template Preview */}
                      {activeTemplate === "modern" && (
                        <div className="space-y-6">
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="border-b pb-6"
                          >
                            <h1 className="text-3xl font-bold text-teal-600">{resumeData.personalInfo.name}</h1>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
                              <span>{resumeData.personalInfo.email}</span>
                              <span>{resumeData.personalInfo.phone}</span>
                              <span>{resumeData.personalInfo.location}</span>
                              {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
                              {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Professional Summary</h2>
                            <p className="text-gray-700">{resumeData.summary}</p>
                          </motion.div>

                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Experience</h2>
                            <div className="space-y-4">
                              {resumeData.experience.map((exp, index) => (
                                <motion.div
                                  key={exp.id}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                >
                                  <div className="flex justify-between">
                                    <h3 className="font-medium">{exp.title}</h3>
                                    <span className="text-gray-600 text-sm">
                                      {exp.startDate &&
                                        new Date(exp.startDate).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                        })}{" "}
                                      -
                                      {exp.current
                                        ? " Present"
                                        : exp.endDate &&
                                          new Date(exp.endDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                          })}
                                    </span>
                                  </div>
                                  <p className="text-teal-600">
                                    {exp.company}, {exp.location}
                                  </p>
                                  <p className="text-gray-700 mt-1">{exp.description}</p>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>

                          {/* Continue with other sections with similar animations */}
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          >
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Education</h2>
                            <div className="space-y-4">
                              {resumeData.education.map((edu) => (
                                <motion.div
                                  key={edu.id}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.4 }}
                                >
                                  <div className="flex justify-between">
                                    <h3 className="font-medium">{edu.degree}</h3>
                                    <span className="text-gray-600 text-sm">
                                      {edu.graduationDate &&
                                        new Date(edu.graduationDate).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                        })}
                                    </span>
                                  </div>
                                  <p className="text-teal-600">
                                    {edu.institution}, {edu.location}
                                  </p>
                                  <p className="text-gray-700 mt-1">{edu.description}</p>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                              {resumeData.skills.map((skill, index) => (
                                <motion.span
                                  key={index}
                                  className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>

                          {resumeData.projects.length > 0 && (
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.5 }}
                            >
                              <h2 className="text-xl font-semibold text-gray-800 mb-3">Projects</h2>
                              <div className="space-y-4">
                                {resumeData.projects.map((project) => (
                                  <motion.div
                                    key={project.id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.6 }}
                                  >
                                    <div className="flex justify-between">
                                      <h3 className="font-medium">{project.title}</h3>
                                      {project.link && <span className="text-teal-600 text-sm">{project.link}</span>}
                                    </div>
                                    <p className="text-gray-600 text-sm">{project.technologies}</p>
                                    <p className="text-gray-700 mt-1">{project.description}</p>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
