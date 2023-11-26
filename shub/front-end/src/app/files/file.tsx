"use client"
import styles from './file.module.scss'
import Card from "./card/card";
import FileSection from './fileSection/fileSection';
import FolderSection from './folderSection/folderSection';
import { useEffect, useState } from 'react';
import { useShub } from '../Provider/Provider';
import axios from 'axios';

export default function File () {
    

    
    const { showFolder, showFile } = useShub();
   
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem('user_id')
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:3001/folders/user/${id}`,{
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, 
                },
              });
            setFolders(res.data)
            const folders = JSON.stringify(res.data);
            localStorage.setItem('folders', folders)
        }
        fetchData()
    },[folders])
      
    return (
        <div className={styles.container}>
            <FolderSection folders={folders}/>
            <FileSection files={showFile}/>
        </div>
    )
}