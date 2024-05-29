"use client"
import styles from './Tool.module.scss'
import classNames from 'classnames/bind';
import { useShub } from '@/app/Provider/Provider';
import Action from '../header/Action';
import { useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import axios from 'axios';

const cx = classNames.bind(styles);

const Tool = () => {
  const userId = Cookies.get('userId');
  const accessToken = Cookies.get('accessToken');

  const { 
    currentPromptName,
    toggleCurrentPromptName,
    toggleShowShare,
    option, 
    toggleShowCopy,
    toggleShowRename,
    toggleShowMove,
    toggleShowDelete,
    toggleShowDownload,
    toggleShowInfo,
    selected,
    type,
    isFavourite,
    handleChange,
    toggleShowLock,
    lock,
    setOverlay
  } = useShub();

  console.log(currentPromptName)
  const handleFavourite = async() => {
    const load = toast.loading('Loading...')
    if (type == 'folder'){
      const data = {
        user_id: userId,
        folder_id: selected,
        isFavourite: isFavourite ? false : true
      };

      await axios.put(`http://localhost:3001/folders/updateFavourite`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            })
            .then(response => {
                if(isFavourite) toast.success('File removed from Favourite')
                else toast.success('File added to Favourite')
                toast.dismiss(load);
               setOverlay()
                
                handleChange()
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }
    else{
      const data = {
        user_id: userId,
        file_id: selected,
        isFavourite: isFavourite ? false : true
      };
      await axios.put(`http://localhost:3001/files/updateFavourite`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, 
        },
      })
      .then(response => {
        if(isFavourite) toast.success('File removed from Favourite')
        else toast.success('File added to Favourite')
        toast.dismiss(load);
        handleChange()
        setOverlay()
      })
      .catch(error => {
        console.error('Error:', error);
        
      });

    
      
    }
  }
  
  const isLock = true
  
  return (
    <div className={cx('wrapper')}>
    {option && (<div className={cx('container')}>
       
      {!lock && (
      <>
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

      

      

      {type != 'folder' && (<div className={cx('icon')}>
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
      </div >)}
           
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
          icon={isFavourite ? (<img src='/fa.svg'></img>) : (<img src='/star.svg'></img>)}
          label='Favourite'
          counter={0}        
          onAction={()=>{
            toggleCurrentPromptName()

             handleFavourite()
          }
             

          }
        />
      </div>
      </>
      )}

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
      {/* {type !== 'folder' && (<div className={cx('icon')}>
        <Action 
          icon={lock ? 
            (<img src='/unlock.svg'></img>) : (<img src='/lock.svg'></img>)}
          label={lock ? 'Unlock' : 'Lock'}
          counter={0}        
          onAction={()=>{
            toggleShowLock()
            toggleCurrentPromptName()
            }
          } 
        />
      </div>)} */}

      
         
    </div>)}
    </div>
  );
};

export default Tool;
