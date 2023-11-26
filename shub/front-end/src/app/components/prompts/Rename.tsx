import { FC, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Rename.module.scss'
import { useShub } from '@/app/Provider/Provider';
import axios from 'axios';

const cx = classNames.bind(styles);

interface RenameProps { }

const Rename: React.FC<RenameProps> = () => {
   
    const [name, setName] = useState<string>("");
    const { selected, toggleCurrentPromptName, toggleShowRename, showFolder, renameFolder } = useShub();
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
        const token = localStorage.getItem('token');
        const folderData = {
            folder_name: name,
        };
        axios.put(`http://localhost:3001/folders/${selected}`, folderData,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
            },
          })
        .then(response => {
            console.log('Folder created:', response.data);
          })
          .catch(error => {
            console.error('Error creating folder:', error);
          });
        toggleCurrentPromptName()
        toggleShowRename()
    }
    const [oldName, setOldName] = useState<string>("");
    useEffect(() => {
        const foldersString = localStorage.getItem('folders');
        if (foldersString) {
            const folders = JSON.parse(foldersString);
            let oldName = folders.find((el: { folder_id: number; })  => el.folder_id == selected)
            setOldName(oldName.folder_name);
          }
    },[name])


    return (
        <div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Rename</h2>
            </div>

            <div className={cx("card-content")}>
                <p>Insert a new name for {oldName}
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