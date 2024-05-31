"use client"
import { useState, useEffect } from 'react';
import styles from './Login.module.scss'
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import fonts from '../../../public/fonts/fonts';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import Alert from '@mui/material/Alert'

const cx = classNames.bind(styles);

interface Props {
}

const Login: React.FC<Props> = () => {

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState<any>();
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [disabledL, setDisabledL] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [reset, setReset] = useState(false);
  const [active, setActive] = useState(true);
  const router = useRouter();
  
  const footer = (
    <>
        {newPassword.length < 8 && newPassword.length != 0 && (
          <div className={cx('div')}>
            <p className={cx('p','mt-2')}></p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
              <li className={cx('li')}>
                {/* <img className={cx('check')} src='/wrong.svg'></img> */}
                Password must be at least 8 characters!
              </li>
            </ul>
          </div>
        )}
    </>
);

const check = (
  <>
    {newPassword != retypePassword ? (
      <>
        <p className={cx('p','mt-2')}></p>

        <ul className="pl-2 ml-2 mt-0 line-height-3 " >
            <li className={cx('li')}>
              <img className={cx('check')} src='/wrong.svg'></img>
              Password not match
            </li>
        </ul>
      </>
    ) : (
      <>
        <p className={cx('p','mt-2')}></p>

        <ul className="pl-2 ml-2 mt-0 line-height-3">
          <li className={cx('li')}>
              <img className={cx('check')} src='/correct.svg'></img>
              Match
            </li>
        </ul>
      </>
    )}
  </>
)

const submit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  event.stopPropagation();

  try {
    
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      
      setId(response.data.user_id)
      setToken(response.data.access_token)
      setUser(response.data)
      if(!response.data.isFirstAccess && response.data.isActive) {
        setDisabledL(true)
        localStorage.setItem('user', JSON.stringify(response.data));
        Cookies.set('accessToken', response.data.access_token, { secure: true, sameSite: 'strict' });
        Cookies.set('userId', response.data.user_id, { secure: true, sameSite: 'strict' });
        router.push('/files');
        
      }
      else {
        setError('')
        setReset(response.data.isFirstAccess);
        setActive(response.data.isActive)
        
      }
      
  } catch (e) {
    setError('An error occurred');  
  }
};

const returnL = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  event.stopPropagation();
  setActive(true)
  setPassword('')
  setEmail('')

  
};


const changePass = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    event.stopPropagation();
    setDisabled(true)
    setError('')
  if (newPassword.length < 8) {
    setError('Password must be at least 8 characters!')
    setDisabled(false)
    

  }
  else if (newPassword !== retypePassword) {setError('Your password not match');setDisabled(false)}
  else{
    try {

      const dataP = {
        user_id: id,
        currentPassword: password,
        newPassword: newPassword,
      };
      await axios.put(`http://localhost:3001/user/change-password`, dataP, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        .then(response => {
        })
            
        .catch(error => {
          console.error('Error:', error);
          setDisabled(false)
        });

        const dataF = {
          user_id: id,
          isFirstAccess: false,
          
        };
      
        await axios.put(`http://localhost:3001/user/firstAccess`, dataF, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        .then(response => {
        })
            
        .catch(error => {
          console.error('Error:', error);
          setDisabled(false)
        });

        const dataA = {
          user_id: id,
          isActive: true,
          
        };
      
        await axios.put(`http://localhost:3001/user/changeStatus`, dataA, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        .then(response => {
         
          localStorage.setItem('user', JSON.stringify(user));
          Cookies.set('accessToken', token, { secure: true, sameSite: 'strict' });
          Cookies.set('userId', id, { secure: true, sameSite: 'strict' });
          router.push('/files');
          
        })
            
        .catch(error => {
          console.error('Error:', error);
          setDisabled(false)
        });
      
      
      
    } catch (e) {
      setError('An error occurred');  
      setDisabled(false)
    }
  }
};
  
  return (
    <div id={cx('login')}>
      {!reset && active && (<form onSubmit={submit}>
        {disabledL && <Alert severity="info">Loading</Alert>}

        <Image src="/images/logo.png" alt="Shub" width={200} height={200}/>
        <h1 className={fonts.fontLogo.className}>Shub</h1>
        {error !== '' && <div className={cx('wrong')}>{error}</div>}
          
            <InputText
              autoFocus
              className={cx('input','input--block', 'pass')}
              type="text"
              autoCapitalize="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              disabled={disabledL}
            />
  
          


          <div className={cx('pass')}>
            <Password
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
              placeholder='Password'
              disabled={disabledL}
              />
          </div>
        
        <input
          className={cx('button','button--block')}
          type="submit"
          value={'Log In'}
          disabled={disabledL}
        />

        
      </form>)}

      {reset && (
        
        <form onSubmit={changePass}>
          {disabled && <Alert severity="info">Loading</Alert>}
        {error !== '' && <div className={cx('wrong')}>{error}</div>}
        <p>Change your password</p>
          <div className={cx('pass')}>
            <Password
              className={cx('pass')}
              value={newPassword}
              onChange={(e) => {setNewPassword(e.target.value);}}
              toggleMask
              footer={footer}
              placeholder='New Password'
              disabled={disabled}
            />
          </div>

          <div className={cx('pass')}>
            <Password
              className={cx('pass')}
              value={retypePassword}
              onChange={(e) => {setRetypePassword(e.target.value);}}
              toggleMask
              footer={check}
              placeholder='Retype'
              disabled={disabled}

          />
       
          </div>
        
        

        <input
          className={cx('button','button--block', 'disabled')}
          type="submit"
          value={'Change password'}
          disabled={disabled}

        />

        
      </form>
      )}

      {!active && !reset && (
        <form onSubmit={returnL}>
          <Image style={{borderRadius: 0, boxShadow: 'none' }} src="/war.svg" alt="Warning" width={200} height={200}/>
          <h1></h1>
          <span >Your account has been locked. Please contact admin for support</span>
        <h1></h1>

          <input
          className={cx('button','button--block')}
          type="submit"
          value={'Return login page'}
        />
        </form>
      )}
    </div>
  );
};

export default Login;
