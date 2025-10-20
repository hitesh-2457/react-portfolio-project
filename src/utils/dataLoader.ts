// Utility functions to load JSON data from public assets

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  marker: string;
  category: 'work' | 'education' | 'patent';
}

export interface AboutCard {
  id: number;
  title: string;
  items: string[];
}

let experiencesCache: Experience[] | null = null;
let aboutCardsCache: AboutCard[] | null = null;

export const loadExperiences = async (): Promise<Experience[]> => {
  if (experiencesCache) return experiencesCache;

  try {
    const response = await fetch('/assets/experience.json');
    if (!response.ok) {
      throw new Error(`Failed to load experiences: ${response.status}`);
    }
    const data = await response.json();
    experiencesCache = data as Experience[];
    return experiencesCache;
  } catch (error) {
    console.error('Error loading experiences:', error);
    experiencesCache = [];
    return experiencesCache;
  }
};

export const loadAboutCards = async (): Promise<AboutCard[]> => {
  if (aboutCardsCache) return aboutCardsCache;

  try {
    const response = await fetch('/assets/about.json');
    if (!response.ok) {
      throw new Error(`Failed to load about cards: ${response.status}`);
    }
    const data = await response.json();
    aboutCardsCache = data as AboutCard[];
    return aboutCardsCache;
  } catch (error) {
    console.error('Error loading about cards:', error);
    aboutCardsCache = [];
    return aboutCardsCache;
  }
};
