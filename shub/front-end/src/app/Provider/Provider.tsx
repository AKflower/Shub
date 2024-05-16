"use client"
import { usePathname, useRouter } from "next/navigation";
import React, { useState, createContext, ReactNode, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type User = {
  access_token: string,
  user_id: string,
  email: string,
  password: string,
}

interface FoldersProps {
  folder_id: string,
  folder_name: string,
  folder_path: string,
  user_id: string,
  created_date: string,
  updated_date: string,
  isFavourite: boolean,
  isDelete: boolean,
  share: string[],

}

interface FileProps {
  file_id: string,
  file_name: string,
  file_path: string,
  cid: string,
  file_type: string,
  user_id: string,
  created_date: string,
  updated_date: string,
  isFavourite: boolean,
  isDelete: boolean,
  share: string[],
  file_size:string,
}

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
    selected: string;
    handleSelect: (id: string, type1: string) => void;
    name: string;
    handleName: (name: string) => void;
    showDelete: string;
    toggleShowDelete: () => void;
    showRestore: string;
    toggleShowRestore: () => void;
    showPermanentlyDelete: string;
    toggleShowPermanentlyDelete: () => void;
    showRename: string;
    toggleShowRename: () => void;
    showCopy: string;
    toggleShowCopy: () => void;
    showMove: string;
    toggleShowMove: () => void;
    showDownload: string;
    toggleShowDownload: () => void;
    showLock: string;
    toggleShowLock: () => void;
    showInfo: string;
    toggleShowInfo: () => void;
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
    isFavourite: boolean;
    handleIsFavourite: (isFavourite: boolean) => void;
    infoFolder: FoldersProps|undefined;
    handleInfoFolder: (infoFolder: FoldersProps|undefined) => void;
    infoFile: FileProps|undefined;
    handleInfoFile: (infoFile: FileProps|undefined) => void;
    isDelete: boolean;
    handleShare: (share: string[]) => void;
    share: string[];
    handleIsDelete: (isFavourite: boolean) => void;
    showChangePassword: string;
    toggleShowChangePassword: () => void;
    sessionInfo : any;
    fetchDataSession: () => void;
    showResetPassword: string;
    toggleShowResetPassword: () => void;
}

const ShubContext = createContext<ShubContextProps | undefined>(undefined);

interface ShubProviderProps {
  children: ReactNode;
}

export function ShubProvider({ children }: ShubProviderProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname()
  const userId = Cookies.get('userId');

  const [sessionInfo, setSessionInfo] = useState()
  const fetchDataSession = async () => {
  const res = await axios.get(`http://localhost:3001/user/session`,{
    params: {
      user_id: userId
    }
  });
    setSessionInfo(res.data)
  }
  useEffect(() => {
   
    fetchDataSession();
    
  }, [pathname]
  
  )
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
    // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
  };  

  const [showNewDir, setShowNewDir] = useState('');
  const toggleShowNewDir = () => {
    setShowNewDir(showNewDir == '' ? 'more' : '');
    // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
  }; 

  const [showUpload, setShowUpload] = useState('');
  const toggleShowUpload = () => {
    setShowUpload(showUpload == '' ? 'more' : '');
    // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
  }; 

 

  const [option, setOption] = useState('');
  const showOption = () => {
    setOption('more');
  }
  const hideOption = () => {
    setOption('');
  }

const [selected, setSelected] = useState('');
const handleSelect = (id: string, type1: string) => {
  if (id == selected && type1 == type) {
      setSelected('');
      hideOption()
  }
  else {
      setSelected(id);
      showOption()
  }
}

const [name, setName] = useState('');
const handleName = (name: string) => {
  setName(name)
}

const [infoFolder, setInfoFolder] = useState<FoldersProps|undefined>();
const handleInfoFolder = (infoFolder: FoldersProps|undefined) => {
  setInfoFolder(infoFolder)
}

const [infoFile, setInfoFile] = useState<FileProps|undefined>();
const handleInfoFile = (infoFile: FileProps|undefined) => {
  setInfoFile(infoFile)
}

const resetSelect = () => {
  setSelected('')
}

const [showDelete, setShowDelete] = useState("");
const toggleShowDelete = () => {
    // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
    setShowDelete(showDelete == '' ? 'more' : '');
};

const [showRestore, setShowRestore] = useState("");
const toggleShowRestore = () => {
    // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
    setShowRestore(showRestore == '' ? 'more' : '');
};

const [showPermanentlyDelete, setShowPermanentlyDelete] = useState("");
const toggleShowPermanentlyDelete = () => {
    // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
    setShowPermanentlyDelete(showPermanentlyDelete == '' ? 'more' : '');
};


const [showRename, setShowRename] = useState("");
const toggleShowRename = () => {
  setShowRename(showRename == '' ? 'more' : '');
  // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
};

const [showCopy, setShowCopy] = useState("");
const toggleShowCopy = () => {
  setShowCopy(showCopy == '' ? 'more' : '');
  // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
};

const [showMove, setShowMove] = useState("");
const toggleShowMove = () => {
  setShowMove(showMove == '' ? 'more' : '');
  // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
};

const [showShare, setShowShare] = useState("");
const toggleShowShare = () => {
  setShowShare(showShare == '' ? 'more' : '');
  // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
};

const [showDownload, setShowDownload] = useState("");
const toggleShowDownload = () => {
  setShowDownload(showDownload == '' ? 'more' : '');
  // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
};

const [showLock, setShowLock] = useState("");
const toggleShowLock = () => {
  setShowLock(showLock == '' ? 'more' : '');
  // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
};

const [showInfo, setShowInfo] = useState("");
const toggleShowInfo = () => {
  setShowInfo(showInfo == '' ? 'more' : '');
  // setCurrentPromptName(currentPromptName == '' ? 'more' : '');
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
  router.push(`${name}`);
};
const [showChangePassword, setShowChangePassword] = useState("");
const toggleShowChangePassword = () => {
  setShowChangePassword( showChangePassword== '' ? 'more' : '');
  setCurrentPromptName(currentPromptName == '' ? 'more' : '');
};
const [showResetPassword, setShowResetPassword] = useState("");
const toggleShowResetPassword = () => {
  setShowResetPassword(showResetPassword == '' ? 'more' : '');
  setCurrentPromptName(currentPromptName == '' ? 'more' : '');
}


const [isFavourite, setIsFavourite] = useState(false);
const handleIsFavourite = (isFavourite: boolean) =>{
  setIsFavourite(isFavourite)
}

const [isDelete, setIsDelete] = useState(false);
const handleIsDelete = (isDelete: boolean) =>{
  setIsDelete(isDelete)
}

const [share, setShare] = useState<string[]>([]);
const handleShare = (share: string[]) =>{
  setShare(share)
}




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
    showRestore,
    toggleShowRestore,
    showPermanentlyDelete,
    toggleShowPermanentlyDelete,
    showRename,
    toggleShowRename,
    showCopy,
    toggleShowCopy,
    showMove,
    toggleShowMove,
    showDownload,
    toggleShowDownload,
    showInfo,
    toggleShowInfo,
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
    showChangePassword,
    toggleShowChangePassword,
    showLock,
    toggleShowLock,
    isFavourite,
    handleIsFavourite,
    isDelete,
    handleIsDelete,
    handleShare,
    share,
    name,
    handleName,

    sessionInfo,
    fetchDataSession,
    showResetPassword,
    toggleShowResetPassword,
    infoFolder,
    infoFile,
    handleInfoFile,
    handleInfoFolder

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
