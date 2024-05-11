import React, { useEffect, useState } from 'react';
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

  // const change = async () => {
  //   const data1 = { user_id: userId, path: path };

  //     const resF = await axios.get(`http://localhost:3001/folders/bypath`,{
  //       params: data1, // Truyền dữ liệu qua query parameters
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${accessToken}`, 
  //       },
  //     },
  //     );

  //     let filteredFolders = resF.data.filter((folder: { isDelete: any; }) => !folder.isDelete);
  //     let oldName = filteredFolders.find((el: { folder_id: string; })  => el.folder_id == selected)
  //     let cout = resF.data.filter((folder: { folder_name: any; }) => folder.folder_name == oldName.folder_name);
  //     let nameCheck = oldName.folder_name
      
  //     if (cout.length >= 2){
  //       let i = 1;
  //       let j = true;
  //       while(j){
  //         let result = filteredFolders.some((el: { folder_name: string; }) => el.folder_name == nameCheck);
  //         if (result) {
  //             nameCheck = oldName.folder_name
  //             nameCheck = nameCheck + ` (${i})`
  //             i = i + 1
  //         }
  //         else j = false
  //     }

  //     }
  // }
  
  const submit = async () => {
    const load = toast.loading('Loading...')

    if (type == 'folder'){
      
      const data = {
        user_id: userId,
        folder_id: selected,
        isDelete: false,
      };
      let path
      await axios.put(`http://localhost:3001/folders/updateTrash`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        }
      })
      .then( response => {
        path = response.data.data.folder_path
      })
      .catch( error => {
         console.error('Error:', error);
      }); 

      const data1 = { user_id: userId, path: path };

      const resF = await axios.get(`http://localhost:3001/folders/bypath`,{
        params: data1, // Truyền dữ liệu qua query parameters
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        },
      },
      );

      let filteredFolders =  resF.data.filter((folder: { isDelete: any; }) => !folder.isDelete);
      let oldName =  filteredFolders.find((el: { folder_id: string; })  => el.folder_id == selected)
      let erase = filteredFolders.map((folder: { folder_name: any; }) => ({ ...folder, folder_name: folder.folder_name.replace(/#/g, "") }))
      let cout =  erase.filter((folder: { folder_name: any; }) => folder.folder_name == oldName.folder_name.replace(/#/g, ""));
      let nameCheck =  oldName.folder_name.replace(/#/g, "")
      
      if (cout.length >= 2){
        let i = 1;
        let j = true;
        while(j){
          let result = await erase.some((el: { folder_name: string; }) => el.folder_name == nameCheck);
          if (result) {
              nameCheck = oldName.folder_name.replace(/#/g, "")
              nameCheck = nameCheck + ` (${i})`
              i = i + 1
          }
          else j = false
        } 

      }

      
      const data2 = {
        new_folder_name: nameCheck,
        user_id: userId,
        folder_path: path,
        folder_id: selected,
      };

      await axios.put(`http://localhost:3001/folders/rename`, data2, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, 
        },
      })
      .then(response => {
        handleChange()
        toggle()
        toast.success('Folder Restored')
        toast.dismiss(load);
      })
      .catch(error => {
        console.error('Error Renaming folder:', error);
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
