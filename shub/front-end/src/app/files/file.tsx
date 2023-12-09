"use client"
import styles from './file.module.scss'
import FileSection from './fileSection/fileSection';
import FolderSection from './folderSection/folderSection';
import { useEffect, useState } from 'react';
import { useShub } from '../Provider/Provider';
import axios from 'axios';
import { usePathname } from 'next/navigation'; 
import Cookies from 'js-cookie';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import classNames from 'classnames/bind';
import Breadcrumbs from '../components/breadcumbs/breadcrumbs';

const cx = classNames.bind(styles);

const File = () => {
    const {  change, resetSelect, hideOption } = useShub();
    const [blank, setBlank] = useState('');
    const [folder, setFolder] = useState([]);
    const [file, setFile] = useState([]);
    const pathname = usePathname()
    const accessToken = Cookies.get('accessToken');
    const userId = Cookies.get('userId');
    useEffect(() => {
        const fetchData = async () => {
            const path = pathname.replaceAll('/','+')

            const resF = await axios.get(`http://localhost:3001/folders/${userId}/${path}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
                });

            const res = await axios.get(`http://localhost:3001/files/${userId}/${path}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            });

            setFile(res.data)
            setFolder(resF.data)

            if (!resF.data[0] && !res.data[0]) {
                setBlank('show')
            }
            else setBlank('')
            
            const folders = JSON.stringify(resF.data);
            Cookies.set('folders', folders, { secure: true, sameSite: 'strict' });
            
            const files = JSON.stringify(res.data);
            Cookies.set('files', files, { secure: true, sameSite: 'strict' });

        }
        fetchData()
        
        resetSelect()
        hideOption()
    },[change])
   
      
    return (

        <div className={cx('container')}>
            <Breadcrumbs />
            
            
            {folder[0] && <FolderSection folders={folder}/>}
            {file[0] && <FileSection files={file}/>}
            {blank && (<div className={cx('content')}>
                <div className="">
                    <SentimentDissatisfiedIcon  style={{fontSize: '100px'}}/>
                </div>
                <div className={cx('message')}>It feels lonely here...</div>
                
            </div>)}

            
        </div>
    )
}

export default File;