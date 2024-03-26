import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './NewDir.module.scss'
import { useShub } from '@/app/Provider/Provider';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const cx = classNames.bind(styles);

interface NewDirProps {
    redirect?: boolean;
    base?: string;
}

const NewDir: React.FC<NewDirProps> = () => {
    const pathname = usePathname()
    const [name, setName] = useState<string>("");
    const {  toggleCurrentPromptName, toggleShowNewDir, handleChange } = useShub();
    const accessToken = Cookies.get('accessToken');
    const userId = Cookies.get('userId');
    

    const submit = () => {
        const load = toast.loading('Loading...')
        const foldersString = Cookies.get('folders');
        let i = 1;
        let j = true;
        let nameCheck = name
        if (foldersString) {
            const folders = JSON.parse(foldersString);
            while(j){
                let result = folders.some((el: { folder_name: string; }) => el.folder_name == nameCheck);
                if (result) {
                    nameCheck = name
                    nameCheck = nameCheck + ` (${i})`
                    i = i + 1
                }
                else j = false
            }
            
        }
        const folderData = {
            
            folder_name: nameCheck,
            folder_path: pathname,
            user_id: userId, 
        };
        
        axios.post(`http://localhost:3001/folders/new`, folderData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            },
        })
        .then(response => {
            toast.success('Folder Created')
            toast.dismiss(load);
            toggleCurrentPromptName()

            handleChange()

        })
        .catch(error => {
            console.error('Error creating folder:', error);
        });

        toggleShowNewDir()
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submit();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        if (/[\/\\?:"<>|]/.test(newName)) {
            toast.error('Tên không được chứa các ký tự:\n / \\ ? : " < > |', {
                style: {
                  whiteSpace: 'pre-wrap',
                },
              });
            event.target.value = event.target.value.slice(0,-1)
        }
        else setName(event.target.value);
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