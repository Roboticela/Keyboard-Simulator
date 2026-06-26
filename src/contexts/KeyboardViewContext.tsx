"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface KeyboardViewContextType {
  resetView: () => void;
  registerResetCallback: (callback: () => void) => () => void;
}

const KeyboardViewContext = createContext<KeyboardViewContextType | undefined>(undefined);

export function KeyboardViewProvider({ children }: { children: ReactNode }) {
  const [resetCallbacks, setResetCallbacks] = useState<Set<() => void>>(new Set());

  const registerResetCallback = (callback: () => void) => {
    setResetCallbacks((prev) => {
      const newSet = new Set(prev);
      newSet.add(callback);
      return newSet;
    });

    // Return unregister function
    return () => {
      setResetCallbacks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(callback);
        return newSet;
      });
    };
  };

  const resetView = () => {
    resetCallbacks.forEach((callback) => callback());
  };

  return (
    <KeyboardViewContext.Provider value={{ resetView, registerResetCallback }}>
      {children}
    </KeyboardViewContext.Provider>
  );
}

export function useKeyboardView() {
  const context = useContext(KeyboardViewContext);
  if (context === undefined) {
    throw new Error("useKeyboardView must be used within a KeyboardViewProvider");
  }
  return context;
}

