"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type KeyboardType = "asus-ux370uar" | "dell-latitude-5300-2-in-1" | "dell-latitude-e7270" | "hp-elitebook-820-g4" | "toshiba-portege-x30-e";

interface KeyboardTypeContextType {
  keyboardType: KeyboardType;
  setKeyboardType: (type: KeyboardType) => void;
}

const KeyboardTypeContext = createContext<KeyboardTypeContextType | undefined>(undefined);

export function KeyboardTypeProvider({ children }: { children: ReactNode }) {
  const [keyboardType, setKeyboardTypeState] = useState<KeyboardType>("asus-ux370uar");

  useEffect(() => {
    const savedKeyboardType = localStorage.getItem("keyboardType") as KeyboardType;
    if (savedKeyboardType && (savedKeyboardType === "asus-ux370uar" || savedKeyboardType === "dell-latitude-5300-2-in-1" || savedKeyboardType === "dell-latitude-e7270" || savedKeyboardType === "hp-elitebook-820-g4" || savedKeyboardType === "toshiba-portege-x30-e")) {
      setKeyboardTypeState(savedKeyboardType);
    }
  }, []);

  const setKeyboardType = (type: KeyboardType) => {
    setKeyboardTypeState(type);
    localStorage.setItem("keyboardType", type);
  };

  return (
    <KeyboardTypeContext.Provider value={{ keyboardType, setKeyboardType }}>
      {children}
    </KeyboardTypeContext.Provider>
  );
}

export function useKeyboardType() {
  const context = useContext(KeyboardTypeContext);
  if (context === undefined) {
    throw new Error("useKeyboardType must be used within a KeyboardTypeProvider");
  }
  return context;
}

