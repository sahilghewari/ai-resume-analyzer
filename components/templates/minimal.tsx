import { ResumeData } from "@/lib/types"

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-light tracking-wide">{data.personalInfo.name}</h1>
        <div className="flex flex-wrap justify-center gap-x-6 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section>
          <h2 className="text-lg font-normal tracking-widest uppercase text-gray-500 mb-6 text-center">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-4 gap-4">
                <div className="text-right text-sm text-gray-500">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </div>
                <div className="col-span-3">
                  <h3 className="font-medium">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}, {exp.location}</p>
                  <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section>
          <h2 className="text-lg font-normal tracking-widest uppercase text-gray-500 mb-6 text-center">
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-4 gap-4">
                <div className="text-right text-sm text-gray-500">
                  {edu.graduationDate}
                </div>
                <div className="col-span-3">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}, {edu.location}</p>
                  {edu.description && (
                    <p className="mt-2 text-sm text-gray-600">{edu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-normal tracking-widest uppercase text-gray-500 mb-6 text-center">
            Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-600">
            {data.skills.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="text-lg font-normal tracking-widest uppercase text-gray-500 mb-6 text-center">
            Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.id} className="grid grid-cols-4 gap-4">
                <div className="text-right">
                  {project.link && (
                    <a href={project.link} className="text-sm text-gray-500 hover:text-gray-700">
                      View Project
                    </a>
                  )}
                </div>
                <div className="col-span-3">
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.technologies}</p>
                  <p className="mt-2 text-sm text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
