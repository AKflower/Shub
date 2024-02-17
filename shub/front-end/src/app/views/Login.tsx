"use client"
import { useState, useEffect } from 'react';
import styles from './Login.module.scss'
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import fonts from '../../../public/fonts/fonts';

const cx = classNames.bind(styles);

interface Props {
}

const Login: React.FC<Props> = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  


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
      router.push('/files');
      
  } catch (e) {
    setError('An error occurred');  
  }
};
  
  return (
    <div id={cx('login')}>
      <form onSubmit={submit}>
        <Image src="/images/logo.png" alt="Shub" width={200} height={200}/>
        <h1 className={fonts.fontLogo.className}>Shub</h1>
        {error !== '' && <div className={cx('wrong')}>{error}</div>}

        <input
          autoFocus
          className={cx('input','input--block')}
          type="text"
          autoCapitalize="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your username"
        />
        <input
          className={cx('input','input--block')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {/* {createMode && (
          <input
            className={cx('input','input--block')}
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm your password"
          />
        )} */}

        <input
          className={cx('button','button--block')}
          type="submit"
          value={'Log In'}
        />

        {/*{signup && (
          <p onClick={toggleMode}>
            {createMode ? 'Log In instead' : 'Create an Account'}
          </p>
        )} */}
      </form>
    </div>
  );
};

export default Login;
