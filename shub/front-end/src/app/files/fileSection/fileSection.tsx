"use client"
import styles from './fileSection.module.scss'
import Card from '../card/card'
import { useState } from 'react';
import { useShub } from '@/app/Provider/Provider';
import { type } from 'os';

interface FileProps {
    file_id: number,
    file_name: string,
    file_path: string,
    file_data: string,
    file_type: string,
    user_id: number,
    created_at: string,
    updated_at: string
}


export default function FileSection ({files} : {files:FileProps[]}) {
    const { 
        handleStream,
        handleData,
        selected,
        handleSelect,
        handleType,
        type
    } = useShub();

    
    

    return (
            <div className={styles.part}>
            <h3 className={styles.title}>Files</h3>
            <div className="grid grid-cols-4 gap-3">
                {files.map((file) => (
                    <div key={file.file_id}
                        onClick={() => {
                            handleSelect(file.file_id, file.file_type.slice(0, file.file_type.indexOf('/')))
                            handleType(file.file_type.slice(0, file.file_type.indexOf('/')))
                            }}
                        onDoubleClick={() => {
                            handleData(file.file_data, file.file_type.slice(0, file.file_type.indexOf('/')))
                            handleStream()
                        }}
                    >

                    <Card type1={file.file_type.slice(0, file.file_type.indexOf('/'))} key={file.file_id} name={file.file_name} size='10'  date={file.updated_at} selected={selected==file.file_id && type == file.file_type.slice(0, file.file_type.indexOf('/'))}/>
                    </div>
                        
                  
                    
                ))}
            
            </div>
        </div>
    )
}
