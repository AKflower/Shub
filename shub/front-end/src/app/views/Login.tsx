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
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
        

const cx = classNames.bind(styles);

interface Props {
}

const Login: React.FC<Props> = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [reset, setReset] = useState(false);
  const [active, setActive] = useState(false);
  const router = useRouter();
  
  const footer = (
    <>
        <Divider />
        <p className="mt-2">Suggestions</p>
        <ul className="pl-2 ml-2 mt-0 line-height-3">
         
            <li>Minimum 8 characters</li>
        </ul>
    </>
);

const check = (
  <>
    {newPassword != retypePassword ? (
      <>
        <Divider />
        <ul className="pl-2 ml-2 mt-0 line-height-3 " >
            <li className={cx('li')}>
              <img className={cx('check')} src='/wrong.svg'></img>
              Password not match
            </li>
        </ul>
      </>
    ) : (
      <>
        <Divider />
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
      
      
      console.log(response.data);
      // setUser(response.data);
      // localStorage.setItem('user_id',response.data.user_id); //Delete?
      localStorage.setItem('user', JSON.stringify(response.data));
      Cookies.set('accessToken', response.data.access_token, { secure: true, sameSite: 'strict' });
      Cookies.set('userId', response.data.user_id, { secure: true, sameSite: 'strict' });
      if(!response.data.isFirstAccess) {
        router.push('/files');
      }
      else setReset(response.data.isFirstAccess);
    
      
  } catch (e) {
    setError('An error occurred');  
  }
};

const changePass = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  event.stopPropagation();

  try {
    
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      
      
      console.log(response.data);
      // setUser(response.data);
      // localStorage.setItem('user_id',response.data.user_id); //Delete?
      localStorage.setItem('user', JSON.stringify(response.data));
      Cookies.set('accessToken', response.data.access_token, { secure: true, sameSite: 'strict' });
      Cookies.set('userId', response.data.user_id, { secure: true, sameSite: 'strict' });
      if(!response.data.isFirstAccess) {
        router.push('/files');
      }
      else setReset(response.data.isFirstAccess);
    
      
  } catch (e) {
    setError('An error occurred');  
  }
};
  
  return (
    <div id={cx('login')}>
      {!reset && (<form onSubmit={submit}>
        <Image src="/images/logo.png" alt="Shub" width={200} height={200}/>
        <h1 className={fonts.fontLogo.className}>Shub</h1>
        {error !== '' && <div className={cx('wrong')}>{error}</div>}
        <FloatLabel>
          
            <InputText
              autoFocus
              className={cx('input','input--block', 'pass')}
              type="text"
              autoCapitalize="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
          
          <label htmlFor="username">Username</label>

        </FloatLabel>

        <FloatLabel>
          <div className={cx('pass')}>
            <Password
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
              />
          </div>
          <label htmlFor="password">Password</label>
        </FloatLabel>
        
        <input
          className={cx('button','button--block')}
          type="submit"
          value={'Log In'}
        />

        
      </form>)}

      {reset && (
        <form onSubmit={changePass}>
       
        {error !== '' && <div className={cx('wrong')}>{error}</div>}
        <p>Change your password</p>
        <FloatLabel>
          <div className={cx('pass')}>
            <Password
              className={cx('pass')}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              toggleMask
              footer={footer}
            />
          </div>
          <label htmlFor="newpassword">New Password</label>
        </FloatLabel>

        <FloatLabel>
          <div className={cx('pass')}>
            <Password
              className={cx('pass')}
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              toggleMask
              footer={check}
          />
       
          </div>
          <label htmlFor="retype">Retype</label>
        </FloatLabel>
        
        

        <input
          className={cx('button','button--block')}
          type="submit"
          value={'Change password'}
        />

        
      </form>
      )}
    </div>
  );
};

export default Login;
