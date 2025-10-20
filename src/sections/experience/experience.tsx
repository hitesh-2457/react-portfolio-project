import React, { useState, useEffect } from "react";
import SpotlightCard from "../../components/SpotlightCard";
import { COLOR_SCHEMES } from "../../constants";
import { useSectionRegistration } from "../../hooks/useSectionRegistration";
import { loadExperiences, type Experience as ExperienceData } from "../../utils/dataLoader";
import "./experience.css";

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);

  // Register this section for navigation
  useSectionRegistration({ id: 'experience', label: 'Experience' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadExperiences();
        setExperiences(data);
      } catch (error) {
        console.error('Error loading experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="min-h-screen flex items-center justify-center py-12 bg-white text-slate-900 pt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-slate-600">Loading experience...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center py-12 bg-white text-slate-900 pt-20">
      <div className="max-w-6xl mx-auto px-6 allow-free-scroll">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold title-gradient-light">Experience</h2>
          <p className="mt-3 text-slate-600">Software developer with a passion for problem-solving and building scalable systems.</p>
        </div>
        <div className="relative">
          <div className="vline absolute left-6 sm:left-8 md:left-1/2 top-0 h-full"></div>
          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const colorScheme = COLOR_SCHEMES[index % COLOR_SCHEMES.length];
              const accent = colorScheme.accent;
              const spotlightColor = colorScheme.spotlight;
              return (
                <article key={exp.id} className="relative md:grid md:grid-cols-2 md:gap-6">
                  <div className="absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 -top-1">
                    <div className="marker" aria-hidden="true">{exp.marker}</div>
                  </div>
                  {isLeft ? (
                    <div className="md:col-start-1 md:pr-6 md:text-right">
                      <SpotlightCard className="t-card md:ml-auto md:max-w-xl ml-0 pl-12 sm:pl-14 md:pl-5" spotlightColor={spotlightColor as `rgba(${number}, ${number}, ${number}, ${number})`}>
                        <div className={`t-accent ${accent}`}></div>
                        <div className="p-3">
                          <h3 className="text-sm sm:text-base font-semibold">{exp.title}</h3>
                          <div className="mt-1"><span className="text-[10px] px-1.5 py-0.5 rounded-full chip">{exp.company}</span></div>
                          <p className="mt-1 text-[11px] text-slate-500">{exp.period}</p>
                        </div>
                      </SpotlightCard>
                    </div>
                  ) : (
                    <>
                      <div className="hidden md:block"></div>
                      <div className="md:col-start-2 md:pl-6">
                        <SpotlightCard className="t-card md:mr-auto md:max-w-xl ml-0 pl-12 sm:pl-14 md:pl-5" spotlightColor={spotlightColor as `rgba(${number}, ${number}, ${number}, ${number})`}>
                          <div className={`t-accent ${accent}`}></div>
                          <div className="p-3">
                            <h3 className="text-sm sm:text-base font-semibold">{exp.title}</h3>
                            <div className="mt-1"><span className="text-[10px] px-1.5 py-0.5 rounded-full chip">{exp.company}</span></div>
                            <p className="mt-1 text-[11px] text-slate-500">{exp.period}</p>
                          </div>
                        </SpotlightCard>
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
