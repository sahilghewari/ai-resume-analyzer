"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, ArrowLeftRight, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function ResumePreview() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Resume Preview</CardTitle>
              <CardDescription>Compare your current resume with the AI-optimized version</CardDescription>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Optimized Resume
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="side-by-side">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
              <TabsTrigger value="original">Original</TabsTrigger>
              <TabsTrigger value="optimized">Optimized</TabsTrigger>
            </TabsList>

            <TabsContent value="side-by-side" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Original Resume</h3>
                    <Badge variant="outline">Current Version</Badge>
                  </div>

                  <div className="border rounded-lg p-6 bg-card">
                    <div className="space-y-6">
                      <div className="text-center space-y-1">
                        <h2 className="text-xl font-bold">John Doe</h2>
                        <p className="text-sm text-muted-foreground">Frontend Developer</p>
                        <p className="text-xs">john.doe@example.com | (123) 456-7890</p>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm border-b pb-1 mb-2">SUMMARY</h3>
                        <p className="text-sm">
                          Frontend developer with experience in React and JavaScript. Good at building user interfaces
                          and solving problems.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm border-b pb-1 mb-2">EXPERIENCE</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">TechCorp</span>
                              <span>2020 - Present</span>
                            </div>
                            <p className="text-sm font-medium">Frontend Developer</p>
                            <ul className="text-sm list-disc list-inside space-y-1 mt-1">
                              <li>Developed web applications using React</li>
                              <li>Worked on UI components and fixed bugs</li>
                              <li>Helped with code reviews</li>
                            </ul>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">WebSolutions Inc.</span>
                              <span>2018 - 2020</span>
                            </div>
                            <p className="text-sm font-medium">Junior Developer</p>
                            <ul className="text-sm list-disc list-inside space-y-1 mt-1">
                              <li>Built websites using HTML, CSS, and JavaScript</li>
                              <li>Worked with the design team</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm border-b pb-1 mb-2">SKILLS</h3>
                        <p className="text-sm">React, JavaScript, HTML, CSS, Redux</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Optimized Resume</h3>
                    <Badge>AI Enhanced</Badge>
                  </div>

                  <div className="border rounded-lg p-6 bg-card relative">
                    <div className="space-y-6">
                      <div className="text-center space-y-1">
                        <h2 className="text-xl font-bold">John Doe</h2>
                        <p className="text-sm text-muted-foreground">Senior Frontend Engineer</p>
                        <p className="text-xs">john.doe@example.com | (123) 456-7890 | linkedin.com/in/johndoe</p>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm border-b pb-1 mb-2">PROFESSIONAL SUMMARY</h3>
                        <p className="text-sm">
                          Results-driven Frontend Engineer with 5+ years of experience specializing in React.js
                          ecosystem. Proven track record of delivering responsive, high-performance web applications
                          that enhance user engagement and drive business growth.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm border-b pb-1 mb-2">PROFESSIONAL EXPERIENCE</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">TechCorp</span>
                              <span>2020 - Present</span>
                            </div>
                            <p className="text-sm font-medium">Senior Frontend Engineer</p>
                            <ul className="text-sm list-disc list-inside space-y-1 mt-1">
                              <li>
                                Architected and developed responsive web applications using React.js and Redux,
                                resulting in a 40% improvement in user engagement
                              </li>
                              <li>
                                Engineered reusable UI components that reduced development time by 30% across 5 product
                                teams
                              </li>
                              <li>
                                Implemented comprehensive code review processes that improved code quality by 45% and
                                reduced production bugs by 60%
                              </li>
                            </ul>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">WebSolutions Inc.</span>
                              <span>2018 - 2020</span>
                            </div>
                            <p className="text-sm font-medium">Frontend Developer</p>
                            <ul className="text-sm list-disc list-inside space-y-1 mt-1">
                              <li>
                                Developed responsive websites using HTML5, CSS3, and JavaScript (ES6+) for 15+ client
                                projects
                              </li>
                              <li>
                                Collaborated with UX/UI designers to transform mockups into pixel-perfect interfaces,
                                improving client satisfaction by 35%
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm border-b pb-1 mb-2">TECHNICAL SKILLS</h3>
                        <p className="text-sm">
                          React.js, JavaScript (ES6+), TypeScript, Redux, HTML5, CSS3/SASS, Responsive Design, Git,
                          Jest/React Testing Library, RESTful APIs, Performance Optimization, Webpack
                        </p>
                      </div>
                    </div>

                    <motion.div
                      className="absolute -right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2"
                      animate={{ x: [0, -5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="original" className="mt-4">
              <div className="border rounded-lg p-8 bg-card max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <h2 className="text-2xl font-bold">John Doe</h2>
                    <p className="text-muted-foreground">Frontend Developer</p>
                    <p className="text-sm">john.doe@example.com | (123) 456-7890</p>
                  </div>

                  <div>
                    <h3 className="font-bold border-b pb-1 mb-2">SUMMARY</h3>
                    <p>
                      Frontend developer with experience in React and JavaScript. Good at building user interfaces and
                      solving problems.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold border-b pb-1 mb-2">EXPERIENCE</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between">
                          <span className="font-medium">TechCorp</span>
                          <span>2020 - Present</span>
                        </div>
                        <p className="font-medium">Frontend Developer</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                          <li>Developed web applications using React</li>
                          <li>Worked on UI components and fixed bugs</li>
                          <li>Helped with code reviews</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex justify-between">
                          <span className="font-medium">WebSolutions Inc.</span>
                          <span>2018 - 2020</span>
                        </div>
                        <p className="font-medium">Junior Developer</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                          <li>Built websites using HTML, CSS, and JavaScript</li>
                          <li>Worked with the design team</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold border-b pb-1 mb-2">EDUCATION</h3>
                    <div className="flex justify-between">
                      <span className="font-medium">University of Technology</span>
                      <span>2014 - 2018</span>
                    </div>
                    <p>Bachelor of Science in Computer Science</p>
                  </div>

                  <div>
                    <h3 className="font-bold border-b pb-1 mb-2">SKILLS</h3>
                    <p>React, JavaScript, HTML, CSS, Redux</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="optimized" className="mt-4">
              <div className="border rounded-lg p-8 bg-card max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <h2 className="text-2xl font-bold">John Doe</h2>
                    <p className="text-muted-foreground">Senior Frontend Engineer</p>
                    <p className="text-sm">john.doe@example.com | (123) 456-7890 | linkedin.com/in/johndoe</p>
                  </div>

                  <div>
                    <h3 className="font-bold border-b pb-1 mb-2">PROFESSIONAL SUMMARY</h3>
                    <p>
                      Results-driven Frontend Engineer with 5+ years of experience specializing in React.js ecosystem.
                      Proven track record of delivering responsive, high-performance web applications that enhance user
                      engagement and drive business growth.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold border-b pb-1 mb-2">PROFESSIONAL EXPERIENCE</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between">
                          <span className="font-medium">TechCorp</span>
                          <span>2020 - Present</span>
                        </div>
                        <p className="font-medium">Senior Frontend Engineer</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                          <li>
                            Architected and developed responsive web applications using React.js and Redux, resulting in
                            a 40% improvement in user engagement
                          </li>
                          <li>
                            Engineered reusable UI components that reduced development time by 30% across 5 product
                            teams
                          </li>
                          <li>
                            Implemented comprehensive code review processes that improved code quality by 45% and
                            reduced production bugs by 60%
                          </li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex justify-between">
                          <span className="font-medium">WebSolutions Inc.</span>
                          <span>2018 - 2020</span>
                        </div>
                        <p className="font-medium">Frontend Developer</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                          <li>
                            Developed responsive websites using HTML5, CSS3, and JavaScript (ES6+) for 15+ client
                            projects
                          </li>
                          <li>
                            Collaborated with UX/UI designers to transform mockups into pixel-perfect interfaces,
                            improving client satisfaction by 35%
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold border-b pb-1 mb-2">EDUCATION</h3>
                    <div className="flex justify-between">
                      <span className="font-medium">University of Technology</span>
                      <span>2014 - 2018</span>
                    </div>
                    <p>Bachelor of Science in Computer Science, GPA: 3.8/4.0</p>
                    <p className="text-sm mt-1">
                      Relevant Coursework: Data Structures, Algorithms, Web Development, User Interface Design
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold border-b pb-1 mb-2">TECHNICAL SKILLS</h3>
                    <p>
                      React.js, JavaScript (ES6+), TypeScript, Redux, HTML5, CSS3/SASS, Responsive Design, Git,
                      Jest/React Testing Library, RESTful APIs, Performance Optimization, Webpack
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold border-b pb-1 mb-2">CERTIFICATIONS</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>AWS Certified Developer - Associate</li>
                      <li>React.js Advanced Patterns - Frontend Masters</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ATS Compatibility Check</CardTitle>
          <CardDescription>Ensure your resume passes Applicant Tracking Systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Proper Formatting</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your resume uses a clean, ATS-friendly format with standard section headings.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Keyword Optimization</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Key skills and job-specific terms are properly included throughout your resume.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">File Format</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Consider saving as a .docx file for maximum ATS compatibility instead of PDF.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Contact Information</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  All necessary contact details are present and properly formatted.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-medium mb-2">ATS Simulation Results</h3>
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-medium">Resume Scan Complete</span>
                </div>
                <p className="text-sm mb-4">
                  Your optimized resume has been analyzed by our ATS simulation. Here are the results:
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall ATS Score</span>
                      <span className="font-medium">92/100</span>
                    </div>
                    <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Keyword Match</span>
                      <span className="font-medium">85/100</span>
                    </div>
                    <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Formatting</span>
                      <span className="font-medium">98/100</span>
                    </div>
                    <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

