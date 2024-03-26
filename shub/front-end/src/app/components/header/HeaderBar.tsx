"use client"
import { FC, ReactNode, useEffect, useState  } from 'react';
import Action from './Action';
import styles from './HeaderBar.module.scss'
import classNames from 'classnames/bind';
import Download from '../prompts/Download';
import Info from '../prompts/Info';
import Upload from '../prompts/Upload';
import { usePathname, useRouter } from 'next/navigation'
import { useShub } from '@/app/Provider/Provider';
import NewFile from '../prompts/NewFile';
import NewDir from '../prompts/NewDir';
import Image from 'next/image';
import Link from 'next/link';
import Share from '../prompts/Share';
import Rename from '../prompts/Rename';
import Copy from '../prompts/Copy';
import Move from '../prompts/Move';
import Delete from '../prompts/Delete';
import Content from '../content/Content';
import Cookies from 'js-cookie';
import ChangePassword from '../prompts/ChangePassword';
import axios from 'axios';
import Dropdown from '../prompts/DropDown';

import { ToastContainer, toast, Bounce } from 'react-toastify';

const cx = classNames.bind(styles);

interface HeaderBarProps {
  showLogo?: boolean;
  showMenu?: boolean;
  children?: ReactNode;
}

interface Option {
  id: string;
  name: string;
  path: string;
  type: string;
}


const HeaderBar: FC<HeaderBarProps> = ({ showLogo, showMenu, children }) => {
const [showToast, setShowToast] = useState("");
  const pathname = usePathname()
  const isLogin = (pathname=='/') 
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [searchData, setSearchData] = useState<Option[] >([]);
  const { 
    currentPromptName, 
    toggleCurrentPromptName,
    showNewFile, 
    toggleShowNewFile, 
    showNewDir, 
    toggleShowNewDir, 
    showCopy,
    showMove,
    showShare,
    showDelete, 
    toggleShowDelete, 
    showRename, 
    toggleShowRename,
    stream,
    handleStream,
    data,
    type,
    showUpload,
    toggleShowUpload,
    showChangePassword,
    toggleShowChangePassword, 
    toggleShowShare,
    toggleShowCopy,
    toggleShowMove,
    showDownload,
    toggleShowDownload,
    showInfo,
    toggleShowInfo,
  } = useShub();
  const accessToken = Cookies.get('accessToken');
  const router = useRouter();

  useEffect(()=>{
    const fetchData = async () => {
      const otp: Option[] = []
      const data = { prefix: searchQuery };
      
      const resFile = await axios.get(`http://localhost:3001/files/search`,{
        params: data, // Truyền dữ liệu qua Data parameters
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        },
      })
     
      const resFolder = await axios.get(`http://localhost:3001/folders/search`,{
        params: data, // Truyền dữ liệu qua Data parameters
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        },
      })
      if (filter == 'File'){
        for (const pie in resFile.data){
          await otp.push({
            id: resFile.data[pie].file_id,
            name: resFile.data[pie].file_name,
            path: resFile.data[pie].file_path,
            type: resFile.data[pie].file_type.slice(resFile.data[pie].file_type.indexOf('/') + 1, resFile.data[pie].file_type.length)
          })
        }
      }
      else if (filter == 'Folder'){
        for (const pie in resFolder.data){
          await otp.push({
            id: resFolder.data[pie].folder_id,
            name: resFolder.data[pie].folder_name,
            path: resFolder.data[pie].folder_path,
            type: 'folder'
          })
        }
      }
      else{
        for (const pie in resFile.data){
          await otp.push({
            id: resFile.data[pie].file_id,
            name: resFile.data[pie].file_name,
            path: resFile.data[pie].file_path,
            type: resFile.data[pie].file_type.slice(resFile.data[pie].file_type.indexOf('/') + 1, resFile.data[pie].file_type.length)
          })
        }
        for (const pie in resFolder.data){
          await otp.push({
            id: resFolder.data[pie].folder_id,
            name: resFolder.data[pie].folder_name,
            path: resFolder.data[pie].folder_path,
            type: 'folder'
          })
        }
      }
      
        
          await setSearchData(otp)
      
    }

    if(searchQuery.length > 0) fetchData()
    else setSearchData([])
    
  },[searchQuery, filter])

  useEffect(()=>{
    setSearchQuery('')
  },[pathname])

  
  const handleSelect = (selectedOption: any) => {
    setSearchQuery('')
    router.push(selectedOption.path);
  };

 
  return (
    <>
      {!isLogin && 
      <header>
      <div className={cx('flex')}>
      
      
      
        <div className={cx('left')}>
            
          <form 
            // onSubmit={handleSubmit}
            >
            <Dropdown 
              options={searchData}
              onSelect={handleSelect}
            >
              <div className={cx('search-input')}>
                <img className={cx('icon')} src='/sr.svg'></img>
                <input 
                  className={cx('search-box')} 
                  type="text" 
                  placeholder="Search Files..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
          </Dropdown>
              
            
          </form>
          

          <div className={cx('filter')}>
            <select name="lang" id="lang-select" onChange={(e) => setFilter(e.target.value)}>
              <option value="">All</option>
              <option value="File">File</option>
              <option value="Folder">Folder</option>
            
            </select>
          </div>
        </div>

        <div className={cx('right')}>
          
          <img className={cx('noti')} src='/noti.png'></img>
          
          <div className={cx('id')}>
            <img className={cx('ava')} src='/dan.jpg'></img>
            <div className={cx('info')}>
              <p className={cx('name')}>Danisolation</p>
              <p className={cx('mail')}>tranquocdungb4@gmail.com</p>
            </div>
          </div>
        </div>
        

        {showLogo !== undefined && 
        <Link href='/files'>
          <div className={cx('logo')}>
            <Image src='/images/logo.png' alt='Shub' width={40} height={40}/>
          </div>
        </Link>
        
        }
      {showMenu !== undefined && (
        <Action
                  icon="menu"
                  label={'Toggle Sidebar'}
                //   onAction={openSidebar}
                  className={cx('menu-button')} 
                  counter={0}        
                  />
      )}

      {children}
      </div>
        

      {showDownload && (
        <Download />
      )}
      
      {showInfo && (
        <Info />
      )}

      {showUpload && (
        <Upload />
      )}

      {showNewFile && (
        <NewFile />
      )}

      {showNewDir && (
        <NewDir />
      )}

      {showShare && (
        <Share />
      )}
      
      {showRename && (
        <Rename />
      )}

      {showCopy && (
        <Copy />
      )}

      {showMove && (
        <Move />
      )}

      {showDelete && (
        <Delete />
      )}
      {stream && data && type && (
        <Content data={data} type={type}/>
      )}
      {showChangePassword && (
        <ChangePassword />
      )

      }
      {children && (
        <Action
                  id={cx('more')} 
                  icon="more_vert"
                  label={'More'}
                //   onAction={} 
                  counter={0}        />
      )}

      {currentPromptName === 'more' && (
        <div className={cx('overlay')}
      // onClick={*/() => dispatch({ type: 'closeHovers' })*/} 
        onClick={
          ()=>{
            // toggleCurrentPromptName()
            // if(showDownload){setShowDownload('')}
            // if(showInfo){setShowInfo('')}
            // if(showUpload){toggleShowUpload()}
            // if(showNewFile){toggleShowNewFile()}
            // if(showNewDir){toggleShowNewDir()}
            // if(showShare){setShowShare('')}
            // if(showRename){toggleShowRename()}
            // if(showCopy){setShowCopy('')}
            // if(showMove){setShowMove('')}
            // if(showDelete){toggleShowDelete()}
            // if(stream){handleStream()}
            // if(showChangePassword){toggleShowChangePassword()}
          }
        }
      >
        <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition= {Bounce}
          />
      </div>
      )}
    
      
    </header>
    }
      </>
    
  );
};



export default HeaderBar;
