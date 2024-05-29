"use client"
import styles from './favorite.module.scss'
import FileSection from '../files/fileSection/fileSection';
import FolderSection from '../files/folderSection/folderSection';
import { useEffect, useState } from 'react';
import { useShub } from '../Provider/Provider';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation'; 
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import Breadcrumbs from '../components/breadcumbs/breadcrumbs';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Tool from '../components/tool/Tool';
import Skeleton from 'react-loading-skeleton';
import { Bounce, ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import path from 'path';
import fonts from '../../../public/fonts/fonts';


const cx = classNames.bind(styles);

interface FileProps {
    file_id: string,
    file_name: string,
    file_path: string,
    cid: string,
    file_type: string,
    user_id: string,
    created_date: string,
    updated_date: string,
    isFavourite: boolean,
    isDelete: boolean,
    share: string[],
    file_size: string,
    file_lock:boolean

}

interface FoldersProps {
    folder_id: string,
    folder_name: string,
    folder_path: string,
    user_id: string,
    created_date: string,
    updated_date: string,
    isFavourite: boolean,
    isDelete: boolean,
    share: string[],

}


const Favorite = () => {
    const {  change, resetSelect, hideOption } = useShub();
    const [url, setUrl] = useState('');
    const [blank, setBlank] = useState('');
    const [folder, setFolder] = useState<FoldersProps[]>([]);
    const [file, setFile] = useState<FileProps[]>([]);
    const pathname = usePathname()
    const accessToken = Cookies.get('accessToken');
    const router = useRouter();

    const userId = Cookies.get('userId');
    useEffect(() => {
        if (pathname != '/favourite'){
            router.push(pathname.replace("favourite","files"));
        }
    },[pathname])
   
    useEffect(() => {
        
        if ( accessToken == '') {
            router.push('/');
        }
        const fetchData = async () => {
            const newPath = pathname.replace("favourite","files")
            const data = { user_id: userId };

            const res = await axios.get(`http://localhost:3001/folders/favourite`,{
                params: data, // Truyền dữ liệu qua query parameters
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            });

            let filteredFolders = res.data.folders.filter((folder: { isDelete: any; }) => !folder.isDelete);
            let filteredFiles = res.data.files.filter((file: { isDelete: any; }) => !file.isDelete);
            

            setFile(filteredFiles)
            setFolder(filteredFolders)

            if (!filteredFiles[0] && !filteredFolders[0]) {
                setBlank('show')
            }
            else setBlank('')
            
            // const foldersF = JSON.stringify(filteredFolders);
            // Cookies.set('folders', foldersF, { secure: true, sameSite: 'strict' });
            
            // const filesF = JSON.stringify(filteredFiles);
            // Cookies.set('files', filesF, { secure: true, sameSite: 'strict' })
        
        
        
        
        }
        fetchData()
        
        resetSelect()
        hideOption()
    },[change])
    
    return (

        <div className={cx('container')}>
            <Tool />

            <h1 className={cx('title',fonts.poppins.className)}>Favourite</h1>
            
            {folder[0] && <FolderSection folders={folder.sort((a, b) => a.folder_name.localeCompare(b.folder_name))}/>}
            {file[0] && <FileSection files={file.sort((a, b) => a.file_name.localeCompare(b.file_name))}/>}
            {blank && (<div className={cx('content')}>
                <div className="">
                    <SentimentDissatisfiedIcon  style={{fontSize: '100px'}}/>
                </div>
                <div className={cx('message')}>It feels lonely here...</div>

            </div>)}
            <div>
                {/* <img src={url} alt="" />
                 */}
                 {url}
            </div>
            <Toaster 
                position="top-center"
                reverseOrder={false}
            />
            
            
             
        </div>
    )
}

export default Favorite;