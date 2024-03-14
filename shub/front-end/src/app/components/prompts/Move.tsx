import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { usePathname, useRouter } from 'next/navigation'
import styles from './Move.module.scss'
import Cookies from 'js-cookie';
import { useShub } from '@/app/Provider/Provider';
import axios from 'axios';

const cx = classNames.bind(styles);

interface MoveProps { }

interface Item {
    id: string;
    name: string;
    url: string;
  }

const Move: React.FC<MoveProps> = () => {
    const pathname = usePathname()
    const [path, setPath] = useState(pathname);
    const [create, setCreate] = useState('');
    const [items, setItems] = useState<Item[] >([]);
    const router = useRouter();
    const userId = Cookies.get('userId');
    const accessToken = Cookies.get('accessToken');
    const { 
        type,
        selected,
        handleChange,
        toggleCurrentPromptName,
        toggleShowMove,
    } = useShub();

    const handleClick = (name: string) => {
        const newPath = path + '/' + name 
        setPath(newPath)
    }

    const handleBack = () => {
        const newPath = path.slice(0, path.lastIndexOf('/'))
        setPath(newPath)
    }
    
    const handleMove = () => {
        if (type == 'folder'){
            const data = {
                folder_id: selected,
                newPath: path,
                user_id: userId,
            };

            axios.put(`http://localhost:3001/folders/updatePath`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`, 
                },
              })
              .then(response => {
                console.log('Folder moved');
                handleChange()
      
              })
              .catch(error => {
                console.error('Error moving folder:', error);
              });
        }
        else{
            const data = {
                file_id: selected,
                newPath: path,
            };

            axios.put(`http://localhost:3001/files/updatePath`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`, 
                },
              })
              .then(response => {
                console.log('File moved');
                handleChange()
                toggleCurrentPromptName()
                toggleShowMove()
      
              })
              .catch(error => {
                console.error('Error moving file:', error);
              });
        }
        

    }
    

    useEffect(()=>{
        const fetchData = async () => {
            const itm: Item[] = []

            const data = { path: path };

            const resF = await axios.get(`http://localhost:3001/folders/bypath`,{
                params: data, // Truyền dữ liệu qua query parameters
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
              },
             );

            if(type != 'folder'){
                for (const pie in resF.data){
                    await itm.push({
                        id: resF.data[pie].folder_id,
                        name: resF.data[pie].folder_name,
                        url: resF.data[pie].folder_path,
                    })
                }
            }
            else{
                for (const pie in resF.data){
                    if(resF.data[pie].folder_id != selected){
                        await itm.push({
                            id: resF.data[pie].folder_id,
                            name: resF.data[pie].folder_name,
                            url: resF.data[pie].folder_path,
                        })
                    }
                }
            }

            
            setItems(itm)

        }
        fetchData()
    },[path, create])

    const [name, setName] = useState<string>("");
    

    const submit = () => {
        const folderData = {
            folder_name: name,
            folder_path: path,
            user_id: userId, 
        };
        
        axios.post(`http://localhost:3001/folders/new`, folderData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            },
        })
        .then(response => {
            console.log('Folder created:', response.data);
            setCreate('')


        })
        .catch(error => {
            console.error('Error creating folder:', error);
        });

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
        <>
        {!create && (
            <div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Move</h2>
            </div>
            {path != '/files' &&
            <div className={cx('back')} onClick={() => handleBack()}>
                <img src="/back.svg" alt="" />
            </div>
            }
            

            <div className={cx("card-content")}>
                <ul className={cx('file-list')}>
                {items[0] ? items.map((item) => (
                    <li
                        className={cx('li')}
                        key={item.name}
                        role="button"
                        tabIndex={0}
                        aria-label={item.name}
                        aria-url={item.url}
                        onDoubleClick={() => handleClick(item.name)}
                    >
                        <img src="/folder.svg" alt="" />

                        <span className={cx('name')}>
                            {item.name}
                        </span>

          
                    </li>
                )): (
                    <div>No folder here</div>
                )}
                </ul>
            </div >

            <div
                className={cx("card-action")}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                {/* {user.perm.create && ( */}
                    <button
                        className={cx('button','button--flat')}
                        onClick={ () => {
                            setCreate('new')
                        }}
                        aria-label="New Folder"
                        title="New Folder"
                        style={{ justifySelf: 'left' }}
                    >
                        <span>New Folder</span>
                    </button>
                {/* )} */}
                <div>
                    <button
                        className={cx('button','button--flat',"button--grey")}
                        onClick={toggleShowMove}
                        aria-label="Cancel"
                        title="Cancel"
                    >
                        Cancel
                    </button>
                    <button
                        className={cx('button','button--flat')}
                        onClick={handleMove}
                        disabled={path == pathname}
                        aria-label="Move"
                        title="Move"
                    >
                        Move
                    </button>
                </div>
            </div>
        </div >
        )}
        
        {create && (
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
                        setCreate('')
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
        )}
        
        </>
        
    );
};

export default Move;
