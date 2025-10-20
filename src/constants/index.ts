export const ExperienceCategory = {
  WORK: 'work',
  EDUCATION: 'education',
  PATENT: 'patent'
} as const;

export type ExperienceCategoryType = typeof ExperienceCategory[keyof typeof ExperienceCategory];

// App-wide constants

export const ROLES = [
  'Cloud Platform Engineer',
  'System Architect',
  'ML/AI Enthusiast',
  'Tech Innovator',
  'DevOps Specialist',
  'Backend Developer',
  'Technical Leader',
] as const;

export const GLITCH_COLORS = ['#6365f17a', '#0ea4e980', '#06b5d47e'];

export const COLOR_SCHEMES = [
  { accent: 'g1', spotlight: 'rgba(124, 58, 237, 0.25)', textColor: 'text-purple-700', tagColor: 'bg-purple-100 text-purple-700', gradient: 'from-violet-500 to-fuchsia-500' },
  { accent: 'g2', spotlight: 'rgba(59, 130, 246, 0.25)', textColor: 'text-blue-700', tagColor: 'bg-blue-100 text-blue-700', gradient: 'from-blue-500 to-cyan-500' },
  { accent: 'g3', spotlight: 'rgba(16, 185, 129, 0.25)', textColor: 'text-emerald-700', tagColor: 'bg-emerald-100 text-emerald-700', gradient: 'from-emerald-500 to-teal-500' },
  { accent: 'g4', spotlight: 'rgba(245, 158, 11, 0.25)', textColor: 'text-orange-700', tagColor: 'bg-orange-100 text-orange-700', gradient: 'from-orange-500 to-rose-500' },
  { accent: 'g5', spotlight: 'rgba(239, 68, 68, 0.25)', textColor: 'text-red-700', tagColor: 'bg-red-100 text-red-700', gradient: 'from-indigo-500 to-purple-500' },
  { accent: 'g6', spotlight: 'rgba(139, 92, 246, 0.25)', textColor: 'text-violet-700', tagColor: 'bg-violet-100 text-violet-700', gradient: 'from-teal-500 to-emerald-500' }
];

export const CONSOLE_COMMANDS = {
  help: "Show this list of commands",
  clear: "Clear all console logs",
  hello: "Get a friendly greeting",
  download: "Download the resume",
  wave: "Byte waves at you",
  about: "Scroll to About section",
  projects: "Scroll to Projects section",
  contact: "Scroll to Contact section",
  home: "Scroll to top"
} as const;

export const TYPING_CONFIG = {
  typingSpeed: 90,
  deletingSpeed: 45,
  pauseDuration: 1700,
  deletePauseDuration: 450
} as const;
