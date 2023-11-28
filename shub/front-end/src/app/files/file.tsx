"use client"
import styles from './file.module.scss'
import Card from "./card/card";
import FileSection from './fileSection/fileSection';
import FolderSection from './folderSection/folderSection';
import { useEffect, useState } from 'react';
import { useShub } from '../Provider/Provider';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation'; 
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function File () {
    const router = useRouter();
    const { showFile, change } = useShub();
    const [show, setShow] = useState('');
    const pathname = usePathname()
    const test = localStorage.getItem('folders')
    let folders
    if (test) {
        folders = JSON.parse(test) 
    }
    
    useEffect(() => {
        if (pathname != '/files') {
            setShow('show')
        } else setShow('')

        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');
            const path = pathname.replaceAll('/','+')

            const res = await axios.get(`http://localhost:3001/folders/${userId}/${path}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                });

            const folders = JSON.stringify(res.data);
            localStorage.setItem('folders', folders)
        }
        fetchData()
    },[change])
      
    return (
        <div className={styles.container}>
            {show &&(<button onClick={() => {
                router.push(pathname.slice(0, pathname.lastIndexOf('/')))
            }}><ArrowBackIosNewIcon /></button>)}
            <FolderSection folders={folders}/>
            <FileSection files={showFile}/>
        </div>
    )
}