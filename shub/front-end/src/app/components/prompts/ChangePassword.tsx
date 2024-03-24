import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss'
import {useShub} from '@/app/Provider/Provider'
import Input from '../input/input';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast, Bounce } from 'react-toastify';


const cx=classNames.bind(styles)
const ChangePassword = () => {
    const user_id = Cookies.get('userId');
    const accessToken = Cookies.get('accessToken');
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [reNewPassword, setReNewPassword] = useState<string>("")
   
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
    const changePassword = (event:any) => {
        event.preventDefault();
        if (reNewPassword!== newPassword) {
            console.error('Password confirmation error!')
        }
        else {
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
                  
              })
              .catch(error => {
                  console.error('Can\'t change password:', error);
              });
    
        }
    }

    
    return (
    <div className={cx('card','floating')}>
        <div className={cx('card-title')}>
            <h2>Change Password</h2>
        </div>
        
        <div className={cx("card-content")}>
            <input type="password" className={cx('input','input--block')} placeholder='Current Password' value={currentPassword} onChange={handleCurrentPassword}/>
            <input type="password" className={cx('input','input--block')} placeholder='New Password' value={newPassword} onChange={handleNewPassword}/>
            <input type="password" className={cx('input','input--block')} placeholder='Re-type New Password' value={reNewPassword} onChange={handleReNewPassword}/>
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
                    >
                    Save
                </button>
                
            </div>
    </div>
    )
}
export default ChangePassword;