import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './NewDir.module.scss'
import { useShub } from '@/app/Provider/Provider';
import axios from 'axios';

const cx = classNames.bind(styles);

interface NewDirProps {
    redirect?: boolean;
    base?: string;
}

const NewDir: React.FC<NewDirProps> = ({ redirect, base }) => {
    
    const [name, setName] = useState<string>("");
    

    const { addFolder, toggleCurrentPromptName, toggleShowNewDir } = useShub();

    const submit = () => {
        const token = localStorage.getItem('token');
        const folderData = {
            folder_name: name,
            parent_folder_id: null,
            user_id: localStorage.getItem('user_id'), 
          };
        axios.post(`http://localhost:3001/folders`, folderData,{
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
        toggleShowNewDir()
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submit();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };


    return (
        <div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>New directory</h2>
            </div>

            <div className={cx("card-content")}>
                <p>Write the name of the new directory.</p>
                <input
                    className={cx('input','input--block')}
                    type='text'
                    onKeyDown={handleKeyPress}
                    onChange={handleInputChange}
                    name={name}
                />
            </div>

            <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    onClick={() => {
                        toggleCurrentPromptName()
                        toggleShowNewDir()
                        }
                    }
                    aria-label='Cancel'
                    title='Cancel'>
                    Cancel
                </button>
                <button
                    className={cx('button','button--flat')}
                    aria-label='Create'
                    title='Create'
                    onClick={submit}
                    >
                    Create
                </button>
            </div>
        </div>
    )

}

export default NewDir;