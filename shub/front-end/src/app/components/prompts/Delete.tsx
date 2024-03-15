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

const Delete: React.FC<DeleteProps> = () => {
  const pathname = usePathname()
  const userId = Cookies.get('userId');
  const accessToken = Cookies.get('accessToken');
  const { selected, toggleShowDelete, handleChange, type, toggleCurrentPromptName } = useShub();
  
  const toggle = () => {
    toggleShowDelete()
  }
  
  const submit = () => {
    const path = pathname.replaceAll('/','+')
    const load = toast.loading('Loading...')

    if (type == 'folder'){
      const foldersString = Cookies.get('folders');

      if (foldersString) {
        const folders = JSON.parse(foldersString);
        const name = folders.find((el: { folder_id: string; })  => el.folder_id == selected)
        const data = {
          user_id: userId,
          folder_path: pathname,
          folder_id: selected,
      };
        axios.delete(`http://localhost:3001/folders/delete`,  {
          params: data,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, 
          },
        })
        .then(response => {
          console.log('Folder deleted');
          handleChange()
          toggleCurrentPromptName()
          toast.success('Folder Deleted')
          toast.dismiss(load);

        })
        .catch(error => {
          console.error('Error creating folder:', error);
        });
      }
      
    }
    else {
      axios.delete(`http://localhost:3001/files/${selected}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        },
      })
      .then(response => {
        console.log('File deleted');
        handleChange()
        toggleCurrentPromptName()
        toast.success('File Deleted')
        toast.dismiss(load);

      })
      .catch(error => {
        console.error('Error creating file:', error);
      });
    }
    toggle()
  }

  return (
    <div className={cx('card','floating')}>
      <div className={cx("card-content")}>
        <p>
          Are you sure you want to delete this file/folder?
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
          Delete
        </button>
      </div>
    </div>
  );
};

export default Delete;
