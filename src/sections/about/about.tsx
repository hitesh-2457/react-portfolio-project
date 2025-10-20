import React, { useState, useEffect } from "react";
import SpotlightCard from "../../components/SpotlightCard";
import { COLOR_SCHEMES } from "../../constants";
import { useSectionRegistration } from "../../hooks/useSectionRegistration";
import { loadAboutCards, type AboutCard } from "../../utils/dataLoader";
import CodingLottieAnim from "@/animations/CodingLottieAnim";

const About: React.FC = () => {
  const [aboutCards, setAboutCards] = useState<AboutCard[]>([]);
  const [loading, setLoading] = useState(true);

  // Register this section for navigation
  useSectionRegistration({ id: 'about', label: 'About' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadAboutCards();
        setAboutCards(data);
      } catch (error) {
        console.error('Error loading about cards:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-slate-600">Loading about section...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 allow-free-scroll">
        <div className="text-center mb-12">
          <CodingLottieAnim />
        </div>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold title-gradient-light">About Me</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Cloud engineer and backend-focused builder with a passion for resilient systems and clean automation.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {aboutCards.map((card, index) => {
            const colorScheme = COLOR_SCHEMES[index % COLOR_SCHEMES.length];
            const colorClass = colorScheme.textColor;
            const spotlightColor = colorScheme.spotlight;
            return (
              <SpotlightCard
                key={card.id}
                className="rounded-2xl p-6 bg-slate-50 border border-slate-200 card-hover w-[250px] h-[250px]"
                spotlightColor={spotlightColor as `rgba(${number}, ${number}, ${number}, ${number})`}
                enableFlip={true}
                frontContent={<h3 className={`text-xl font-bold ${colorClass} text-center`}>{card.title}</h3>}
                backContent={
                  <ul className="mt-4 space-y-3 text-sm text-slate-600 list-disc list-inside w-[70%] mx-auto text-center">
                    {card.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
