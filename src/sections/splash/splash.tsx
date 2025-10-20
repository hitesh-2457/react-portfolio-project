import React, { useState, useEffect } from 'react';
import './splash.css';

interface SplashProps {
  duration?: number; // Duration in milliseconds before the splash screen disappears
}

const DEFAULT_DURATION = 2200;

const Splash: React.FC<SplashProps> = ({ duration = DEFAULT_DURATION }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div id="splash" className="fixed inset-0 grid place-items-center bg-[#0b1020] transition-opacity duration-700">
      <div className="orb violet"></div><div className="orb cyan"></div><div className="orb blue"></div>
      <div className="splash-card relative rounded-2xl p-7 sm:p-9 max-w-xl w-[90%] text-center text-slate-100 bg-white/5 border border-white/10">
        <svg className="noise" width="120%" height="120%"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncA type="table" tableValues="0 0.4" /></feComponentTransfer></filter><rect width="100%" height="100%" filter="url(#noiseFilter)"></rect></svg>
        <div className="inline-grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl mx-auto mb-4 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-400 text-white text-sm sm:text-base font-extrabold shadow-lg">HG</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Hitesh Gupta T R</h1>
        <p className="mt-3 text-sm sm:text-base text-slate-200/90">Welcome to my corner of the Internet</p>
        <div className="mt-6 flex flex-col items-center justify-center">
          <div className="mt-0 flex loader-dots"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>
          <p className="mt-3 text-sm sm:text-base text-slate-200/80">Preparing your experience…</p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
