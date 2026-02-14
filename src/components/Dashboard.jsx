import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { getUserProgress } from '../services/firestore';
import gsap from 'gsap';
import ScoreCard from '../components/ScoreCard';
import SkillGapPanel from '../components/SkillGapPanel';
import RoadmapTimeline from '../components/RoadmapTimeline';
import InternshipPanel from '../components/InternshipPanel';
import LoadingScreen from '../components/LoadingScreen';

const Dashboard = ({ userId }) => {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [readinessScore, setReadinessScore] = useState(0);
  const [completedCheckpoints, setCompletedCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = async () => {
    try {
      const progress = await getUserProgress(userId);
      if (!progress || !progress.last_analysis) {
        // No analysis found, redirect to analyzer
        navigate('/analyzer');
        return;
      }

      setAnalysisData(progress.last_analysis);
      setCompletedCheckpoints(progress.completed_checkpoints || []);
      setReadinessScore(progress.updated_readiness_score || progress.last_analysis.readiness_score);
      setLoading(false);

      // Entry animation
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    } catch (error) {
      console.error('Error loading user data:', error);
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: async () => {
        await auth.signOut();
        navigate('/');
      }
    });
  };

  const handleNewAnalysis = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => navigate('/analyzer')
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!analysisData) {
    return null;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-slate-900">Career Navigator</h1>
                <p className="text-xs text-slate-600">Track your progress and achieve your goals</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleNewAnalysis}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                New Analysis
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <ScoreCard 
            readinessScore={readinessScore} 
            breakdown={analysisData.breakdown}
          />

          <SkillGapPanel 
            matchedSkills={analysisData.matched_skills}
            missingSkills={analysisData.missing_skills}
          />

          <RoadmapTimeline 
            roadmap={analysisData.roadmap}
            completedCheckpoints={completedCheckpoints}
            userId={userId}
            onScoreUpdate={setReadinessScore}
            onCheckpointsUpdate={setCompletedCheckpoints}
          />

          <InternshipPanel 
            internships={analysisData.internships}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-xl border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-500">
            © 2026 Personal Career Navigator. AI-powered career analysis.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;