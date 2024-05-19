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
import { Password } from 'primereact/password';
const cx = classNames.bind(styles);

interface LockProps {
    redirect?: boolean;
    base?: string;
}

const Lock: React.FC<LockProps> = () => {
    const {  toggleCurrentPromptName, toggleShowLock, handleChange, selected, data, lock } = useShub();
    const accessToken = Cookies.get('accessToken');
    const userId = Cookies.get('userId');
    
    const [PIN, setPIN] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [retype, setRetype] = useState<string>();
    const [wrong, setWrong] = useState<string>('');
    const [quan, setQuan] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [auth, setAuth] = useState<string>('');
    const [va, setVa] = useState<string>('');
   
    const lockFile = async() => {
        if(PIN && PIN?.length < 4) {
            setQuan('quan')
        }
        else if(PIN !== retype) {
            setWrong('wrong')
        }
        else {
            const load = toast.loading('Loading...')
            toggleShowLock()

            const data2 = {
                user_id: userId,
                file_id: selected,
                file_password: PIN
            };
            await axios.put(`http://localhost:3001/files/changePassword`, data2, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            })
            .then(response => {
                
            })
            .catch(error => {
                console.error('Error locking file:', error);
            }); 
            const data1 = {
                user_id: userId,
                file_id: selected,
                data: data,
                password: PIN
            };
            await axios.put(`http://localhost:3001/files/encrypt`, data1, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            })
            .then(response => {
                toast.success('File Locked')
                toast.dismiss(load);
                toggleCurrentPromptName()
                handleChange()
            })
            .catch(error => {
                console.error('Error locking file:', error);
                toast.dismiss(load);

            }); 
        

        }

    }
    const unLockFile = async() => {
        if(PIN && PIN?.length < 4) {
            setQuan('quan')
        }
        
        else {
            const load = toast.loading('Loading...')

            try{
                const data3 = {
                    user_id: userId,
                    file_id: selected,
                    file_password: PIN
                };
                
                const response = await axios.get('http://localhost:3001/files/validate',{
                    params: data3,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`, 
                    },
                })

                if(response.data == true) {
                    toggleShowLock()

            const data2 = {
                user_id: userId,
                file_id: selected,
                file_password: ''
            };
            await axios.put(`http://localhost:3001/files/changePassword`, data2, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            })
            .then(response => {
                
            })
            .catch(error => {
                console.error('Error locking file:', error);
            }); 
            const data1 = {
                user_id: userId,
                file_id: selected,
                data: data,
                password: PIN
            };
            await axios.put(`http://localhost:3001/files/decrypt`, data1, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            })
            .then(response => {
                toast.success('File Locked')
                toast.dismiss(load);
                toggleCurrentPromptName()
                handleChange()
            })
            .catch(error => {
                console.error('Error locking file:', error);
            }); 
                }
                else {
                    setVa('va')
                    toast.dismiss(load);
                }
            } catch (e) {
                console.error('There has been a problem with your axios operation:', e);
                toast.dismiss(load);

              }
                  
            
        

        }

    }

    const authPass = async() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const email = JSON.parse(savedUser).email
            const load = toast.loading('Loading...')

            try{
                const response = await axios.post('http://localhost:3001/auth/login', { email, password });
                setPass('pass')
                toast.dismiss(load);
            }
            catch (e) {
                setAuth('auth')
            }
            
        }

    }

    const again = () => {
        setQuan('')
        setWrong('')
        setPIN('')
        setRetype('')
        setAuth('')
        setVa('')
    }

    return (
      
        <>

            {!pass && !auth && !lock &&(
                <div className={cx('card','floating')}>
                <div className={cx('card-title')}>
                    <h2>Lock</h2>
                </div>
    
                <div className={cx("card-content")}>
                    <p>Enter password</p>
    
                    <div className={cx('pass')}>
                        <Password
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            toggleMask
                            placeholder='Password'
                        />
                    </div>
                    
                   
                </div>
    
                <div className={cx("card-action")}>
                    <button
                        className={cx('button','button--flat',"button--grey")}
                        onClick={() => {
                            toggleCurrentPromptName()
                            toggleShowLock()
                            }
                        }
                        aria-label='Cancel'
                        title='Cancel'>
                        Cancel
                    </button>
                    <button
                        className={cx('button','button--flat')}
                        aria-label='authentication'
                        title='authentication'
                        onClick={authPass}
                        >
                        Authentication
                    </button>
                </div>
            </div>
            )}
            {pass && !wrong && !quan && !lock &&(<div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Lock</h2>
            </div>

            <div className={cx("card-content")}>
                
                <p>Enter PIN. Remember that this PIN cannot be recovered</p>
                <InputOtp value={PIN} onChange={(e) => (setPIN(e.value?.toString()))} mask integerOnly/>
                <p>Retype</p>
                <InputOtp value={retype} onChange={(e) => setRetype(e.value?.toString())} mask integerOnly/>
               
            </div>

            <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    onClick={() => {
                        toggleCurrentPromptName()
                        toggleShowLock()
                        }
                    }
                    aria-label='Cancel'
                    title='Cancel'>
                    Cancel
                </button>
                <button
                    className={cx('button','button--flat')}
                    aria-label='Lock'
                    title='Lock'
                    onClick={lockFile}
                    >
                    Lock
                </button>
            </div>
        </div>)}
        {wrong && (
            <div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Lock</h2>
            </div>

            <div className={cx("card-content")}>
                <p>Your retyping PIN is not match. Please try again</p>
                
            </div>

            <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    onClick={() => {
                        toggleCurrentPromptName()
                        toggleShowLock()
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
        {quan && (
            <div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Lock</h2>
            </div>

            <div className={cx("card-content")}>
                <p>Your PIN is not enough. Please try again</p>
                
            </div>

            <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    onClick={() => {
                        toggleCurrentPromptName()
                        toggleShowLock()
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

        {va && (
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
                        toggleShowLock()
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

        {auth && (
            <div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Lock</h2>
            </div>

            <div className={cx("card-content")}>
                <p>Your password is wrong. Please try again</p>
                
            </div>

            <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    onClick={() => {
                        toggleCurrentPromptName()
                        toggleShowLock()
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
        {lock && !quan && !va &&(<div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Unlock</h2>
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
                        toggleShowLock()
                        }
                    }
                    aria-label='Cancel'
                    title='Cancel'>
                    Cancel
                </button>
                <button
                    className={cx('button','button--flat')}
                    aria-label='Unlock'
                    title='Unlock'
                    onClick={unLockFile}
                    >
                    Unlock
                </button>
            </div>
        </div>)}

        </>
            
      
        
    )
}

export default Lock;