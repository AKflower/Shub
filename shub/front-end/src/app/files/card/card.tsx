"use client"
import styles from './card.module.scss'
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import TheatersIcon from '@mui/icons-material/Theaters';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import { useShub } from '@/app/Provider/Provider';


export default function Card ({type1, name,size,date, selected}: {type1:string, key:number, name:string,size?:string,date?:string, selected?:boolean}) {
    
    let dateObject
    if(date) dateObject = new Date(date);
    return (
        <div className={ !selected ? styles.container : styles.containerSelect} >
           
            <div className={ styles.img} >
            {type1=='folder' ? 
                <div className={styles.imgFolder}><FolderIcon style={{fontSize: '64px'}}/></div> : 
                type1 =='video' ? 
                <div className={styles.imgFile}><TheatersIcon style={{fontSize: '64px'}}/></div> :
                (type1 == 'image') ?
                <div className={styles.imgFile}><ImageIcon style={{fontSize: '64px'}}/></div> :
                <div className={styles.imgFile}><DescriptionIcon style={{fontSize: '64px'}}/></div>
            }   
                
            </div>
            <div className={styles.content}>
                <p className={styles.name}>{name}</p>
                {type1=='folder' ? <p className={styles.size}>---</p> : <p className={styles.size}>{size}</p>}
                
                <p className={styles.date}>
                    {/* {date?.slice(0, date.indexOf('T'))} */}
                    {dateObject && `${dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate()}-${dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : dateObject.getMonth() + 1}-${dateObject.getFullYear()}`}
                </p>
            </div>
        </div>
    )
}