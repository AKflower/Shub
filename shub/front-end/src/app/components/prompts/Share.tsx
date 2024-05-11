import { useEffect, useState } from 'react';
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
    name: string;
  }

const Share: React.FC<MoveProps> = () => {
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
        toggleShowShare,
        share
    } = useShub();

    // const handleClick = (name: string) => {
    //     const newPath = path + '/' + name 
    //     setPath(newPath)
    // }

    const handleShare = () => {
        const load = toast.loading('Loading...')

        if (type == 'folder'){
            const data = {
                user_id: userId,
                folder_id: selected,
                share: checkedNames,
            };

            console.log(data)


            axios.put(`http://localhost:3001/folders/updateShare`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`, 
                },
              })
              .then(response => {
                toast.success('Folder Shared')
                toast.dismiss(load);
                handleChange()
                toggleCurrentPromptName()
                
              })
              .catch(error => {
                console.error('Error sharing folder:', error);
              });
        }
        else{
            const data = {
                user_id: userId,
                file_id: selected,
                share: checkedNames,
            };

            axios.put(`http://localhost:3001/files/updateShare`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`, 
                },
              })
              .then(response => {
                toast.success('File shared')
                toggleCurrentPromptName()
                toast.dismiss(load)
                handleChange()
                
      
              })
              .catch(error => {
                console.error('Error sharing file:', error);
              });
        }

        toggleShowShare()
    }
    

    useEffect(()=>{
        const fetchData = async () => {

            const res = await axios.get(`http://localhost:3001/user`,{

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
              },
             );
            
            const itm:Item[] = []
            
            for (const pie in res.data){
                if(res.data[pie].user_id != userId){

                    await itm.push({
                        id: res.data[pie].user_id,
                        name: res.data[pie].email,
                    })
                }
            }
            
            
            
            setItems(itm)

        }
        fetchData()
    },[path, create])

   
    

   

    // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         submit();
    //     }
    // };

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setName(event.target.value);
    // };

    const [checkedNames, setCheckedNames] = useState<string[]>(share);

    const handleCheckboxChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setCheckedNames([...checkedNames, event.target.name]);
      } else {
        setCheckedNames(checkedNames.filter(name => name !== event.target.name));
      }
    };
  
   

    return (
        <>
        {!create && (
            <div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Share</h2>
            </div>
            

            <div className={cx("card-content")}>
                <form className={cx('file-list')}>
                    {items[0] ? items.map((item) => (
                        <label
                            className={cx('li')}
                            key={item.name}
                        >
                            <input type="checkbox" name={item.id} onChange={handleCheckboxChange} checked={checkedNames.includes(item.id)}/>
                            <img src="/avt.svg" alt="" />
                            <span className={cx('name')}>
                                {item.name}
                            </span>
                        </label>
                        
                    )) : (
                        <div>No user here</div>
                    )}
                </form>
         
                
            </div >

            <div
                className={cx("card-action")}
                style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}
            >
                
                <div>
                    <button
                        className={cx('button','button--flat',"button--grey")}
                        onClick={() => {
                            toggleShowShare()
                            toggleCurrentPromptName()
                        }}
                        aria-label="Cancel"
                        title="Cancel"
                    >
                        Cancel
                    </button>
                    <button
                        className={cx('button','button--flat')}
                        onClick={handleShare}
                        // disabled={path == pathname}
                        aria-label="Share"
                        title="Share"
                    >
                        Share
                    </button>
                </div>
            </div>
        </div >
        )}
        
        {/* {create && (
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
                        toggleCurrentPromptName()
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
        )} */}
        
        </>
        
    );
};

export default Share;
