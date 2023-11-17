"use client"
import styles from './file.module.scss'
import Card from "./card/card";
import FileSection from './fileSection/fileSection';
import FolderSection from './folderSection/folderSection';
import { useState } from 'react';
import { useShub } from '../Provider/Provider';

export default function File () {
    
      
    
    const { showFolder, showFile } = useShub();
    
      

    return (
        <div className={styles.container}>
            <FolderSection folders={showFolder}/>
            <FileSection files={showFile}/>
        </div>
    )
}