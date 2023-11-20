"use client"
import styles from './fileSection.module.scss'
import Card from '../card/card'
import { useState } from 'react';
import { useShub } from '@/app/Provider/Provider';

interface FileProps {
    id: number,
    name: string,
    size: string,
    date?: string
}


export default function FileSection ({files} : {files:FileProps[]}) {
    const { showOption, hideOption } = useShub();

    const [selected,setSelected] = useState(0);
    const handleSelect = (id:number) => {
        console.log('Hi');
        if (id==selected) {
            setSelected(0);
            hideOption()

        }
        else {
            showOption()
            setSelected(id);
        }
    }
    

    return (
            <div className={styles.part}>
            <h3 className={styles.title}>Files</h3>
            <div className="grid grid-cols-4 gap-3">
                {files.map((file) => (
                    <div key={file.id}
                        onClick={() => handleSelect(file.id)}>

                    <Card type="file" key={file.id} name={file.name} size={file.size}  date={file.date} selected={selected==file.id}/>
                    </div>
                        
                  
                    
                ))}
            
            </div>
        </div>
    )
}
