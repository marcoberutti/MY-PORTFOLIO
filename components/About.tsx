import type { Education, WorkExperience } from '@/types';

interface AboutProps {
  education: Education[];
  workExperience: WorkExperience[];
}

export default function About({ education, workExperience }: AboutProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Education */}
      <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-10 bg-gradient-to-b from-primary to-primary-light rounded-full group-hover:h-12 transition-all duration-300" />
          <h3 className="text-3xl font-bold text-primary">Education</h3>
        </div>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={edu.id} className="relative pl-6 pb-6 last:pb-0">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-3 h-3 bg-primary rounded-full shadow-lg">
              </div>
              {/* Timeline line */}
              {index !== education.length - 1 && (
                <div className="absolute left-[5px] top-5 bottom-0 w-0.5 bg-gradient-to-b from-primary to-gray-200" />
              )}
              
              <div className="group/item">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-full text-sm">{edu.year}</span>
                  <span className="font-semibold text-gray-700">{edu.institution}</span>
                </div>
                <p className="text-gray-800 font-medium mb-1">{edu.title}</p>
                {edu.description && <p className="text-sm text-gray-600 mt-2">{edu.description}</p>}
                {edu.certificateUrl && (
                  <a 
                    href={edu.certificateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm mt-3 font-medium group-hover/item:gap-3 transition-all"
                  >
                    View Certificate →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-10 bg-gradient-to-b from-primary to-primary-light rounded-full group-hover:h-12 transition-all duration-300" />
          <h3 className="text-3xl font-bold text-primary">Work Experience</h3>
        </div>
        <div className="space-y-6">
          {workExperience.map((work, index) => (
            <div key={work.id} className="relative pl-6 pb-6 last:pb-0">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-3 h-3 bg-primary rounded-full shadow-lg">
              </div>
              {/* Timeline line */}
              {index !== workExperience.length - 1 && (
                <div className="absolute left-[5px] top-5 bottom-0 w-0.5 bg-gradient-to-b from-primary to-gray-200" />
              )}
              
              <div className="group/item">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-full text-sm">{work.period}</span>
                  <span className="font-semibold text-gray-700">{work.company}</span>
                </div>
                {work.role && <p className="text-gray-800 font-medium mb-3">{work.role}</p>}
                <ul className="space-y-2">
                  {work.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
