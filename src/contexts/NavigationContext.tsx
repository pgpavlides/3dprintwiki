import { createContext, useContext, useState, type ReactNode } from 'react';

interface NavigationContextType {
  customBackHandler: (() => void) | null;
  setCustomBackHandler: (handler: (() => void) | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [customBackHandler, setCustomBackHandler] = useState<(() => void) | null>(null);

  return (
    <NavigationContext.Provider value={{ customBackHandler, setCustomBackHandler }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
