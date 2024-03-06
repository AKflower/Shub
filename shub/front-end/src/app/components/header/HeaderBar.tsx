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


const cx = classNames.bind(styles);

interface HeaderBarProps {
  showLogo?: boolean;
  showMenu?: boolean;
  children?: ReactNode;
}

interface Option {
  file_id: string;
  file_name: string;
  file_path: string;
}


const HeaderBar: FC<HeaderBarProps> = ({ showLogo, showMenu, children }) => {

  const pathname = usePathname()
  const isLogin = (pathname=='/') 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState<Option[] >([]);
  const { 
    currentPromptName, 
    toggleCurrentPromptName,
    showNewFile, 
    toggleShowNewFile, 
    showNewDir, 
    toggleShowNewDir, 
    option, 
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
      
      const res = await axios.get(`http://localhost:3001/files/search`,{
        params: data, // Truyền dữ liệu qua Data parameters
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        },
      })
      .then(response => {
        for (const pie in response.data){
          otp.push({
            file_id: response.data[pie].file_id,
            file_name: response.data[pie].file_name,
            file_path: response.data[pie].file_path,
          })

        }
        setSearchData(otp)
      })
      .catch(error => {
        console.error('Error creating folder:', error);
      });


      
    }
    if(searchQuery.length > 0) fetchData()
    else setSearchData([])
    
  },[searchQuery])

  useEffect(()=>{
    setSearchQuery('')
  },[pathname])

  
  const handleSelect = (selectedOption: any) => {
    setSearchQuery('')
    router.push(selectedOption.file_path);
  };

 
  return (
    <>
      {!isLogin && 
      <header>
      <div className={cx('flex')}>
      {/* <form  action="/search" method="GET">
      </form> */}
      
      
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
                  // onBlur={() => setSearchQuery('')}
                />
              </div>
          </Dropdown>
              
            
          </form>
          

          <div className={cx('filter')}>
            <select name="lang" id="lang-select">
              <option value="">Filter</option>
              <option value="csharp">C#</option>
              <option value="cpp">C++</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
              <option value="js">Javascript</option>
              <option value="dart">Dart</option>
            </select>
          </div>
        </div>

        <div className={cx('right')}>
          
          <img className={cx('noti')} src='/noti.svg'></img>
          
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
        {/* ------------------------------------- Old version Header ----------------------------------------}
      {/* <div id={cx('dropdown')} className={currentPromptName === 'more' ? cx('active') : ''}>
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
          onAction={()=>{
            toggleShowRename()
            toggleCurrentPromptName()
            }
          } 
        />

        <Action 
          icon={<ContentCopyIcon/>}
          label='Copy'
          counter={0}
          onAction={()=>{
            setShowCopy('show')
            toggleCurrentPromptName()
            }
          } 
        />

        <Action 
          icon={<ForwardIcon/>}
          label='Move file'
          counter={0}
          onAction={()=>{
            setShowMove('show')
            toggleCurrentPromptName()
            }
          } 
        />

        <Action 
          icon={<DeleteIcon/>}
          label='Delete'
          counter={0}
          onAction={()=>{
            toggleShowDelete()
            toggleCurrentPromptName()
            }
          } 
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
            toggleShowUpload()

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
      </div> */}

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
            toggleCurrentPromptName()
            if(showDownload){toggleShowDownload()}
            if(showInfo){toggleShowInfo()}
            if(showUpload){toggleShowUpload()}
            if(showNewFile){toggleShowNewFile()}
            if(showNewDir){toggleShowNewDir()}
            if(showShare){toggleShowShare()}
            if(showRename){toggleShowRename()}
            if(showCopy){toggleShowCopy()}
            if(showMove){toggleShowMove()}
            if(showDelete){toggleShowDelete()}
            if(stream){handleStream()}
            if(showChangePassword){toggleShowChangePassword()}
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
