import type { Skill } from '@/types';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group">
            <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-3">
              <span className="w-1.5 h-6 bg-gradient-to-b from-primary to-primary-light rounded-full group-hover:h-8 transition-all duration-300" />
              {category}
            </h3>
            <div className="space-y-5">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="group/skill">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                    <span className="text-primary font-bold text-sm">{skill.level}%</span>
                  </div>
                  <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    {/* Main progress bar with gradient */}
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary-light to-primary rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${skill.level}%` }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                    {/* Glow effect */}
                    <div
                      className="absolute inset-y-0 left-0 bg-primary/20 blur-sm rounded-full transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
