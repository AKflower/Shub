"use client"
import { usePathname, useRouter } from "next/navigation";
import React, { useState, createContext, ReactNode, useContext } from "react";

interface ShubContextProps {
    currentPromptName: string;
    toggleCurrentPromptName: () => void;
    showNewFile: string;
    toggleShowNewFile: () => void;
    showNewDir: string;
    toggleShowNewDir: () => void;
    showUpload: string;
    toggleShowUpload: () => void;
    showShare: string;
    toggleShowShare: () => void;
    option: string;
    showOption: () => void;
    hideOption: () => void;
    selected: number;
    handleSelect: (id: number, type1: string) => void;
    showDelete: string;
    toggleShowDelete: () => void;
    showRename: string;
    toggleShowRename: () => void;
    handleNavigation: (name: string) => void;
    change: number;
    handleChange: () => void;
    resetSelect: () => void;
    stream: string;
    handleStream: () => void;
    data: string;
    type: string;
    handleData: (data: string, type: string) => void;
    handleType: (type: string) => void;
   
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

  const [showUpload, setShowUpload] = useState('');
  const toggleShowUpload = () => {
    setShowUpload(showUpload == '' ? 'more' : '');
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

const [selected, setSelected] = useState(0);
const handleSelect = (id: number, type1: string) => {
  if (id == selected && type1 == type) {
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

const [stream, setStream] = useState("");
const handleStream = () => {
  setStream(stream == '' ? 'more' : '');
  setCurrentPromptName(currentPromptName == '' ? 'more' : '');
};

const [data, setData] = useState("");
const [type, setType] = useState("");
const handleData = (data: string, type: string) => {
  setData(data);
  setType(type);
};

const handleType = (type: string) => {
  setType(type);
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
    resetSelect,
    stream,
    handleStream,
    data,
    type,
    handleData,
    showUpload,
    toggleShowUpload,
    handleType,
    
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
