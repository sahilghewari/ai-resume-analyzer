"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, RefreshCw, ThumbsUp, ThumbsDown, Copy, Wand2 } from "lucide-react"

export default function AiEnhancement() {
  const [activeTab, setActiveTab] = useState("experience")
  const [isGenerating, setIsGenerating] = useState(false)
  const [originalText, setOriginalText] = useState({
    experience:
      "Developed web applications using React and managed state with Redux. Worked on UI components and fixed bugs.",
    skills: "React, JavaScript, HTML, CSS, Redux",
    achievements: "Improved website performance. Reduced bug count by fixing issues.",
  })
  const [enhancedText, setEnhancedText] = useState({
    experience: "",
    skills: "",
    achievements: "",
  })
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI resume assistant. I can help you enhance your resume content. What would you like to improve today?",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const enhanced = {
        experience:
          "Architected and developed responsive web applications using React.js and Redux, resulting in a 40% improvement in user engagement. Engineered reusable UI components that reduced development time by 30% and collaborated with cross-functional teams to resolve critical bugs, improving application stability by 25%.",
        skills:
          "React.js, JavaScript (ES6+), Redux, HTML5, CSS3/SASS, Responsive Design, Git, Jest/React Testing Library, RESTful APIs, Performance Optimization",
        achievements:
          "Spearheaded website performance optimization initiative that reduced load time by 65%, directly contributing to a 20% increase in user retention. Implemented comprehensive bug tracking and resolution system that decreased reported issues by 78% within three months.",
      }

      setEnhancedText({
        ...enhancedText,
        [activeTab]: enhanced[activeTab as keyof typeof enhanced],
      })

      setIsGenerating(false)
    }, 2000)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const updatedMessages = [...messages, { role: "user", content: newMessage }]

    setMessages(updatedMessages)
    setNewMessage("")

    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "I can help with that! To make your resume more impactful, try using strong action verbs, quantify your achievements with specific metrics, and tailor your content to match the job description. Would you like me to help rewrite a specific section of your resume?",
        },
      ])
    }, 1000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:row-span-2">
        <CardHeader>
          <CardTitle>AI Resume Enhancement</CardTitle>
          <CardDescription>Let AI help you enhance your resume content</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Original Text</label>
                  <Badge variant="outline">Current Version</Badge>
                </div>
                <Textarea
                  value={originalText[activeTab as keyof typeof originalText]}
                  onChange={(e) =>
                    setOriginalText({
                      ...originalText,
                      [activeTab]: e.target.value,
                    })
                  }
                  placeholder="Enter your current resume text..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !originalText[activeTab as keyof typeof originalText]}
                  className="gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      Enhance with AI
                    </>
                  )}
                </Button>
              </div>

              <AnimatePresence>
                {enhancedText[activeTab as keyof typeof enhancedText] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Enhanced Text</label>
                      <Badge variant="secondary">AI Enhanced</Badge>
                    </div>
                    <div className="relative">
                      <Textarea
                        value={enhancedText[activeTab as keyof typeof enhancedText]}
                        onChange={(e) =>
                          setEnhancedText({
                            ...enhancedText,
                            [activeTab]: e.target.value,
                          })
                        }
                        className="min-h-[150px] pr-10"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-2 h-8 w-8 p-0"
                        onClick={() => {
                          navigator.clipboard.writeText(enhancedText[activeTab as keyof typeof enhancedText])
                        }}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="sr-only">Like</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <ThumbsDown className="h-4 w-4" />
                          <span className="sr-only">Dislike</span>
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleGenerate}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Chat Assistant</CardTitle>
          <CardDescription>Chat with AI for personalized resume advice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Ask for resume advice..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Suggestions</CardTitle>
          <CardDescription>Smart suggestions to improve your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <h3 className="font-medium">Use Action Verbs</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Replace generic verbs like "worked on" with powerful action verbs like "spearheaded," "implemented," or
                "orchestrated."
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <h3 className="font-medium">Quantify Achievements</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Add specific metrics and percentages to demonstrate your impact, such as "increased sales by 25%" or
                "reduced costs by $10,000."
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <h3 className="font-medium">Tailor to Job Description</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Customize your resume for each application by incorporating keywords from the job description to improve
                ATS compatibility.
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <h3 className="font-medium">Focus on Results</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Emphasize outcomes rather than responsibilities. Show how your work contributed to company goals or
                solved problems.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

