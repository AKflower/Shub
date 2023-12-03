"use client"
import styles from './file.module.scss'
import FileSection from './fileSection/fileSection';
import FolderSection from './folderSection/folderSection';
import { useEffect, useState } from 'react';
import { useShub } from '../Provider/Provider';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation'; 
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
<<<<<<< HEAD
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
=======
import Breadcrumbs from '../components/breadcumbs/breadcrumbs';
>>>>>>> 85a0db823cdd74ae4acf9c406bd043a81af71b76

export default function File () {
    const router = useRouter();
    const { showFile, change, resetSelect, hideOption } = useShub();
    const [show, setShow] = useState('');
    const [blank, setBlank] = useState('');
    const [folder, setFolder] = useState([]);
    const [file, setFile] = useState([]);
    const pathname = usePathname()
    
    useEffect(() => {
        if (pathname != '/files') {
            setShow('show')
        } else setShow('')

        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');
            const path = pathname.replaceAll('/','+')

            const resF = await axios.get(`http://localhost:3001/folders/${userId}/${path}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                });

            const res = await axios.get(`http://localhost:3001/files/${userId}/${path}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                });


            setFile(res.data)
            setFolder(resF.data)
            if (!resF.data[0] && !res.data[0]) {
                setBlank('show')
            }
            else setBlank('')
            const folders = JSON.stringify(resF.data);
            localStorage.setItem('folders', folders)
            const files = JSON.stringify(res.data);
            localStorage.setItem('files', files)
        }
        fetchData()
        
        resetSelect()
        hideOption()
    },[change])
   
      
    return (
<<<<<<< HEAD
        <div className={cx('container')}>
            {show &&(<button onClick={() => {
                router.push(pathname.slice(0, pathname.lastIndexOf('/')))
              
            }}><ArrowBackIosNewIcon /></button>)}
            
            {folder[0] && <FolderSection folders={folder}/>}
            {file[0] && <FileSection files={file}/>}
            {blank && (<div className={cx('content')}>
                <div className="">
                    <SentimentDissatisfiedIcon  style={{fontSize: '100px'}}/>
                </div>
                <div className={cx('message')}>It feels lonely here...</div>
                
            </div>)}
=======
        <div className={styles.container}>
            <Breadcrumbs />
            {/* {show &&(<button onClick={() => {
                router.push(pathname.slice(0, pathname.lastIndexOf('/')))
              
            }}><ArrowBackIosNewIcon /></button>)} */}
            <FolderSection folders={folder}/>
            <FileSection files={showFile}/>
>>>>>>> 85a0db823cdd74ae4acf9c406bd043a81af71b76
        </div>
    )
}