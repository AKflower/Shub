import styles from './ResetPassword.module.scss'
import classNames from 'classnames/bind';
import {useShub} from '@/app/Provider/Provider'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';


const cx=classNames.bind(styles)
const ResetPassword = () => {

    const {toggleCurrentPromptName, toggleShowResetPassword} = useShub();
    const [isSaving,setIsSaving] = useState<boolean>(false);
    const accessToken = Cookies.get('accessToken');
    const params = useParams()
    console.log(params)

    const reset = () => {
        // const load = toast.loading('Loading...')
            setIsSaving(true)
            const data = {
                user_id : params.id,
            }
             axios.put(`http://localhost:3001/user/reset-password`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            })
            .then(response => {
                // toast.success('Folder Renamed')
                // toast.dismiss(load);
                toggleCurrentPromptName()
                toggleShowResetPassword()
                setIsSaving(false)

            })
            .catch(error => {
                console.error('Error reset password', error);
                setIsSaving(false)

            });
    }
    return (
        <div className={cx('card','floating')}>
        <div className={cx('card-title')}>
            <h2>Reset Password</h2>
        </div>
        <div className=""> <p>Are you sure reset this password?</p></div>
       
        
        <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    onClick={() => {
                        toggleCurrentPromptName()
                        toggleShowResetPassword()
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
                    onClick={reset}
                    disabled={isSaving}
                    style={isSaving ? {color: 'silver'}: {}}
                    >
                    Reset
                </button>
                
        </div>
    </div>
    )
}

export default ResetPassword