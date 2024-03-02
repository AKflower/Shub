"use client"

import styles from './Tool.module.scss'
import classNames from 'classnames/bind';
import { useShub } from '@/app/Provider/Provider';
import Action from '../header/Action';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Tool = () => {
  const [showView, setShowView] = useState('grid');

  const { 
    toggleCurrentPromptName,
    toggleShowShare,
    option, 
    toggleShowCopy,
    toggleShowRename,
    toggleShowMove,
    toggleShowDelete,
    toggleShowDownload,
    toggleShowInfo,
  } = useShub();
      
  
  return (
    <div className={cx('wrapper')}>
    {option && (<div className={cx('container')}>
       
      <div className={cx('icon')}>
        <Action 
          icon={<img src='/edit.svg'></img>}
          label='Rename'
          counter={0}
          onAction={()=>{
            toggleShowRename()
            toggleCurrentPromptName()
            }
          } 
        />
      </div>
        
      <div className={cx('icon')}>
        <Action 
          icon={<img src='/copy.svg'></img>}
          label='Copy'
          counter={0}
          onAction={()=>{
            toggleShowCopy()
            toggleCurrentPromptName()
            }
          } 
        />
      </div>
        
      <div className={cx('icon')}>
        <Action 
          icon={<img src='/share.svg'></img>}
          label='Share'
          counter={0}
          onAction={()=>{
            toggleShowShare()
            toggleCurrentPromptName()
            }
          } 
        />   
      </div>
        
      <div className={cx('icon')}>
        <Action 
          icon={<img src='/move.svg'></img>}
          label='Move file'
          counter={0}
          onAction={()=>{
            toggleShowMove()
            toggleCurrentPromptName()
            }
          } 
        />
      </div>

      <div className={cx('icon')}>
        <Action 
          icon={<img src='/delete.svg'></img>}
          label='Delete'
          counter={0}
          onAction={()=>{
            toggleShowDelete()
            toggleCurrentPromptName()
            }
          } 
        />
      </div>

      <div className={cx('icon')}>
        <Action 
          icon={showView === 'grid' ? <img src='/grid.svg'></img> : showView === 'list' ? <img src='/list.svg'></img> : <img src='/module.svg'></img>}
          label='Switch View'
          counter={0}  
          onAction={()=>{
            if (showView === 'grid') setShowView('list')
            else if (showView === 'list') setShowView('module')
              else setShowView('grid')

            }
          }      

        />
      </div>

      <div className={cx('icon')}>
        <Action 
          icon={<img src='/down.svg'></img>}
          label='Download'
          counter={0}    
          onAction={()=>{
            toggleShowDownload()
            toggleCurrentPromptName()
            }
          } 

        />
      </div >
           
      <div className={cx('icon')}>
        <Action 
          icon={<img src='/info.svg'></img>}
          label='Info'
          counter={0} 
          onAction={()=>{
            toggleShowInfo()
            toggleCurrentPromptName()

            }
          } 
        /> 
      </div>

      <div className={cx('icon')}>
      <Action 
          icon={<img src='/star.svg'></img>}
          label='Select Multiple'
          counter={0}        

        />
      </div>

      
         
    </div>)}
    </div>
  );
};

export default Tool;
