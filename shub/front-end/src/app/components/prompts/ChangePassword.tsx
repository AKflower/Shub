import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss'
import {useShub} from '@/app/Provider/Provider'
import Input from '../input/input';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { setTimeout } from 'timers';


const cx=classNames.bind(styles)
const ChangePassword = () => {
    const user_id = Cookies.get('userId');
    const accessToken = Cookies.get('accessToken');
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [reNewPassword, setReNewPassword] = useState<string>("")
    const [isWrongCurrentPassword, setIsWrongCurrentPassword] = useState<boolean>(false)
    const [isWrongNewPassword, setIsWrongNewPassword] = useState<boolean>(false)
    const [isSaving,setIsSaving] = useState<boolean>(false);
    const handleCurrentPassword = (event: any) => {
        setCurrentPassword(event.target.value);
    }
    const handleNewPassword = (event: any) => {
        setNewPassword(event.target.value);
    }
    const handleReNewPassword = (event: any) => {
        setReNewPassword(event.target.value);
    }
    const {toggleCurrentPromptName, toggleShowChangePassword} = useShub();
    const checkPassword = (pass: string) => {
        console.log(pass.length);

        if (pass.length<8) return false;
        return true;
       
    }
    const changePassword = (event:any) => {
        event.preventDefault();
        if (currentPassword === "") {
            toast.error('You must fill it out completely!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setIsWrongCurrentPassword(true);
            setTimeout(() => {
             setIsWrongCurrentPassword(false);
            }, 5000);
        }
        else if (reNewPassword === "" || newPassword==="") {
            toast.error('You must fill it out completely!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setIsWrongNewPassword(true);
            setTimeout(() => {
             setIsWrongNewPassword(false);
            }, 5000);
        }
        else if (reNewPassword!== newPassword) {
            console.error('Password confirmation error!')
            toast.error('Password confirmation error!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
           
            setIsWrongNewPassword(true);
            setTimeout(() => {
             setIsWrongNewPassword(false);
            }, 5000);
        }
        else if (!checkPassword(newPassword)) {
            console.error('Password must be at least 8 characters!');
            toast.error('Password must be at least 8 characters!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setIsWrongNewPassword(true);
            setTimeout(() => {
                setIsWrongNewPassword(false);
            }, 5000);
        }
        else {
            setIsSaving(true);
            const params = {user_id,currentPassword,newPassword}
            axios.put(`http://localhost:3001/user/change-password`, params, {
                
            })
            .then(response => {
                toast.success('Change Password Successfully!', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                  });
                  setIsSaving(false)
              })
              .catch(error => {
                  console.error('Can\'t change password:', error);
                  toast.error('Wrong password!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
                    setIsWrongCurrentPassword(true);
                    setTimeout(() => {
                        setIsWrongCurrentPassword(false);
                    }, 5000);
                    setIsSaving(false)
              });
    
        }
    }

    
    return (
    <div className={cx('card','floating')}>
        <div className={cx('card-title')}>
            <h2>Change Password</h2>
        </div>
        
        <div className={cx("card-content")} style={isSaving ? {color: 'silver'}: {}}>
            <input type="password" className={cx('input','input--block')} style={isWrongCurrentPassword ? {border:'1px solid red'} : isSaving ? {color:'silver'}:{}} placeholder='Current Password' value={currentPassword} onChange={handleCurrentPassword}/>
            <input type="password" className={cx('input','input--block')}  style={isWrongNewPassword ? {border:'1px solid red'} : isSaving ? {color:'silver'}: {}} placeholder='New Password' value={newPassword} onChange={handleNewPassword}/>
            <input type="password" className={cx('input','input--block')}  style={isWrongNewPassword ? {border:'1px solid red'} : isSaving ? {color:'silver'}: {}} placeholder='Re-type New Password' value={reNewPassword} onChange={handleReNewPassword}/>
        </div>

        <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    onClick={() => {
                        toggleCurrentPromptName()
                        toggleShowChangePassword()
                        }
                    }
                    aria-label='Cancel'
                    title='Cancel'>
                    Cancel
                </button>
                <button
                    className={cx('button','button--flat')}
                    aria-label='Save'
                    title='Save'
                    onClick={changePassword}
                    disabled={isSaving}
                    style={isSaving ? {color: 'silver'}: {}}
                    >
                    Save
                </button>
                
            </div>
    </div>
    )
}
export default ChangePassword;