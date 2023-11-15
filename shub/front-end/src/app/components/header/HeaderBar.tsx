"use client"
import { FC, ReactNode, useState  } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import ShareIcon from '@mui/icons-material/Share';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import GridViewIcon from '@mui/icons-material/GridView';
// import { logoURL } from '@/utils/constants';
import Action from './Action';
import styles from './HeaderBar.module.scss'
import classNames from 'classnames/bind';
import Download from '../prompts/Download';

const cx = classNames.bind(styles);

interface HeaderBarProps {
  showLogo?: boolean;
  showMenu?: boolean;
  children?: ReactNode;
}

const HeaderBar: FC<HeaderBarProps> = ({ showLogo, showMenu, children }) => {
//   const dispatch = useDispatch();
//   const currentPromptName = useSelector((state: any) => state.currentPromptName);


//   const openSidebar = () => {
//     dispatch({ type: 'showHover', payload: 'sidebar' });
//   };
const [currentPromptName, setCurrentPromptName] = useState("");
const [showDownload, setShowDownload] = useState("");



  return (
    <header>
      <div className={cx('flex')} >
        {showLogo !== undefined && <img src='/file.png' />}
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
        
      <div id={cx('dropdown')} className={currentPromptName === 'more' ? cx('active') : ''}>
      <Action 
          icon={<GridViewIcon/>}
          label='Switch View'
          counter={0}        

        />
      <Action 
          icon={<FileDownloadIcon/>}
          label='Download'
          counter={0}    
          show={showDownload}   
          onAction={()=>{
            setShowDownload('show')
            setCurrentPromptName('more')
          }
          
          } 

        />
        <Action 
          icon={<FileUploadIcon/>}
          label='Upload'
          counter={0}        

        />
        <Action 
          icon={<InfoIcon/>}
          label='Info'
          counter={0}        

        />
        <Action 
          icon={<CheckCircleIcon/>}
          label='Select Multiple'
          counter={0}        

        />
      </div>

      {showDownload && (
        <Download />
      )}

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
            setCurrentPromptName('')
            if(showDownload){setShowDownload('')}
          }
        }
      />
      )}
      
    </header>
  );
};



export default HeaderBar;
