import { useState, useEffect } from 'react';
import { TYPING_CONFIG } from '../constants';

interface UseTypingEffectOptions {
  roles: readonly string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  deletePauseDuration?: number;
}

export const useTypingEffect = ({
  roles,
  typingSpeed = TYPING_CONFIG.typingSpeed,
  deletingSpeed = TYPING_CONFIG.deletingSpeed,
  pauseDuration = TYPING_CONFIG.pauseDuration,
  deletePauseDuration = TYPING_CONFIG.deletePauseDuration
}: UseTypingEffectOptions) => {
  const [displayedRole, setDisplayedRole] = useState<string>('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const current = roles[roleIndex];

    if (!deleting && charIndex < current.length) {
      timeoutId = setTimeout(() => {
        setCharIndex((ci) => {
          const next = ci + 1;
          const clampedNext = Math.max(0, Math.min(next, current.length));
          setDisplayedRole(current.substring(0, clampedNext));
          return next;
        });
      }, typingSpeed);
    } else if (!deleting && charIndex === current.length) {
      timeoutId = setTimeout(() => setDeleting(true), pauseDuration);
    } else if (deleting && charIndex > 0) {
      timeoutId = setTimeout(() => {
        setCharIndex((ci) => {
          const next = ci - 1;
          const clampedNext = Math.max(0, Math.min(next, current.length));
          setDisplayedRole(current.substring(0, clampedNext));
          return next;
        });
      }, deletingSpeed);
    } else if (deleting && charIndex === 0) {
      timeoutId = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((ri) => (ri + 1) % roles.length);
      }, deletePauseDuration);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [charIndex, deleting, roleIndex, roles, typingSpeed, deletingSpeed, pauseDuration, deletePauseDuration]);

  return displayedRole;
};
