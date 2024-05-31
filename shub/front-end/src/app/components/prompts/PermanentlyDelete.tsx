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

const PermanentlyDelete: React.FC<DeleteProps> = () => {
  const pathname = usePathname()
  const userId = Cookies.get('userId');
  const accessToken = Cookies.get('accessToken');
  const { 
    selected, 
    toggleShowPermanentlyDelete, 
    handleChange, 
    type, 
    toggleCurrentPromptName,
  } = useShub();
  
  const toggle = () => {
    toggleShowPermanentlyDelete()
    toggleCurrentPromptName()
  }

  
  
  const submit = async () => {
    const load = toast.loading('Loading...')
    toggleShowPermanentlyDelete()

          if (type == 'folder'){
            const data = { user_id: userId };

            const res = await axios.get(`http://localhost:3001/folders/trash`,{
                params: data, // Truyền dữ liệu qua query parameters
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            });
            
              const name = res.data.folders.find((el: { folder_id: string; })  => el.folder_id == selected)
              const data1 = {
                user_id: userId,
                folder_path: name.folder_path,
                folder_id: selected,
            };
            await axios.delete(`http://localhost:3001/folders/delete`,  {
                params: data1,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`, 
                },
              })
              .then(response => {
                console.log('Folder permanently deleted');
                toggleCurrentPromptName()
                
                toast.success('Folder permanently deleted')
                toast.dismiss(load);
                handleChange()
      
              })
              .catch(error => {
                console.error('Error creating folder:', error);
              });
            
          }
          else {
            axios.delete(`http://localhost:3001/files/${selected}`,{
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
              },
            })
            .then(response => {
              console.log('File permanently deleted');
              toast.success('File permanently deleted')
              toast.dismiss(load);
              handleChange()
              toggleCurrentPromptName()

      
            })
            .catch(error => {
              console.error('Error creating file:', error);
            });
          }
  }

  return (
    <div className={cx('card','floating')}
    >
      <div className={cx("card-content")}
          >
        <p>
          Are you sure you want to permanently delete this file/folder?
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

export default PermanentlyDelete;
