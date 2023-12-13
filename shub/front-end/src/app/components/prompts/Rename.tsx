import { FC, useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Rename.module.scss'
import { useShub } from '@/app/Provider/Provider';
import axios from 'axios';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';

const cx = classNames.bind(styles);

interface RenameProps { }

const Rename: React.FC<RenameProps> = () => {
    const userId = Cookies.get('userId');
    const pathname = usePathname()

    const [name, setName] = useState<string>("");
    const { 
        selected, 
        toggleCurrentPromptName, 
        toggleShowRename, 
        handleChange,
        type 
    } = useShub();
    const accessToken = Cookies.get('accessToken');

    const toggle = () => {
        toggleCurrentPromptName()
        toggleShowRename()
      }
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submit();
        }
    }; 
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const submit = () => {
        
        if(type == 'folder'){
            const data = {
                new_folder_name: name,
                user_id: userId,
                folder_path: pathname,
                folder_id: selected,
            };
            axios.put(`http://localhost:3001/folders/rename`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            })
            .then(response => {
                console.log('Folder created:', response.data);
                handleChange()
            })
            .catch(error => {
                console.error('Error creating folder:', error);
            });
        }
        else {
            const data = {
                file_name: name,
            };
            axios.put(`http://localhost:3001/files/${selected}`, data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            })
            .then(response => {
                console.log('Folder created:', response.data);
                handleChange()
            })
            .catch(error => {
                console.error('Error creating folder:', error);
            });
        }
        
        
        toggleCurrentPromptName()
        toggleShowRename()
    }
    const [oldName, setOldName] = useState<string>("");
    useEffect(() => {
        if(type == 'folder'){
            const foldersString = Cookies.get('folders');

            if (foldersString) {
                const folders = JSON.parse(foldersString);
                let oldName = folders.find((el: { folder_id: string; })  => el.folder_id == selected)
                setOldName(oldName.folder_name);
          }
        }
        else{
            const filesString = Cookies.get('files');
            if (filesString) {
                const files = JSON.parse(filesString);
                let oldName = files.find((el: { file_id: string; })  => el.file_id == selected)
                setOldName(oldName.file_name);
          }
        }
        
    },[name])


    return (
        <div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Rename</h2>
            </div>

            <div className={cx("card-content")}>
                <p>Insert a new name for <code>{oldName}</code>
                    {/* {oldName()} */}
                </p>
                <input
                    className={cx("input",'input--block')}
                    type="text"
                    onKeyDown={handleKeyPress}
                    onChange={handleInputChange}
                    name={name}
                    >
                
                </input>
            </div>

            <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    onClick={toggle}
                    aria-label='cancel'
                    title='cancel'>
                    Cancel
                </button>
                <button
                    onClick={submit}
                    className={cx('button','button--flat')}
                    type='submit'
                    aria-label='rename'
                    title='rename'>
                    Rename
                </button>
            </div>
        </div>
    )
}

export default Rename;