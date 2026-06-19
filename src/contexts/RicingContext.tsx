// src/contexts/RicingContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface RicingContextType {
  gaps: number;
  setGaps: (value: number) => void;
  borderRadius: number;
  setBorderRadius: (value: number) => void;
  glow: boolean;
  setGlow: (value: boolean) => void;
}

const RicingContext = createContext<RicingContextType | undefined>(undefined);

export const RicingProvider = ({ children }: { children: ReactNode }) => {
  const [gaps, setGaps] = useState(4);
  const [borderRadius, setBorderRadius] = useState(8);
  const [glow, setGlow] = useState(true);

  return (
    <RicingContext.Provider
      value={{ gaps, setGaps, borderRadius, setBorderRadius, glow, setGlow }}
    >
      {children}
    </RicingContext.Provider>
  );
};

export const useRicing = () => {
  const context = useContext(RicingContext);
  if (context === undefined) {
    throw new Error("useRicing must be used within a RicingProvider");
  }
  return context;
};
