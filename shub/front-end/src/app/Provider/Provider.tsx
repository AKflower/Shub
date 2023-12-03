"use client"
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, createContext, ReactNode, useContext, useEffect } from "react";

const files = [
  {
    id: 1,
    name: 'Math',
    size: '15KB',
    date: '7 days ago',
  },
  {
    id: 2,
    name: 'Physics',
    size: '8KB',
    date: '12 days ago',
  },
  {
    id: 3,
    name: 'Chemistry',
    size: '20KB',
    date: '5 days ago',
  },
  {
    id: 4,
    name: 'Biology',
    size: '12KB',
    date: '10 days ago',
  },
  {
    id: 5,
    name: 'History',
    size: '18KB',
    date: '3 days ago',
  },
  {
    id: 6,
    name: 'Literature',
    size: '25KB',
    date: '8 days ago',
  },
  {
    id: 7,
    name: 'Geography',
    size: '14KB',
    date: '6 days ago',
  },
  {
    id: 8,
    name: 'Computer Science',
    size: '22KB',
    date: '9 days ago',
  },
  {
    id: 9,
    name: 'Art',
    size: '10KB',
    date: '15 days ago',
  },
  {
    id: 10,
    name: 'Music',
    size: '30KB',
    date: '4 days ago',
  },
];

interface ShubContextProps {
    currentPromptName: string;
    toggleCurrentPromptName: () => void;
    showNewFile: string;
    toggleShowNewFile: () => void;
    showNewDir: string;
    toggleShowNewDir: () => void;
    showFile: any;
    addFile: (fileName: string) => void;
    showShare: string;
    toggleShowShare: () => void;
    option: string;
    showOption: () => void;
    hideOption: () => void;
    selected: number;
    handleSelect: (id: number) => void;
    showDelete: string;
    toggleShowDelete: () => void;
    showRename: string;
    toggleShowRename: () => void;
    handleNavigation: (name: string) => void;
    change: number;
    handleChange: () => void;
    dSelected: number;
    handleDSelected: (id: number) => void;
    resetSelect: () => void;
}

const ShubContext = createContext<ShubContextProps | undefined>(undefined);

interface ShubProviderProps {
  children: ReactNode;
}

export function ShubProvider({ children }: ShubProviderProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname()

  const [change, setChange] = useState(0);
  const handleChange= () =>{
    setChange(change+1)
  }
  
  const [showFile, setShowFile] = useState(files);
  const addFile = (fileName: string) => {
    setShowFile([...showFile, 
      {
        id: 12,
        name: fileName,
        size: '10KB',
        date: '10 days ago',
      }
    ])
  }

  const [currentPromptName, setCurrentPromptName] = useState('');
  const toggleCurrentPromptName = () => {
    setCurrentPromptName(currentPromptName == '' ? 'more' : '');
  };  

  const [showNewFile, setShowNewFile] = useState('');
  const toggleShowNewFile = () => {
    setShowNewFile(showNewFile == '' ? 'more' : '');
    setCurrentPromptName(currentPromptName == '' ? 'more' : '');
  };  

  const [showNewDir, setShowNewDir] = useState('');
  const toggleShowNewDir = () => {
    setShowNewDir(showNewDir == '' ? 'more' : '');
    setCurrentPromptName(currentPromptName == '' ? 'more' : '');
  }; 

  const [showShare, setShowShare] = useState('');
  const toggleShowShare = () => {
    setShowShare(showNewDir == '' ? 'more' : '');
  }; 

  const [option, setOption] = useState('');
  const showOption = () => {
    setOption('more');
  }
  const hideOption = () => {
    setOption('');
  }

const [dSelected, setDSelected] = useState(0);
const handleDSelected = (id:number) => {
  setDSelected(id)
}

const [selected, setSelected] = useState(0);
const handleSelect = (id:number) => {
  if (id==selected) {
      setSelected(0);
      hideOption()
  }
  else {
      setSelected(id);
      showOption()
  }
}
const resetSelect = () => {
  setSelected(0)
}

const [showDelete, setShowDelete] = useState("");
const toggleShowDelete = () => {
    setCurrentPromptName(currentPromptName == '' ? 'more' : '');
    setShowDelete(showDelete == '' ? 'more' : '');
};

const [showRename, setShowRename] = useState("");
const toggleShowRename = () => {
  setShowRename(showRename == '' ? 'more' : '');
  setCurrentPromptName(currentPromptName == '' ? 'more' : '');
};

const handleNavigation = (name: string) => {
  router.push(`${pathname}/${name}`);
};
  
  const value: ShubContextProps = {

    currentPromptName,
    toggleCurrentPromptName,
    showNewFile,
    toggleShowNewFile,
    showNewDir,
    toggleShowNewDir,
    showFile,
    addFile,
    showShare,
    toggleShowShare,
    option,
    showOption,
    hideOption,
    selected,
    handleSelect,
    showDelete,
    toggleShowDelete,
    showRename,
    toggleShowRename,
    handleNavigation,
    change,
    handleChange,
    dSelected,
    handleDSelected,
    resetSelect
    
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
