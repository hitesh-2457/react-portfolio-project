import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface NavigationContextType {
  navItems: NavItem[];
  registerNavItem: (item: NavItem) => void;
  unregisterNavItem: (id: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  const registerNavItem = useCallback((item: NavItem) => {
    setNavItems(prev => {
      // Remove existing item with same id if present
      const filtered = prev.filter(navItem => navItem.id !== item.id);
      // Add the new item
      return [...filtered, item];
    });
  }, []);

  const unregisterNavItem = useCallback((id: string) => {
    setNavItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <NavigationContext.Provider value={{ navItems, registerNavItem, unregisterNavItem }}>
      {children}
    </NavigationContext.Provider>
  );
};
