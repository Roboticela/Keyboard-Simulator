"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {
  DEFAULT_KEYBOARD_TYPE,
  VALID_KEYBOARD_TYPES,
  type KeyboardType,
} from "@/lib/keyboard-types";

export type { KeyboardType };

interface KeyboardTypeContextType {
  keyboardType: KeyboardType;
  setKeyboardType: (type: KeyboardType) => void;
}

const KeyboardTypeContext = createContext<KeyboardTypeContextType | undefined>(undefined);

export function KeyboardTypeProvider({ children }: { children: ReactNode }) {
  const [keyboardType, setKeyboardTypeState] = useState<KeyboardType>(DEFAULT_KEYBOARD_TYPE);

  useEffect(() => {
    const savedKeyboardType = localStorage.getItem("keyboardType") as KeyboardType;
    if (savedKeyboardType && VALID_KEYBOARD_TYPES.includes(savedKeyboardType)) {
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
