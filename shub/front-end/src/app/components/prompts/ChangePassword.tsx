import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss'
import {useShub} from '@/app/Provider/Provider'
import Input from '../input/input';

const cx=classNames.bind(styles)
const ChangePassword = () => {
    const {toggleCurrentPromptName, toggleShowChangePassword} = useShub();
    
    return (
    <div className={cx('card','floating')}>
        <div className={cx('card-title')}>
            <h2>Change Password</h2>
        </div>
        
        <div className={cx("card-content")}>
            <input type="password" className={cx('input','input--block')} placeholder='Current Password'/>
            <input type="password" className={cx('input','input--block')} placeholder='New Password'/>
            <input type="password" className={cx('input','input--block')} placeholder='Re-type New Password'/>
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
                    
                    >
                    Save
                </button>
            </div>
    </div>
    )
}
export default ChangePassword;