"use client"
import styles from './folderSection.module.scss'
import Card from '../card/card'
import { useShub } from '@/app/Provider/Provider';

interface FoldersProps {
    folder_id: string,
    folder_name: string,
    folder_path: string,
    owner: string,
    created_date: string,
    updated_date: string,
}

export default function FolderSection ({folders} : {folders:FoldersProps[]})  {
    const { selected, handleSelect, handleNavigation, type, handleType } = useShub();

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
                             handleNavigation(folder.folder_name)
                        }}
                        >
                            <Card type1="folder" key={folder.folder_id.slice(0, folder.folder_id.indexOf('_'))} name={folder.folder_name} date={folder.updated_date} selected={selected==folder.folder_id && type=='folder'}/>

                        </div>
                        
                    ))}
                
                </div>
                
            </div>
    )
}
