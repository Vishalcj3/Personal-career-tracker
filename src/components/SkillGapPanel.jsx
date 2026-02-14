import { getPriorityColor } from '../utils/helpers';

const SkillGapPanel = ({ matchedSkills, missingSkills }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">
        Skill Analysis
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Matched Skills */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-success-500 rounded-full"></span>
            Matched Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchedSkills && matchedSkills.length > 0 ? (
              matchedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-success-50 text-success-700 border border-success-200 rounded-lg text-sm font-medium hover:shadow-md transition-shadow"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-slate-500 text-sm">No matched skills found</p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-danger-500 rounded-full"></span>
            Skill Gaps
          </h3>
          <div className="space-y-3">
            {missingSkills && missingSkills.length > 0 ? (
              missingSkills
                .sort((a, b) => b.weight - a.weight)
                .map((skill, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 bg-${getPriorityColor(skill.priority)}-50 border-${getPriorityColor(skill.priority)}-500 hover:shadow-md transition-all hover:-translate-y-0.5`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-slate-900">{skill.name}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded bg-${getPriorityColor(skill.priority)}-100 text-${getPriorityColor(skill.priority)}-700`}>
                        {skill.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span>Impact: +{skill.impact_percentage}%</span>
                      <span>•</span>
                      <span>Weight: {skill.weight}</span>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-slate-500 text-sm">No skill gaps identified</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapPanel;
