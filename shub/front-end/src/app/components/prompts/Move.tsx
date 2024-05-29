import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { usePathname, useRouter } from 'next/navigation'
import styles from './Move.module.scss'
import Cookies from 'js-cookie';
import { useShub } from '@/app/Provider/Provider';
import axios from 'axios';
import toast from 'react-hot-toast';

const cx = classNames.bind(styles);

interface MoveProps { }

interface Item {
    id: string;
    named: string;
    url: string;
  }

  interface ItemFile {
    id: string;
    named: string;
    url: string;
  }

const Move: React.FC<MoveProps> = () => {
    const pathname = usePathname()
    const [path, setPath] = useState(pathname);
    const [create, setCreate] = useState('');
    const [dis, setDis] = useState(false);
    const [items, setItems] = useState<Item[] >([]);
    const [itemsF, setItemsF] = useState<Item[] >([]);
    const router = useRouter();
    const userId = Cookies.get('userId');
    const accessToken = Cookies.get('accessToken');
    const { 
        type,
        selected,
        handleChange,
        toggleCurrentPromptName,
        toggleShowMove,
        name,
        handleSelect,
        
    } = useShub();

    const a = '1'
    const memoizedValue = useMemo(() => selected, [a]);


    const handleClick = (name: string) => {
        const newPath = path + '/' + name 
        setPath(newPath)
    }

    const handleBack = () => {
        const newPath = path.slice(0, path.lastIndexOf('/'))
        setPath(newPath)
    }
    
    const handleMove =async () => {
        const load = toast.loading('Loading...')
        toggleShowMove()
        if (type == 'folder'){
            let i = 1;
            let j = true;
            let nameCheck = name
            while(j){
                let result = items.some((el: { named: string; }) => el.named == nameCheck);
                if (result) {
                    nameCheck = name
                    nameCheck = nameCheck + ` (${i})`
                    i = i + 1
                }
                else j = false
            }
            if(name != nameCheck){const data2 = {
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
              })
              .catch(error => {
                console.error('Error Renaming folder:', error);
              });}
            const data = {
                folder_id: memoizedValue,
                newPath: path,
                user_id: userId,
            };

            await axios.put(`http://localhost:3001/folders/updatePath`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`, 
                },
              })
              .then(response => {
                toast.success('Folder Moved')
                toast.dismiss(load);
                handleChange()
                toggleCurrentPromptName()
                
              })
              .catch(error => {
                console.error('Error moving folder:', error);
              });
        }
        else{
            let i = 1;
            let j = true;
            let nameCheck = name
            while(j){
                let result = itemsF.some((el: { named: string; }) => el.named == nameCheck);
                if (result) {
                    nameCheck = name
                    nameCheck = nameCheck + ` (${i})`
                    i = i + 1
                }
                else j = false
            
            
            }
            if(name != nameCheck){const data2 = {
                user_id: userId,
                file_id: selected,
                new_file_name: nameCheck,
              };
        
              await axios.put(`http://localhost:3001/files/rename`, data2, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
              })
              .then(response => {
              })
              .catch(error => {
                console.error('Error Renaming folder:', error);
              });}
            const data = {
                file_id: memoizedValue,
                newPath: path,
            };

            await axios.put(`http://localhost:3001/files/updatePath`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`, 
                },
              })
              .then(response => {
                toast.success('File Moved')
                toggleCurrentPromptName()
                toast.dismiss(load)
                handleChange()
                
      
              })
              .catch(error => {
                console.error('Error moving file:', error);
              });
        }

    }
    

    useEffect(()=>{
        const fetchData = async () => {
            
            const itm: Item[] = []
            const itmF: ItemFile[] = []

            const data = { user_id: userId, path: path };

            const resF = await axios.get(`http://localhost:3001/folders/bypath`,{
                params: data, // Truyền dữ liệu qua query parameters
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
              },
             );
             const res = await axios.get(`http://localhost:3001/files/bypath`,{
                params: data, // Truyền dữ liệu qua query parameters
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
              },
             );

             let filteredFolders1 = resF.data.filter((folder: { isDelete: any; }) => !folder.isDelete);
             let filteredFiles= res.data.filter((file: { isDelete: any; }) => !file.isDelete);
             
             let filteredFolders = filteredFolders1.sort((a: { folder_name: string; }, b: { folder_name: any; }) => a.folder_name.localeCompare(b.folder_name))
            if(type != 'folder'){
                for (const pie in filteredFolders){
                    await itm.push({
                        id: filteredFolders[pie].folder_id,
                        named: filteredFolders[pie].folder_name,
                        url: filteredFolders[pie].folder_path,
                    })
                }
            }
            else{
                for (const pie in filteredFolders){
                    if(filteredFolders[pie].folder_id != selected){
                        await itm.push({
                            id: filteredFolders[pie].folder_id,
                            named: filteredFolders[pie].folder_name,
                            url: filteredFolders[pie].folder_path,
                        })
                    }
                }
            }

            for (const pie in filteredFiles){
                await itmF.push({
                    id: filteredFiles[pie].file_id,
                    named: filteredFiles[pie].file_name,
                    url: filteredFiles[pie].file_path,
                })
            }

            setItemsF(itmF)
            setItems(itm)
            await handleSelect(memoizedValue, 'more')

        }
        fetchData()
    },[path, create])

    const [namea, setNamea] = useState<string>("");
    

    const submit = () => {
        const load = toast.loading('Loading...')
        setDis(true)
        const folderData = {
            folder_name: namea,
            folder_path: path,
            user_id: userId, 
        };
        
        axios.post(`http://localhost:3001/folders/new`, folderData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            },
        })
        .then( response => {
            toast.success('Folder Created')
            toast.dismiss(load);
            handleChange()

            setDis(false)
            
            setCreate('')
        })
        .catch(error => {
            setDis(false)
            console.error('Error creating folder:', error);
        });

    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submit();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNamea(event.target.value);
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
                        key={item.named}
                        role="button"
                        tabIndex={0}
                        aria-label={item.named}
                        aria-url={item.url}
                        onDoubleClick={() => handleClick(item.named)}
                    >
                        <img src="/folder.svg" alt="" />

                        <span className={cx('name')}>
                            {item.named}
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
                        onClick={() => {
                            toggleShowMove()
                            toggleCurrentPromptName()
                        }}
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
                    name={namea}
                    disabled={dis}
                />
            </div>

            <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    onClick={() => {
                        setCreate('')
                        toggleCurrentPromptName()
                        }
                    }
                    aria-label='Cancel'
                    title='Cancel'
                    disabled={dis}
                    >
                    Cancel
                </button>
                <button
                    className={cx('button','button--flat')}
                    aria-label='Create'
                    title='Create'
                    onClick={submit}
                    disabled={dis}
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
