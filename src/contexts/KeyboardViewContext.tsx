"use client";

import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from "react";

interface KeyboardViewContextType {
  resetView: () => void;
  registerResetCallback: (callback: () => void) => () => void;
}

const KeyboardViewContext = createContext<KeyboardViewContextType | undefined>(undefined);

export function KeyboardViewProvider({ children }: { children: ReactNode }) {
  const resetCallbacksRef = useRef<Set<() => void>>(new Set());

  const registerResetCallback = useCallback((callback: () => void) => {
    resetCallbacksRef.current.add(callback);
    return () => {
      resetCallbacksRef.current.delete(callback);
    };
  }, []);

  const resetView = useCallback(() => {
    resetCallbacksRef.current.forEach((callback) => callback());
  }, []);

  const value = useMemo(
    () => ({ resetView, registerResetCallback }),
    [resetView, registerResetCallback],
  );

  return (
    <KeyboardViewContext.Provider value={value}>
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
