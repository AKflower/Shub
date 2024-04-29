"use client"

import styles from './Tool.module.scss'
import classNames from 'classnames/bind';
import { useShub } from '@/app/Provider/Provider';
import Action from '../header/Action';
import { useState } from 'react';

const cx = classNames.bind(styles);

const ToolFB = () => {
  const [showView, setShowView] = useState('grid');

  const { 
    toggleCurrentPromptName,
    option, 
    toggleShowRestore,
    toggleShowPermanentlyDelete,
  } = useShub();
      
  
  return (
    <div className={cx('wrapper')}>
    {option && (<div className={cx('container')}>

        <div className={cx('icon')}>
        <Action 
          icon={<img src='/restore.svg'></img>}
          label='
          Restore'
          counter={0}
          onAction={()=>{
            toggleShowRestore()
            toggleCurrentPromptName()
            }
          } 
        />
      </div>

      <div className={cx('icon')}>
        <Action 
          icon={<img src='/delete.svg'></img>}
          label='
          Permanently Delete'
          counter={0}
          onAction={()=>{
            toggleShowPermanentlyDelete()
            toggleCurrentPromptName()
            }
          } 
        />
      </div>

    

      
         
    </div>)}
    </div>
  );
};

export default ToolFB;
