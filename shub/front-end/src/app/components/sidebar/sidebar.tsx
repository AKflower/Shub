// Trong file Sidebar.js (hoặc Sidebar.jsx nếu sử dụng JSX)
"use client"
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
import NewDir from '../prompts/NewDir';
import { useShub } from '@/app/Provider/Provider';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);


const Sidebar = () => {
    const { toggleCurrentPromptName, toggleShowNewFile, toggleShowNewDir } = useShub();
    const pathname = usePathname()
    const isLogin = (pathname=='/') //check login page ? not render : render
    const accessToken = Cookies.get('accessToken');
    const router = useRouter();

    const logOut = () => {
        axios.post(`http://localhost:3001/auth/logout/${accessToken}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            })
            .then(response => {
                console.log('Logout success');
                router.push('/');

            })
            .catch(error => {
                console.error('Error creating folder:', error);
            });
    }
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
                onClick={()=>{
                    toggleShowNewDir()
                    toggleCurrentPromptName()
                }}
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
                    toggleShowNewFile()
                    toggleCurrentPromptName()
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
                onClick={logOut}
                aria-label="Logout"
                title="Logout"
            >
                <LogoutIcon />
                <span className={styles.title}>Logout</span>
            </button>
            </Link>

            
            
        </div>
       
    </nav>
    }
    </>
   
  );
};

export default Sidebar;
