import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = () => {
  const loaderRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    gsap.to(iconRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: 'linear'
    });

    gsap.to(loaderRef.current, {
      scale: 1.1,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div ref={loaderRef} className="text-center">
        <div ref={iconRef} className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-slate-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;