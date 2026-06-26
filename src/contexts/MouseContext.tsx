"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MouseContextType {
  mouseEnabled: boolean;
  setMouseEnabled: (enabled: boolean) => void;
}

const MouseContext = createContext<MouseContextType | undefined>(undefined);

export function MouseProvider({ children }: { children: ReactNode }) {
  const [mouseEnabled, setMouseEnabled] = useState(false);

  return (
    <MouseContext.Provider value={{ mouseEnabled, setMouseEnabled }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse() {
  const context = useContext(MouseContext);
  if (context === undefined) {
    throw new Error("useMouse must be used within a MouseProvider");
  }
  return context;
}

