// Trong file Sidebar.js (hoặc Sidebar.jsx nếu sử dụng JSX)
"use client"
import Link from 'next/link';
import styles from './sidebar.module.scss';
import FolderIcon from '@mui/icons-material/Folder';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import Image from 'next/image';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
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
                Cookies.set('accessToken', '', { secure: true, sameSite: 'strict' });

                router.push('/');

            })
            .catch(error => {
                console.error('Error creating folder:', error);
            });
    }
    useEffect(() => {
        if(accessToken == '') router.push('/');
    },[accessToken])
  return (
    <>
         {!isLogin && 
         <nav className={styles.nav}>
            <Link href='/files'>
          <div className={cx('logo')}>
            <Image src='/images/logo.png' alt='Shub' width={80} height={80}/>
          </div>
        </Link>
            <div className={styles.container}>
            <Link href="/files" >
            <button
                className={pathname=== "/files" ? styles.actionActive : styles.action}
                
                aria-label="My Files"
                title="My Files"
            >
                
                <FolderIcon />
                
                <span className={styles.title}>My Files</span>
            </button>
            </Link>
           
        
        {/* <div className={styles.container}>
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
           
        </div> */}
        
            <Link href="/favourite">
            <button
                className={pathname=== "/favourite" ? styles.actionActive : styles.action}
                
                aria-label="Favourite"
                title="Favourite"
            >
                <StarBorderRoundedIcon />
                <span className={styles.title}>Favourite</span>
            </button>
            </Link>
            <Link href="/shared">
            <button
                className={pathname=== "/shared" ? styles.actionActive : styles.action}
                
                aria-label="Shared"
                title="Shared"
            >
                <ShareOutlinedIcon />
                <span className={styles.title}>Shared</span>
            </button>
            </Link>

            <Link href="/trash">
            <button
                className={pathname=== "/trash" ? styles.actionActive : styles.action}
                
                aria-label="Trash"
                title="Trash"
            >
                <DeleteOutlineRoundedIcon />
                <span className={styles.title}>Trash Files</span>
            </button>
            </Link>
        </div>
        <div className={styles.containerBottom}>
            <Link href="/setting/profile">
            <button
                className={pathname.startsWith("/setting") ? styles.actionActive : styles.action}
                
                aria-label="Settings"
                title="Settings"
            >
                <SettingsOutlinedIcon />
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
        <div className={styles.button}>
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
                <CreateNewFolderOutlinedIcon />
                <span className={styles.title}>New Folder</span>
            </button>
            </Link>
        </div>
    </nav>
    }
    </>
   
  );
};

export default Sidebar;
