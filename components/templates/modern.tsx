import { motion } from "framer-motion"
import { ResumeData } from "@/lib/types"

export default function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="border-b pb-6">
        <h1 className="text-3xl font-bold text-brand-600">{data.personalInfo.name}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary Section */}
      {data.summary && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
          <p className="text-muted-foreground">{data.summary}</p>
        </section>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{exp.title}</h3>
                  <span className="text-muted-foreground text-sm">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-brand-600">{exp.company}, {exp.location}</p>
                <p className="text-muted-foreground mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <span className="text-muted-foreground text-sm">{edu.graduationDate}</span>
                </div>
                <p className="text-brand-600">{edu.institution}, {edu.location}</p>
                <p className="text-muted-foreground mt-1">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{project.title}</h3>
                  {project.link && <a href={project.link} className="text-brand-600 text-sm">{project.link}</a>}
                </div>
                <p className="text-muted-foreground text-sm">{project.technologies}</p>
                <p className="text-muted-foreground mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
