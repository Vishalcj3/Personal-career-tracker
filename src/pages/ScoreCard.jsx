import { useEffect, useState } from 'react';
import { animateValue } from '../utils/helpers';

const ScoreCard = ({ readinessScore, breakdown }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [animatedBreakdown, setAnimatedBreakdown] = useState({
    core_skills: 0,
    tools: 0,
    projects: 0
  });

  useEffect(() => {
    // Animate score
    animateValue(0, readinessScore, 1500, (value) => {
      setDisplayScore(Math.round(value));
    });

    // Animate breakdown bars
    setTimeout(() => {
      animateValue(0, breakdown.core_skills, 1200, (value) => {
        setAnimatedBreakdown(prev => ({ ...prev, core_skills: value }));
      });
    }, 300);

    setTimeout(() => {
      animateValue(0, breakdown.tools, 1200, (value) => {
        setAnimatedBreakdown(prev => ({ ...prev, tools: value }));
      });
    }, 500);

    setTimeout(() => {
      animateValue(0, breakdown.projects, 1200, (value) => {
        setAnimatedBreakdown(prev => ({ ...prev, projects: value }));
      });
    }, 700);
  }, [readinessScore, breakdown]);

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-success-600';
    if (score >= 50) return 'text-warning-600';
    return 'text-danger-600';
  };

  const getScoreRingColor = (score) => {
    if (score >= 75) return '#22c55e';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 animate-slide-up">
      <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">
        Readiness Score
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Circular Progress */}
        <div className="relative flex-shrink-0">
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke="#e2e8f0"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke={getScoreRingColor(displayScore)}
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 1.5s ease-out, stroke 0.3s ease'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-5xl font-display font-bold ${getScoreColor(displayScore)}`}>
                {displayScore}%
              </div>
              <div className="text-sm text-slate-500 font-medium mt-1">Ready</div>
            </div>
          </div>
        </div>

        {/* Breakdown Bars */}
        <div className="flex-1 w-full space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">Core Skills</span>
              <span className="text-sm font-bold text-slate-900">
                {Math.round(animatedBreakdown.core_skills)}%
              </span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-1000"
                style={{ width: `${animatedBreakdown.core_skills}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">Tools & Technologies</span>
              <span className="text-sm font-bold text-slate-900">
                {Math.round(animatedBreakdown.tools)}%
              </span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-success-500 to-success-600 rounded-full transition-all duration-1000"
                style={{ width: `${animatedBreakdown.tools}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">Projects & Experience</span>
              <span className="text-sm font-bold text-slate-900">
                {Math.round(animatedBreakdown.projects)}%
              </span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-warning-500 to-warning-600 rounded-full transition-all duration-1000"
                style={{ width: `${animatedBreakdown.projects}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
