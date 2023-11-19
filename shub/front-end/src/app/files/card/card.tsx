"use client"
import styles from './card.module.scss'
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import { useState } from 'react';


export default function Card ({type,key, name,size,date, selected}: {type:string, key:number, name:string,size?:string,date?:string, selected?:boolean}) {
    
    const [select,setSelect] = useState(false);
    
    const handleSelect = () => {

        setSelect(!select);
    }

    return (
        <div className={ !selected ? styles.container : styles.containerSelect} onClick={handleSelect}>
           
            <div className={ styles.img} >
            {type=='folder' ? 
                <div className={styles.imgFolder}><FolderIcon style={{fontSize: '64px'}}/></div>
                : 
                <div className={styles.imgFile}><DescriptionIcon style={{fontSize: '64px'}}/></div>
            }   
                
            </div>
            <div className={styles.content}>
                <p className={styles.name}>{name}</p>
                {type=='folder' ? <p className={styles.size}>---</p> : <p className={styles.size}>{size}</p>}
                
                <p className={styles.date}>{date}</p>
            </div>
        </div>
    )
}