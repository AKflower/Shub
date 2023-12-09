"use client"
import styles from './folderSection.module.scss'
import Card from '../card/card'
import { useState } from 'react';
import { useShub } from '@/app/Provider/Provider';



interface FolderProps {
    id: number,
    name: string,
    children: Array<string>,
    date?: string
}

interface FoldersProps {
    folder_id: number,
    folder_name: string,
    folder_path: string,

    user_id: number,
    created_at: string,
    updated_at: string,
}

export default function FolderSection ({folders} : {folders:FoldersProps[]})  {
    const { selected, handleSelect, handleNavigation, handleDSelected, type, handleType } = useShub();

    
    const open = (children:Array<string>) => {
        
    }
    return (
            
            <div className={styles.part}>
                <h3 className={styles.title}>Folders</h3>
                <div className="grid grid-cols-4 gap-3">
                    {folders.map((folder) => (
                        <div key={folder.folder_id}
                        onClick={() => {
                            handleSelect(folder.folder_id, 'folder')
                            handleType('folder')
                            
                        }}
                        onDoubleClick={() => {

                            // handleCurFolder(folder.folder_id, folder.folder_name)
                             handleNavigation(folder.folder_name)
                             handleDSelected(folder.folder_id)
                            }}
                        >
                            <Card type1="folder" key={folder.folder_id} name={folder.folder_name} date={folder.updated_at} selected={selected==folder.folder_id && type=='folder'}/>

                        </div>
                        
                    ))}
                
                </div>
                
            </div>
    )
}
