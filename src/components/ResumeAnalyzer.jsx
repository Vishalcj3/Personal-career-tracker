import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { analyzeResume } from '../services/api';
import { saveUserAnalysis } from '../services/firestore';
import gsap from 'gsap';

const ResumeAnalyzer = ({ userId }) => {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [targetRole, setTargetRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cardRef = useRef(null);
  const titleRef = useRef(null);

  const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'Machine Learning Engineer',
    'DevOps Engineer',
    'Mobile Developer',
    'UI/UX Designer',
    'Product Manager',
    'Cloud Architect'
  ];

  useEffect(() => {
    // Entry animation - NO OPACITY
    gsap.from(titleRef.current, {
      y: -50,
      duration: 0.8,
      ease: 'back.out(1.4)'
    });

    gsap.from(cardRef.current, {
      y: 50,
      scale: 0.95,
      duration: 0.8,
      ease: 'back.out(1.2)',
      delay: 0.1
    });
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file only.');
        
        // Error shake
        gsap.fromTo(cardRef.current,
          { x: -10 },
          { 
            x: 10,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            ease: 'power1.inOut',
            onComplete: () => gsap.set(cardRef.current, { x: 0 })
          }
        );
        return;
      }
      
      setResumeFile(file);
      setError('');

      // Success bounce
      gsap.fromTo('.upload-indicator',
        { scale: 1 },
        { 
          scale: 1.3,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: 'elastic.out(1, 0.3)'
        }
      );
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !targetRole) {
      setError('Please upload a resume and select a target role.');
      
      // Error shake
      gsap.fromTo(cardRef.current,
        { x: -10 },
        { 
          x: 10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut',
          onComplete: () => gsap.set(cardRef.current, { x: 0 })
        }
      );
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await analyzeResume(resumeFile, targetRole);
      await saveUserAnalysis(userId, data);

      // Success animation - scale out then navigate
      gsap.to(cardRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(cardRef.current, {
            scale: 0.9,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => navigate('/dashboard')
          });
        }
      });
    } catch (err) {
      setError('Analysis failed. Please check your backend connection.');
      setLoading(false);

      // Error shake
      gsap.fromTo(cardRef.current,
        { x: -10 },
        { 
          x: 10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut',
          onComplete: () => gsap.set(cardRef.current, { x: 0 })
        }
      );
    }
  };

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-display font-bold text-slate-900">Career Navigator</h1>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl">
          <div ref={titleRef} className="text-center mb-8">
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-3">
              Analyze Your Career Path
            </h2>
            <p className="text-slate-600 text-lg">
              Upload your resume and discover your readiness score
            </p>
          </div>

          <div ref={cardRef} className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Upload Resume (PDF format)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className={`upload-indicator w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                    resumeFile ? 'bg-green-100' : 'bg-slate-100'
                  }`}>
                    {resumeFile ? (
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-lg">
                      {resumeFile ? `✓ ${resumeFile.name}` : 'Click to upload resume'}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      PDF files only
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Target Role
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors bg-white font-medium text-slate-900 text-base"
              >
                <option value="">Select a role...</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-300 text-red-800 px-4 py-3 rounded-xl text-sm font-semibold">
                {error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading || !resumeFile || !targetRole}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing Resume...
                </>
              ) : (
                'Analyze Resume'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;