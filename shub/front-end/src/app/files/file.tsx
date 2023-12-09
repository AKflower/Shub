"use client"
import styles from './file.module.scss'
import Card from "./card/card";
import FileSection from './fileSection/fileSection';
import FolderSection from './folderSection/folderSection';
import { useEffect, useState } from 'react';
import { useShub } from '../Provider/Provider';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation'; 
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Breadcrumbs from '../components/breadcumbs/breadcrumbs';

export default function File () {
    const router = useRouter();
    const { showFile, change, resetSelect, hideOption } = useShub();
    const [show, setShow] = useState('');
    const [folder, setFolder] = useState([]);
    const pathname = usePathname()
    
    useEffect(() => {
        if (pathname != '/files') {
            setShow('show')
        } else setShow('')

        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');
            const path = pathname.replaceAll('/','+')

            const res = await axios.get(`http://localhost:3001/folders/${userId}/${path}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                });

            setFolder(res.data)
            const folders = JSON.stringify(res.data);
            localStorage.setItem('folders', folders)
        }
        fetchData()
        resetSelect()
        hideOption()
    },[change])
    const testFunction = async () => {
        try {
          // Sử dụng await để chờ Promise được giải quyết
          const data = { path: "/files/demo" };
      
          const test = await axios.get(`http://localhost:3001/files/bypath`, {
            params: data, // Truyền dữ liệu qua query parameters
          });
      
          console.log('test: ', test.data);
          
          // Khi Promise được giải quyết, bạn có thể xử lý kết quả
        } catch (error) {
          // Xử lý lỗi nếu có
          console.error('Error fetching data:', error);
        }
      };
    testFunction();
    return (
        <div className={styles.container}>
            <Breadcrumbs />
            {/* {show &&(<button onClick={() => {
                router.push(pathname.slice(0, pathname.lastIndexOf('/')))
              
            }}><ArrowBackIosNewIcon /></button>)} */}
            
            <FolderSection folders={folder}/>
            <FileSection files={showFile}/>
        </div>
    )
}