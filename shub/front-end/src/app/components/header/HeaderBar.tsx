"use client"
import { FC, ReactNode, useState  } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
// import { logoURL } from '@/utils/constants';
import Action from './Action';
import styles from './HeaderBar.module.scss'
import classNames from 'classnames/bind';
import Download from '../prompts/Download';
import Info from '../prompts/Info';
import Upload from '../prompts/Upload';

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
const [showInfo, setShowInfo] = useState("");
const [showUpload, setShowUpload] = useState("");
const [showView, setShowView] = useState('grid');



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
          icon={showView === 'grid' ? <GridViewIcon/> : showView === 'list' ? <ViewListIcon/> : <ViewModuleIcon/>}
          label='Switch View'
          counter={0}  
          onAction={()=>{
            if (showView === 'grid') setShowView('list')
            else if (showView === 'list') setShowView('module')
              else setShowView('grid')

            }
          }      

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
          onAction={()=>{
            setShowUpload('show')
            setCurrentPromptName('more')
          }
          }        

        />
        <Action 
          icon={<InfoIcon/>}
          label='Info'
          counter={0} 
          onAction={()=>{
            setShowInfo('show')
            setCurrentPromptName('more')
          }
          }  
                

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

      {showInfo && (
        <Info />
      )}

      {showUpload && (
        <Upload />
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
            if(showInfo){setShowInfo('')}
            if(showUpload){setShowUpload('')}
          }
        }
      />
      )}
      
    </header>
  );
};



export default HeaderBar;
