"use client"

import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Info.module.scss'
import { useShub } from '@/app/Provider/Provider';
import axios from 'axios';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

interface InfoProps {
  // Add any additional props if needed
}

const Info: FC<InfoProps> = () => {
  const { 
    infoFile,
    infoFolder,
    type,
    toggleShowInfo,
    toggleCurrentPromptName,
    currentPromptName
  } = useShub();
  let selectedCount = 1
  const accessToken = Cookies.get('accessToken');
  const [owner, setOwner] = useState('');
  const [share, setShare] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {

        const res = await axios.get(`http://localhost:3001/user`,{

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            },
          },
         );

        if (type == 'folder'){
          let name = res.data.find((el: { user_id: string; })  => el.user_id == (infoFolder?.owner ? infoFolder?.owner : infoFolder?.user_id))
          setOwner(name?.firstName + ' ' + name?.lastName)
        }
        else {
          let name = res.data.find((el: { user_id: string; })  => el.user_id == (infoFile?.owner ? infoFile?.owner : infoFile?.user_id))
          setOwner(name?.firstName + ' ' + name?.lastName)

        }

        
    }
    fetchData()
},[])

  return (
    <div className={cx('card','floating')}>
      <div className={cx('card-title')}>
        <h2>Info</h2>
      </div>

      <div className={cx("card-content")}>
        {/* <p>{selectedCount > 1 ? `Translate Function for $t('prompts.filesSelected', { count: ${selectedCount} })` : null}</p> */}

        <p className={cx("break-word")} 
          // style={{ display: selectedCount < 2 ? 'block' : 'none' }}
        >
          {type == 'folder' ? (
            <>
              <span><strong>Name: </strong>{infoFolder?.folder_name}</span>
              <span><strong>Created Date: </strong>{infoFolder?.created_date}</span>
              <span><strong>Onwer: </strong>{owner}</span>
            </>
          ) : (
            <>
              <span><strong>Name: </strong>{infoFile?.file_name}</span>
              <span><strong>Created Date: </strong>{infoFile?.created_date}</span>
              <span><strong>Onwer: </strong>{owner}</span>
            </>
          )
          }
          
        </p>
        
        {/* Add similar lines for other items */}
      </div>

      <div className={cx("card-action")}>
        <button
          type="submit"
          onClick={() => {
            toggleShowInfo()
            toggleCurrentPromptName()
          }}
          className={cx('button','button--flat')}
          aria-label="Translate Function for $t('buttons.ok')"
          title="Translate Function for $t('buttons.ok')"
        >
          OK
        </button>
        
        
      </div>
    </div>
  );
};

export default Info;

interface RootState {
  req: any; // Replace with the actual type of req in your store
  selected: number[]; // Replace with the actual type of selected in your store
  selectedCount: number; // Replace with the actual type of selectedCount in your store
  isListing: boolean; // Replace with the actual type of isListing in your store
}
