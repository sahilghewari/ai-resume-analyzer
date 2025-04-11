import { ResumeData } from "@/lib/types"

export default function ProfessionalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="col-span-1 bg-gray-50 p-6 rounded-lg">
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{data.personalInfo.name}</h1>
            <div className="space-y-1 text-sm text-gray-600">
              {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
              {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
              {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
              {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="text-sm bg-white px-2 py-1 rounded border">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-2 space-y-6">
        {/* Summary */}
        {data.summary && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Professional Summary</h2>
            <p className="text-gray-600">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Professional Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company}, {exp.location}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}, {edu.location}</p>
                    </div>
                    <span className="text-sm text-gray-500">{edu.graduationDate}</span>
                  </div>
                  <p className="mt-1 text-gray-600">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800">{project.title}</h3>
                    {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{project.technologies}</p>
                  <p className="mt-1 text-gray-600">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
