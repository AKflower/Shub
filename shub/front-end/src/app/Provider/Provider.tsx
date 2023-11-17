"use client"
import React, { useState, createContext, ReactNode, useContext } from "react";

interface ShubContextProps {
    currentPromptName: string;
    toggleCurrentPromptName: () => void;
    showNewFile: string;
    toggleShowNewFile: () => void;
    showNewDir: string;
    toggleShowNewDir: () => void;
}

const ShubContext = createContext<ShubContextProps | undefined>(undefined);

interface ShubProviderProps {
  children: ReactNode;
}

export function ShubProvider({ children }: ShubProviderProps): JSX.Element {
  const [currentPromptName, setCurrentPromptName] = useState('');
  const toggleCurrentPromptName = () => {
    setCurrentPromptName(currentPromptName == '' ? 'more' : '');
  };  

  const [showNewFile, setShowNewFile] = useState('');
  const toggleShowNewFile = () => {
    setShowNewFile(showNewFile == '' ? 'more' : '');
  };  

  const [showNewDir, setShowNewDir] = useState('');
  const toggleShowNewDir = () => {
    setShowNewDir(showNewDir == '' ? 'more' : '');
  }; 
  

  const value: ShubContextProps = {
    currentPromptName,
    toggleCurrentPromptName,
    showNewFile,
    toggleShowNewFile,
    showNewDir,
    toggleShowNewDir
  };

  return <ShubContext.Provider value={value}>{children}</ShubContext.Provider>;
}

export function useShub(): ShubContextProps {
  const context = useContext(ShubContext);

  if (!context) {
    throw new Error("useShub must be used within a ShubProvider");
  }

  return context;
}
