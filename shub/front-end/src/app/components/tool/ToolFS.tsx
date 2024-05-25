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
    toggleCurrentPromptName,
    option, 
    toggleShowDownload,
    toggleShowInfo,
    selected,
    type,
    isFavourite,
    handleChange
  } = useShub();

  const handleFavourite = () => {
    const load = toast.loading('Loading...')
    if (type == 'folder'){
      const data = {
        user_id: userId,
        folder_id: selected,
        isFavourite: isFavourite ? false : true
      };

      axios.put(`http://localhost:3001/folders/updateFavourite`, data, {
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
      axios.put(`http://localhost:3001/files/updateFavourite`, data, {
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
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
      
  
  return (
    <div className={cx('wrapper')}>
    {option && (<div className={cx('container')}>
       
      

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

      
      
         
    </div>)}
    </div>
  );
};

export default Tool;
