"use client"
import styles from './shared.module.scss'
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

const cx = classNames.bind(styles);

interface FileProps {
    file_id: string,
    file_name: string,
    file_path: string,
    file_data: string,
    file_type: string,
    user_id: number,
    created_date: string,
    updated_date: string,
    isFavourite: boolean,
    isDelete: boolean,
    share: string[],

}

interface FoldersProps {
    folder_id: string,
    folder_name: string,
    folder_path: string,
    owner: string,
    created_date: string,
    updated_date: string,
    isFavourite: boolean,
    isDelete: boolean,
    share: string[],

}


const Shared = () => {
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
        if (pathname != '/shared'){
            router.push(pathname.replace("shared","files"));
        }
    },[pathname])
   
    useEffect(() => {
        
        if ( accessToken == '') {
            router.push('/');
        }
        const fetchData = async () => {
            const newPath = pathname.replace("shared","files")
            const data = { user_id: userId };

            const res = await axios.get(`http://localhost:3001/folders/share`,{
                params: data, // Truyền dữ liệu qua query parameters
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            });

            // setFile(res.data.files)
            setFolder(res.data)


            if (!res.data.files[0] && !res.data.folders[0]) {
                setBlank('show')
            }
            else setBlank('')
            
            const foldersF = JSON.stringify(res.data.folders);
            Cookies.set('folders', foldersF, { secure: true, sameSite: 'strict' });
            
            const filesF = JSON.stringify(res.data.files);
            Cookies.set('files', filesF, { secure: true, sameSite: 'strict' });


            // const test = await fetch(`http://localhost:3001/files/file_3/download`)

//             const fileContent = await test.blob();
//   const url = window.URL.createObjectURL(fileContent);
//   setUrl(url)

//   const downloadLink = document.createElement('a');
//   downloadLink.href = url;
//   downloadLink.download = `sad.jpg`;
//   downloadLink.click();

//   window.URL.revokeObjectURL(url);
            // const url = 'http://localhost:3001/files/file_3/download';

            // axios.get(url)
            //   .then((response) => {
            //     const img = document.createElement('img');
            //     img.src = response.data.url;
            //     document.body.appendChild(img);
            //   })
            //   .catch((error) => {
            //     // Xử lý lỗi
            //   });
        
        
        
        
        
        
        }
        fetchData()
        
        resetSelect()
        hideOption()
    },[change])
    
    return (

        <div className={cx('container')}>
            <h1>Share</h1>
            <Tool />
            
            {folder[0] && <FolderSection folders={folder.sort((a, b) => a.folder_name.localeCompare(b.folder_name))}/>}
            {/* {file[0] && <FileSection files={file.sort((a, b) => a.file_name.localeCompare(b.file_name))}/>} */}
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

export default Shared;