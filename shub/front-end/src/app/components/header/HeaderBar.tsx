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
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ForwardIcon from '@mui/icons-material/Forward';
import DeleteIcon from '@mui/icons-material/Delete';
// import { logoURL } from '@/utils/constants';
import Action from './Action';
import styles from './HeaderBar.module.scss'
import classNames from 'classnames/bind';
import Download from '../prompts/Download';
import Info from '../prompts/Info';
import Upload from '../prompts/Upload';
import { usePathname } from 'next/navigation'
import { useShub } from '@/app/Provider/Provider';
import NewFile from '../prompts/NewFile';
import NewDir from '../prompts/NewDir';
import Image from 'next/image';
import Link from 'next/link';
import Share from '../prompts/Share';

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
const [showDownload, setShowDownload] = useState("");
const [showInfo, setShowInfo] = useState("");
const [showUpload, setShowUpload] = useState("");
const [showShare, setShowShare] = useState("");

const [showView, setShowView] = useState('grid');
const pathname = usePathname()
const isLogin = (pathname=='/') //check login page ? not render : render
const {currentPromptName, toggleCurrentPromptName,showNewFile, toggleShowNewFile, showNewDir, toggleShowNewDir, option } = useShub();


  return (
    <>
      {!isLogin && 
      <header>
      <div className={cx('flex')} >
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
        
      <div id={cx('dropdown')} className={currentPromptName === 'more' ? cx('active') : ''}>
      {option && (
        <> 
        <Action 
          icon={<ShareIcon/>}
          label='Share'
          counter={0}
          onAction={()=>{
            setShowShare('show')
            toggleCurrentPromptName()
            }
          } 
        />

        <Action 
          icon={<EditIcon/>}
          label='Rename'
          counter={0}
          onAction={()=>{}}
        />

        <Action 
          icon={<ContentCopyIcon/>}
          label='Copy'
          counter={0}
          onAction={()=>{}}
        />

        <Action 
          icon={<ForwardIcon/>}
          label='Move file'
          counter={0}
          onAction={()=>{}}
        />

        <Action 
          icon={<DeleteIcon/>}
          label='Delete'
          counter={0}
          onAction={()=>{}}
        />

        </>
        )
      }
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
            toggleCurrentPromptName()
            }
          } 

        />
        <Action 
          icon={<FileUploadIcon/>}
          label='Upload'
          counter={0} 
          onAction={()=>{
            setShowUpload('show')
            toggleCurrentPromptName()

          }
          }        

        />
        <Action 
          icon={<InfoIcon/>}
          label='Info'
          counter={0} 
          onAction={()=>{
            setShowInfo('show')
            toggleCurrentPromptName()

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

      {showNewFile && (
        <NewFile />
      )}

      {showNewDir && (
        <NewDir />
      )}

      {showShare && (
        <Share />
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
            toggleCurrentPromptName()
            if(showDownload){setShowDownload('')}
            if(showInfo){setShowInfo('')}
            if(showUpload){setShowUpload('')}
            if(showNewFile){toggleShowNewFile()}
            if(showNewDir){toggleShowNewDir()}
            if(showShare){setShowShare('')}
          }
        }
      />
      )}
      
    </header>
    }
    </>
    
  );
};



export default HeaderBar;
