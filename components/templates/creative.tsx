import { ResumeData } from "@/lib/types"

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="relative">
      {/* Header with Accent */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-lg mb-6">
        <h1 className="text-4xl font-bold mb-4">{data.personalInfo.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
        </div>
        {(data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="flex gap-4 mt-4 text-sm">
            {data.personalInfo.linkedin && (
              <a href={data.personalInfo.linkedin} className="hover:opacity-75">LinkedIn</a>
            )}
            {data.personalInfo.website && (
              <a href={data.personalInfo.website} className="hover:opacity-75">Portfolio</a>
            )}
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Summary */}
        {data.summary && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 text-lg leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                      <p className="text-purple-600">{exp.company}, {exp.location}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-purple-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.graduationDate}</p>
                    {edu.description && (
                      <p className="text-gray-600 mt-2 text-sm">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
              <div className="space-y-4">
                {data.projects.map((project) => (
                  <div key={project.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800">{project.title}</h3>
                      {project.link && (
                        <a href={project.link} className="text-purple-600 text-sm hover:underline">
                          View
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-purple-600 mt-1">{project.technologies}</p>
                    <p className="text-gray-600 mt-2 text-sm">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
