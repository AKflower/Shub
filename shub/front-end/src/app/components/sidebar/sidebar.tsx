// Trong file Sidebar.js (hoặc Sidebar.jsx nếu sử dụng JSX)
"use client"
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './sidebar.module.scss';
import FolderIcon from '@mui/icons-material/Folder';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import classNames from 'classnames/bind';
import NewFile from '../prompts/NewFile';
import { usePathname } from 'next/navigation'

const cx = classNames.bind(styles);


const Sidebar = () => {
    const [currentPromptName, setCurrentPromptName] = useState("");

    const [showNewFile, setShowNewFile] = useState("");
    const pathname = usePathname()
    const isLogin = (pathname=='/') //check login page ? not render : render    
  return (
    <>
         {!isLogin && 
         <nav className={styles.nav}>
        <div className={styles.container}>
            <Link href="/files" >
            <button
                className={styles.action}
                
                aria-label="My Files"
                title="My Files"
            >
                <FolderIcon />
                <span className={styles.title}>My Files</span>
            </button>
            </Link>
           
        </div>
        <div className={styles.container}>
            <Link href="">
                <button
                className={styles.action}
               
                aria-label="New Folder"
                title="New Folder"
            >
                <CreateNewFolderIcon />
                <span className={styles.title}>New Folder</span>
            </button>
            </Link>
            <Link href="">
            <button
                className={styles.action}
                onClick={()=>{
                    setShowNewFile('show')
                    setCurrentPromptName('more')
                }}
                aria-label="New File"
                title="New File"
            >
                <NoteAddIcon />
                <span className={styles.title}>New File</span>
            </button>
            </Link>
           
        </div>
        <div className={styles.container}>
            <Link href="/setting/profile">
            <button
                className={styles.action}
                
                aria-label="Settings"
                title="Settingse"
            >
                <SettingsApplicationsIcon />
                <span className={styles.title}>Settings</span>
            </button>
            </Link>
            <Link href="">
            <button
                className={styles.action}
               
                aria-label="Logout"
                title="Logout"
            >
                <LogoutIcon />
                <span className={styles.title}>Logout</span>
            </button>
            </Link>

            {showNewFile && (
        <NewFile />
      )}
            {currentPromptName === 'more' && (
        <div className={cx('overlay')}
      // onClick={*/() => dispatch({ type: 'closeHovers' })*/} 
        onClick={
          ()=>{
            setCurrentPromptName('')
            if(showNewFile){setShowNewFile('')}
          }
        }
      />
      )}
        </div>
    </nav>
    }
    </>
   
  );
};

export default Sidebar;
