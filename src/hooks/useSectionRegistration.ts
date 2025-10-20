import { useEffect } from 'react';
import { useNavigation } from '../contexts/NavigationContext';

interface UseSectionRegistrationProps {
  id: string;
  label: string;
}

export const useSectionRegistration = ({ id, label }: UseSectionRegistrationProps) => {
  const { registerNavItem, unregisterNavItem } = useNavigation();

  useEffect(() => {
    // Register the section when component mounts
    registerNavItem({ id, label });

    // Unregister when component unmounts
    return () => {
      unregisterNavItem(id);
    };
  }, [id, label, registerNavItem, unregisterNavItem]);
};
