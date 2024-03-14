"use client"
import styles from './fileSection.module.scss'
import Card from '../card/card'
import { useShub } from '@/app/Provider/Provider';

interface FileProps {
    file_id: string,
    file_name: string,
    file_path: string,
    file_data: string,
    file_type: string,
    user_id: number,
    created_date: string,
    updated_date: string
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
                            handleSelect(file.file_id, file.file_type.slice(file.file_type.indexOf('/') + 1, file.file_type.length))
                            handleType(file.file_type.slice(file.file_type.indexOf('/') + 1, file.file_type.length))
                            }}
                        onDoubleClick={() => {
                            handleData(file.file_data, file.file_type.slice(file.file_type.indexOf('/') + 1, file.file_type.length))
                            handleStream()
                        }}
                    >

                    <Card type1={file.file_type.slice(file.file_type.indexOf('/') + 1, file.file_type.length)} key={file.file_id} name={file.file_name} size='10'  date={file.updated_date} selected={selected == file.file_id && type == file.file_type.slice(file.file_type.indexOf('/') + 1, file.file_type.length)}/>
                    </div>
                        
                  
                    
                ))}
            
            </div>
        </div>
    )
}
