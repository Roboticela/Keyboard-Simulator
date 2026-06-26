'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface ModifierKeys {
  shift?: boolean;
  ctrl?: boolean;
  alt?: boolean;
  meta?: boolean;
  capsLock?: boolean;
  fn?: boolean;
}

interface KeyboardInputContextType {
  handleKeyPress: (key: string, modifiers?: ModifierKeys) => void;
  subscribe: (callback: (key: string, modifiers?: ModifierKeys) => void) => () => void;
}

const KeyboardInputContext = createContext<KeyboardInputContextType | undefined>(undefined);

export function KeyboardInputProvider({ children }: { children: ReactNode }) {
  const [subscribers, setSubscribers] = useState<Set<(key: string, modifiers?: ModifierKeys) => void>>(new Set());

  const handleKeyPress = useCallback((key: string, modifiers: ModifierKeys = {}) => {
    subscribers.forEach(callback => {
      callback(key, modifiers);
    });
  }, [subscribers]);

  const subscribe = useCallback((callback: (key: string, modifiers?: ModifierKeys) => void) => {
    setSubscribers(prev => new Set([...prev, callback]));
    return () => {
      setSubscribers(prev => {
        const next = new Set(prev);
        next.delete(callback);
        return next;
      });
    };
  }, []);

  return (
    <KeyboardInputContext.Provider value={{ handleKeyPress, subscribe }}>
      {children}
    </KeyboardInputContext.Provider>
  );
}

export function useKeyboardInput() {
  const context = useContext(KeyboardInputContext);
  if (context === undefined) {
    throw new Error('useKeyboardInput must be used within a KeyboardInputProvider');
  }
  return context;
}

