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
        <div className={ !selected ? styles.container : styles.containerSelect} >
            <div className={cx('left')}>
                <div className={ styles.img} >
                    {type1=='folder' ? 
                    <div className={styles.imgFolder}>{option && selected ? <img src='/folderW.svg' style={{width: '70px'}}></img> : <img src='/folder.svg' style={{width: '70px'}}></img>}</div> : 
                        type1 == 'mp4' ? 
                    <div className={styles.imgFile}><img src='/video.svg' style={{width: '70px'}}></img></div> :
                        type1=='jpeg' || type1=='png' || type1=='svg+xml' ?
                    <div className={styles.imgFile}><img src='/img.svg' style={{width: '70px'}}></img></div> :
                        type1=='pdf' ?
                    <div className={styles.imgFile}><img src='/pdf.svg' style={{width: '70px'}}></img></div> :
                        type1=='vnd.openxmlformats-officedocument.wordprocessingml.document' ?
                    <div className={styles.imgFile}><img src='/word.svg' style={{width: '70px'}}></img></div> :
                    
                    <div className={styles.imgFile}><img src='/un.svg' style={{width: '70px'}}></img></div>
                    }   
                
                </div>
                <div className={styles.content}>
                    <p className={styles.name}>{name}</p>
                
                    <p className={styles.date}>
                    {/* {date?.slice(0, date.indexOf('T'))} */}
                        {dateObject && `${dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate()}-${dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : dateObject.getMonth() + 1}-${dateObject.getFullYear()}`}
                    </p>
                </div>
           </div>

           <div className={cx('right','content')}>
                <p className={cx('size')}>
                    18kB
                </p>
           </div>
            
        </div>
    )
}