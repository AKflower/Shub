"use client"
import styles from './card.module.scss'
import DescriptionIcon from '@mui/icons-material/Description';
import TheatersIcon from '@mui/icons-material/Theaters';
import { useShub } from '@/app/Provider/Provider';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


export default function Card ({type1, name,size,date, selected}: {type1:string, key:string, name:string,size?:string,date?:string, selected?:boolean}) {
    const { 
        
        option, 
        
       
      } = useShub();


    let dateObject
    if(date) dateObject = new Date(date);
    return (
        <div className={ !selected ? cx('container') : styles.containerSelect} >
            <div className={cx('left')}>
                <div className={ styles.img} >
                    {type1=='folder' ? 
                    <div className={styles.imgFolder}>{option && selected ? <img src='/folderW.svg' style={{width: '4em'}}></img> : <img src='/folder.svg' style={{width: '4em'}}></img>}</div> : 
                        type1 == 'mp4' ? 
                    <div className={styles.imgFile}><img src='/video.svg' style={{width: '4em'}}></img></div> :
                        type1=='jpeg' || type1=='png' || type1=='svg+xml' ?
                    <div className={styles.imgFile}><img src='/img.svg' style={{width: '4em'}}></img></div> :
                        type1=='pdf' ?
                    <div className={styles.imgFile}><img src='/pdf.svg' style={{width: '4em'}}></img></div> :
                        type1=='vnd.openxmlformats-officedocument.wordprocessingml.document' ?
                    <div className={styles.imgFile}><img src='/word.svg' style={{width: '4em'}}></img></div> :
                        type1=='vnd.openxmlformats-officedocument.spreadsheetml.sheet' ?
                    <div className={styles.imgFile}><img src='/ex.svg' style={{width: '4em'}}></img></div> :
                        type1=='x-zip-compressed' ?
                    <div className={styles.imgFile}><img src='/zip.svg' style={{width: '4em'}}></img></div> :
                    <div className={styles.imgFile}><img src='/un.svg' style={{width: '4em'}}></img></div>
                    }   
                
                </div>
                <div className={styles.content}>
                    <p className={styles.name}>{
                        name.replace(/#/g, "")
                        
                    }</p>
                
                    <p className={styles.date}>
                    {/* {date?.slice(0, date.indexOf('T'))} */}
                        {dateObject && `${dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate()}-${dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : dateObject.getMonth() + 1}-${dateObject.getFullYear()}`}
                    </p>
                </div>
           </div>

           <div className={cx('right','content')}>
                <p className={cx('size')}>
                    {Number(size) < 1024 ? size + ' B' : Number(size) < Math.pow(2,20) ? String((Number(size)/Math.pow(2,10)).toFixed(2)) + ' KB' : Number(size) < Math.pow(2,30) ? String((Number(size)/Math.pow(2,20)).toFixed(2)) + ' MB' : Number(size) < Math.pow(2,40) ? String((Number(size)/Math.pow(2,30)).toFixed(2)) + ' GB' : '' }
                </p>
           </div>
            
        </div>
    )
}