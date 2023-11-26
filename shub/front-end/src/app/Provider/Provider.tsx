"use client"
import axios from "axios";
import React, { useState, createContext, ReactNode, useContext, useEffect } from "react";
const folder = [
  {
    id: 1,
    name: 'ppl',
    date: '10 days ago',
  },
  {
    id: 2,
    name: 'Folder 31',
    date: '10 days ago',
  },
  {
    id: 3,
    name: 'Folder 44',
    date: '10 days ago',
  },
  {
    id: 4,
    name: 'Folder 12',
    date: '10 days ago',
  },
  {
    id: 5,
    name: 'Folder 88',
    date: '10 days ago',
  },
  {
    id: 6,
    name: 'Folder 56',
    date: '10 days ago',
  },
  {
    id: 7,
    name: 'Folder 73',
    date: '10 days ago',
  },
  {
    id: 8,
    name: 'Folder 5',
    date: '10 days ago',
  },
  {
    id: 9,
    name: 'Folder 91',
    date: '10 days ago',
  },
  {
    id: 10,
    name: 'Folder 23',
    date: '10 days ago',
  },
];

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
    showFolder: any;
    addFolder: (folderName: string) => void;
    delFolder: (id: number) => void;
    renameFolder: (id: number, newName: string) => void;
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
}

const ShubContext = createContext<ShubContextProps | undefined>(undefined);

interface ShubProviderProps {
  children: ReactNode;
}

export function ShubProvider({ children }: ShubProviderProps): JSX.Element {
 
  
  

  const [showFolder, setShowFolder] = useState(folder);
  const addFolder = (folderName: string) => {
    setShowFolder([...showFolder, 
      {
        id: showFolder.length + 1,
        name: folderName,
        date: '10 days ago',
      }
    ])
  } 
  const delFolder = (id: number) => {
    const foundFolder = showFolder.find((el) => el.id === id);
    if(foundFolder) showFolder.splice(showFolder.indexOf(foundFolder), 1)
    setShowFolder([...showFolder])
    setSelected(0);
    hideOption()
  }
  const renameFolder = (id: number, newName: string) => {
    const foundFolder = showFolder.find((el) => el.id === id);

    if (foundFolder) {
      foundFolder.name = newName;
    }
    setShowFolder([...showFolder])
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
  };  

  const [showNewDir, setShowNewDir] = useState('');
  const toggleShowNewDir = () => {
    setShowNewDir(showNewDir == '' ? 'more' : '');
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

const [showDelete, setShowDelete] = useState("");
const toggleShowDelete = () => {
  setShowDelete(showDelete == '' ? 'more' : '');
};

const [showRename, setShowRename] = useState("");
const toggleShowRename = () => {
  setShowRename(showRename == '' ? 'more' : '');
};
  
  const value: ShubContextProps = {

    currentPromptName,
    toggleCurrentPromptName,
    showNewFile,
    toggleShowNewFile,
    showNewDir,
    toggleShowNewDir,
    showFolder,
    addFolder,
    delFolder,
    renameFolder,
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
