import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Delete.module.scss'
import { useShub } from '@/app/Provider/Provider';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';


const cx = classNames.bind(styles);

interface DeleteProps {}

const Restore: React.FC<DeleteProps> = () => {
  const pathname = usePathname()
  const userId = Cookies.get('userId');
  const accessToken = Cookies.get('accessToken');
  const { 
    selected, 
    toggleShowRestore, 
    handleChange, 
    type, 
    toggleCurrentPromptName,
    isDelete 
  } = useShub();
  
  const toggle = () => {
    toggleShowRestore()
    toggleCurrentPromptName()
  }
  
  const submit = () => {
    const load = toast.loading('Loading...')

    if (type == 'folder'){
      
        const data = {
          user_id: userId,
          folder_id: selected,
          isDelete: false,
        };

        axios.put(`http://localhost:3001/folders/updateTrash`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, 
          }
        })
        .then(response => {
        console.log(response)

          handleChange()
          toggle()

          toast.success('Folder Restored')
          toast.dismiss(load);

        })
        .catch(error => {
          console.error('Error:', error);
        }); 

      
    }
    else {
      const data = {
        file_id: selected,
        user_id: userId,
        isDelete: false 
      };

      axios.put(`http://localhost:3001/files/updateTrash`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        }
      })
      .then(response => {
        handleChange()
        toggle()

        toast.success('File Restored')
        toast.dismiss(load);

      })
      .catch(error => {
        console.error('Error:', error);
      });

    }
  }

  return (
    <div className={cx('card','floating')}>
      <div className={cx("card-content")}>
        <p>
          Are you sure you want to restore this file/folder?
        </p>
      </div>
      <div className={cx("card-action")}>
        <button
          onClick={() => toggle()
        }
          className={cx('button','button--flat',"button--grey")}
          aria-label="Cancel"
          title="Cancel"
        >
          Cancel
        </button>
        <button
          onClick={() => submit()}
          className={cx('button','button--flat',"button--red")}
          aria-label="Delete"
          title="Delete"
        >
          Restore
        </button>
      </div>
    </div>
  );
};

export default Restore;
