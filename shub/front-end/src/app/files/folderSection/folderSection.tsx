"use client"
import styles from './folderSection.module.scss'
import Card from '../card/card'
import { useState } from 'react';


interface FolderProps {
    id: number,
    name: string,
    children: Array<string>,
    date?: string
}
export default function FolderSection ({folders} : {folders:FolderProps[]})  {
    const [selected,setSelected] = useState(0);
    const handleSelect = (id:number) => {
        console.log('Hi');
        if (id==selected) {
            setSelected(0);
        }
        else setSelected(id);
    }
    const open = (children:Array<string>) => {
        
    }
    return (
            
            <div className={styles.part}>
                <h3 className={styles.title}>Folders</h3>
                <div className="grid grid-cols-4 gap-3">
                    {folders.map((folder) => (
                        <div  key={folder.id}
                        onClick={() => handleSelect(folder.id)}
                        onDoubleClick={() => open(folder.children)}
                        >
                            <Card type="folder" key={folder.id} name={folder.name} date={folder.date} selected={selected==folder.id}/>
                        </div>
                        
                    ))}
                
                </div>
                
            </div>
    )
}
