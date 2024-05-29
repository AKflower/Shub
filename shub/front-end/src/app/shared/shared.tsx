"use client"
import styles from './shared.module.scss'
import FileSection from './fileSection/fileSection';
import FolderSection from './folderSection/folderSection';
import { useEffect, useState } from 'react';
import { useShub } from '../Provider/Provider';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation'; 
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Toaster } from 'react-hot-toast';
import fonts from '../../../public/fonts/fonts';
import ToolFS from '../components/tool/ToolFS';
import BCFS from '../components/breadcumbs/BCFS';

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
    owner: string
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
    owner: string
}

const Shared = () => {
    const { 
        change, 
        resetSelect, 
        hideOption 
    } = useShub();
    const [blank, setBlank] = useState('');
    const [folder, setFolder] = useState<FoldersProps[]>([]);
    const [file, setFile] = useState<FileProps[]>([]);
    const pathname = usePathname()
    const accessToken = Cookies.get('accessToken');
    const router = useRouter();
    const userId = Cookies.get('userId');
    
    // useEffect(() => {
    //     if (pathname != '/shared'){
    //         router.push(pathname.replace("shared","files"));
    //     }
    // },[pathname])
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (pathname == '/shared'){
                    const data = { user_id: userId };

                    const res = await axios.get(`http://localhost:3001/folders/share`,{
                        params: data, // Truyền dữ liệu qua query parameters
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`, 
                        },
                    });

                    const folderD:FoldersProps[] = []
                    const fileD:FileProps[] = []

                    for (const pie in res.data){
                        if (res.data[pie].file_id){
                            await fileD.push(res.data[pie])
                        }
                        else {
                            await folderD.push(res.data[pie])
                        }
                    }

                    let filteredFolders = folderD.filter((folder: { isDelete: any; }) => !folder.isDelete);
                    let filteredFiles = fileD.filter((file: { isDelete: any; }) => !file.isDelete);

                    const folders = JSON.stringify(filteredFolders);
                    Cookies.set('foldersS', folders, { secure: true, sameSite: 'strict' });
            
                    const files = JSON.stringify(filteredFiles);
                    Cookies.set('filesS', files, { secure: true, sameSite: 'strict' });

                    setFolder(filteredFolders)
                    setFile(filteredFiles) 

                    if (!filteredFolders[0] && !filteredFiles[0]) {
                        setBlank('show')
                    }
                    else setBlank('')
                }
                else{
                    const data = { user_id: userId, path: pathname.replace(`shared`,'files')};

                    const resF = await axios.get(`http://localhost:3001/folders/bypath`, {
                        params: data, // Truyền dữ liệu qua query parameters
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`, 
                        },
                    },);

                    const res = await axios.get(`http://localhost:3001/files/bypath`, {
                        params: data, // Truyền dữ liệu qua query parameters
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`, 
                        },
                    });

                    let filteredFolders = resF.data.filter((folder: { isDelete: any; }) => !folder.isDelete);
                    let filteredFiles = res.data.filter((file: { isDelete: any; }) => !file.isDelete);

                    setFile(filteredFiles)
                    setFolder(filteredFolders)

                    if (!filteredFiles[0] && !filteredFolders[0]) {
                        setBlank('show')
                    }
                    else setBlank('')
                }
            }
            catch (e){
                router.push('/shared');
            }
        }
        fetchData()
        resetSelect()
        hideOption()
    },[change])
    
    return (
        <div className={cx('container')}>
            <ToolFS />

            <h1 className={cx('title', fonts.poppins.className)}>Share</h1>

            <BCFS />

            {folder[0] && <FolderSection folders={folder.sort((a, b) => a.folder_name.localeCompare(b.folder_name))}/>}
            {file[0] && <FileSection files={file.sort((a, b) => a.file_name.localeCompare(b.file_name))}/>}
            
            {blank && (<div className={cx('content')}>
                <div className="">
                    <SentimentDissatisfiedIcon  style={{fontSize: '100px'}}/>
                </div>
                <div className={cx('message')}>It feels lonely here...</div>
            </div>)}
            
            <Toaster 
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}

export default Shared;