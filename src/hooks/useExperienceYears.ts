import { useState, useEffect } from 'react';
import { ExperienceCategory } from '../constants';
import { loadExperiences, type Experience } from '../utils/dataLoader';

const MONTHS = {
  'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
  'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
};

const parseDateRange = (period: string) => {
  const [startStr, endStr] = period.split(' – ');

  const parseDate = (dateStr: string) => {
    if (dateStr === 'Present') return new Date();

    const [month, year] = dateStr.split(' ');
    return new Date(parseInt(year), MONTHS[month as keyof typeof MONTHS]);
  };

  return {
    start: parseDate(startStr),
    end: parseDate(endStr)
  };
};

const calculateExperienceYears = (experiences: Experience[]): number => {
  // Filter work experiences only
  const workExperiences = experiences.filter(exp => exp.category === ExperienceCategory.WORK);

  // Parse all date ranges
  const dateRanges = workExperiences.map(exp => parseDateRange(exp.period));

  // Sort by start date
  dateRanges.sort((a, b) => a.start.getTime() - b.start.getTime());

  // Merge overlapping ranges and calculate total days
  let totalDays = 0;
  let currentStart = dateRanges[0]?.start;
  let currentEnd = dateRanges[0]?.end;

  for (let i = 1; i < dateRanges.length; i++) {
    const { start, end } = dateRanges[i];

    if (start <= currentEnd) {
      // Overlapping or adjacent, extend current range
      currentEnd = new Date(Math.max(currentEnd.getTime(), end.getTime()));
    } else {
      // No overlap, add current range to total and start new range
      const rangeDays = Math.ceil((currentEnd.getTime() - currentStart.getTime()) / (1000 * 60 * 60 * 24));
      totalDays += rangeDays;

      currentStart = start;
      currentEnd = end;
    }
  }

  // Add the last range
  if (currentStart && currentEnd) {
    const rangeDays = Math.ceil((currentEnd.getTime() - currentStart.getTime()) / (1000 * 60 * 60 * 24));
    totalDays += rangeDays;
  }

  return Math.floor(totalDays / 365);
};

export const useExperienceYears = () => {
  const [years, setYears] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const experiences = await loadExperiences();
        const calculatedYears = calculateExperienceYears(experiences);
        setYears(calculatedYears);
      } catch (error) {
        console.error('Error calculating experience years:', error);
        setYears(0);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { years, loading };
};
