import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import gsap from 'gsap';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const floatingRef1 = useRef(null);
  const floatingRef2 = useRef(null);
  const floatingRef3 = useRef(null);

  useEffect(() => {
    // Entry animations - NO OPACITY
    gsap.from(titleRef.current, {
      y: -50,
      scale: 0.9,
      duration: 1,
      ease: 'back.out(1.4)'
    });

    gsap.from(cardRef.current, {
      y: 50,
      scale: 0.9,
      duration: 1,
      ease: 'back.out(1.2)',
      delay: 0.2
    });

    // Floating backgrounds
    gsap.to(floatingRef1.current, {
      y: -30,
      x: 20,
      rotation: 10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(floatingRef2.current, {
      y: 20,
      x: -30,
      rotation: -10,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(floatingRef3.current, {
      y: -20,
      x: 30,
      rotation: 15,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        
        // Success bounce
        gsap.to(cardRef.current, {
          scale: 1.05,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
          onComplete: () => navigate('/analyzer')
        });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        await auth.signOut();
        
        // Success pulse
        gsap.fromTo(cardRef.current,
          { scale: 1 },
          { 
            scale: 1.02,
            duration: 0.3,
            yoyo: true,
            repeat: 3,
            ease: 'power2.inOut'
          }
        );
        
        setSuccessMessage('🎉 Account created successfully! Please log in.');
        setIsLogin(true);
        setEmail('');
        setPassword('');
        
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    } catch (err) {
      setError(err.message);
      
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
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      
      // Success animation
      gsap.to(cardRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: () => navigate('/analyzer')
      });
    } catch (err) {
      setError(err.message);
      
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
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    gsap.to(cardRef.current, {
      rotationY: 90,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccessMessage('');
        gsap.to(cardRef.current, {
          rotationY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated floating backgrounds - NO OPACITY */}
      <div ref={floatingRef1} className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"></div>
      <div ref={floatingRef2} className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
      <div ref={floatingRef3} className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        <div ref={titleRef} className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-display font-bold text-slate-900 mb-3 tracking-tight">
            Career Navigator
          </h1>
          <p className="text-slate-600 text-lg font-sans">
            AI-powered career readiness analysis
          </p>
        </div>

        <div ref={cardRef} className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8" style={{ transformStyle: 'preserve-3d' }}>
          {successMessage && (
            <div className="mb-6 bg-green-50 border-2 border-green-300 text-green-800 px-6 py-4 rounded-xl text-center font-semibold">
              {successMessage}
            </div>
          )}

          <div className="flex gap-2 mb-6">
            <button
              onClick={handleToggleMode}
              disabled={loading}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={handleToggleMode}
              disabled={loading}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                !isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-5">
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition-all group-hover:border-slate-300"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition-all group-hover:border-slate-300"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500 font-medium">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full border-2 border-slate-200 text-slate-700 py-4 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;