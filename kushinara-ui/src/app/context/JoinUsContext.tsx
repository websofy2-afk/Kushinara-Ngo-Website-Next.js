"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface JoinUsContextProps {
  isJoinUsOpen: boolean;
  openJoinUs: () => void;
  closeJoinUs: () => void;
}

const JoinUsContext = createContext<JoinUsContextProps | undefined>(undefined);

export const JoinUsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isJoinUsOpen, setIsJoinUsOpen] = useState(false);
  const openJoinUs = () => setIsJoinUsOpen(true);
  const closeJoinUs = () => setIsJoinUsOpen(false);

  return (
    <JoinUsContext.Provider value={{ isJoinUsOpen, openJoinUs, closeJoinUs }}>
      {children}
    </JoinUsContext.Provider>
  );
};

export const useJoinUs = (): JoinUsContextProps => {
  const context = useContext(JoinUsContext);
  if (!context) {
    throw new Error("useJoinUs must be used within a JoinUsProvider");
  }
  return context;
};
