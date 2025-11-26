"use client"
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface DonationContextType {
  isDonationOpen: boolean;
  setIsDonationOpen: Dispatch<SetStateAction<boolean>>;
}

export const DonationFormContext = createContext<DonationContextType | null>(null);

interface DonationProviderProps {
  children: ReactNode;
}

export const DonationProvider: React.FC<DonationProviderProps> = ({ children }) => {
  const [isDonationOpen , setIsDonationOpen] = useState<boolean>(false);

  return (
    <DonationFormContext.Provider value={{ isDonationOpen , setIsDonationOpen }}>
      {children}
    </DonationFormContext.Provider>
  );
};

export default DonationFormContext;
