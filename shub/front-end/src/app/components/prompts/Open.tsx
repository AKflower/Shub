import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Lock.module.scss'
import { useShub } from '@/app/Provider/Provider';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { InputOtp } from 'primereact/inputotp';
const cx = classNames.bind(styles);

interface OpenProps {
    
}

const Open: React.FC<OpenProps> = () => {
    const {  toggleCurrentPromptName, toggleShowLock, handleChange, selected, data, lock, toggleShowOpen, handleOpen, handleStream } = useShub();
    const accessToken = Cookies.get('accessToken');
    const userId = Cookies.get('userId');
    
    const [PIN, setPIN] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [retype, setRetype] = useState<string>();
    const [wrong, setWrong] = useState<string>('');
    const [quan, setQuan] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [auth, setAuth] = useState<string>('');
   
    const open = async() => {
        if(PIN && PIN?.length < 4) {
            setWrong('wrong')

        }
        else {
            const load = toast.loading('Loading...')

            try{
                const data1 = {
                    user_id: userId,
                    file_id: selected,
                    file_password: PIN
                };
                
                const response = await axios.get('http://localhost:3001/files/validate',{
                    params: data1,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`, 
                    },
                })
               
                  
                if (response.data == true){
                    toggleShowOpen()

             
                const data2 = {
                    user_id: userId,
                    file_id: selected,
                    data: data,
                    password: PIN
                };
                await axios.put(`http://localhost:3001/files/open`, data2, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`, 
                    },
                })
                .then(async response => {
                    await handleOpen(response.data)
                    await handleStream()
                    toast.dismiss(load);
                })
                .catch(error => {
                    console.error('Error locking file:', error);
                }); 
                }
                else{
                    setWrong('wrong')
                    toast.dismiss(load);
                }
            }catch (e) {
                console.error('There has been a problem with your axios operation:', e);

              }
            
                
               
                
        
            
           
        

        }

    }
    

    const again = () => {
        setQuan('')
        setWrong('')
        setPIN('')
        setRetype('')
        setAuth('')
    }

    return (
      
        <>

           
            { !wrong &&(<div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Open</h2>
            </div>

            <div className={cx("card-content")}>
                
                <p>Enter PIN</p>
                <InputOtp value={PIN} onChange={(e) => (setPIN(e.value?.toString()))} mask integerOnly/>
           
               
            </div>

            <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    onClick={() => {
                        toggleCurrentPromptName()
                        toggleShowOpen()
                        }
                    }
                    aria-label='Cancel'
                    title='Cancel'>
                    Cancel
                </button>
                <button
                    className={cx('button','button--flat')}
                    aria-label='Open'
                    title='Open'
                    onClick={open}
                    >
                    Open
                </button>
            </div>
        </div>)}
        {wrong && (
            <div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Lock</h2>
            </div>

            <div className={cx("card-content")}>
                <p>Your PIN is wrong. Please try again</p>
                
            </div>

            <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    onClick={() => {
                        toggleCurrentPromptName()
                        toggleShowOpen()
                        }
                    }
                    aria-label='Cancel'
                    title='Cancel'>
                    Cancel
                </button>
                <button
                    className={cx('button','button--flat')}
                    aria-label='Again'
                    title='Again'
                    onClick={again}
                    >
                    Again
                </button>
            </div>
        </div>
        )}
       
        </>
            
      
        
    )
}

export default Open;