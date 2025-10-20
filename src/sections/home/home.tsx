import React, { useState, useEffect } from "react";
import './home.css';
import LetterGlitch from '../../components/LetterGlitch';
import ComputerLottieAnim from '../../animations/ComputerLottieAnim';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { useExperienceYears } from '../../hooks/useExperienceYears';
import { useSectionRegistration } from '../../hooks/useSectionRegistration';
import { ROLES, GLITCH_COLORS } from '../../constants';
import { loadExperiences } from '../../utils/dataLoader';

const Home: React.FC = () => {
  const displayedRole = useTypingEffect({ roles: ROLES });
  const { years: yearsExperience } = useExperienceYears();
  const [currentRole, setCurrentRole] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const experiences = await loadExperiences();
        setCurrentRole(experiences[0]);
      } catch (error) {
        console.error('Error loading experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Register this section for navigation
  useSectionRegistration({ id: 'home', label: 'Home' });

  return (
    <>
      <div className="absolute inset-0">
        <LetterGlitch
          glitchColors={GLITCH_COLORS}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
        />
      </div>
    <section id="home" className="min-h-screen flex items-center justify-center text-white relative" data-hero>
        <div className="max-w-6xl w-full mx-auto px-6 relative z-10 pt-24 sm:pt-28 allow-free-scroll">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 flex flex-col justify-between h-full">
                <div className="text-center flex-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                    Hi, I’m <span className="text-white/95">Hitesh Gupta T R</span>
                  </h1>
                  <p className="mt-3 text-2xl sm:text-3xl font-bold" aria-live="polite">
                    <span id="roleText">{displayedRole}</span>
                    <span className="typing-cursor" aria-hidden="true">|</span>
                  </p>
                  <p className="mt-8 text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
                    {loading ? (
                      'Loading...'
                    ) : (
                      `${currentRole?.title || 'Software Engineer'} at ${currentRole?.company || 'Tech Company'}, architecting robust DevOps solutions and driving cloud platform modernization. With ${yearsExperience}+ years transforming complex distributed systems into scalable, enterprise-grade applications, I'm a passionate tech, AI, and ML enthusiast committed to innovative solutions.`
                    )}
                  </p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <ComputerLottieAnim />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
                  <button className="btn-secondary" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
                    <span>View My Work</span>
                  </button>
              <a id="download-resume-top" href="https://drive.google.com/uc?export=download&id=1V3cBIf9R1YQapMYayuVD6O7PyQi51Zq3" className="btn-primary inline-flex items-center justify-center">
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
