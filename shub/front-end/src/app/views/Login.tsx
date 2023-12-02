"use client"
import { useState, useEffect } from 'react';
import styles from './Login.module.scss'
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import fontLogo from '../../../public/fonts/fonts';

const cx = classNames.bind(styles);

interface Props {
  // Add any props if needed
}

const Login: React.FC<Props> = () => {
  const [createMode, setCreateMode] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const router = useRouter();


let recaptcha = ''
const submit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  event.stopPropagation();

  try {
    if (createMode) {
      // Handle signup logic
    } else {
      const response = await axios.post('http://localhost:3001/auth/login', { username, password });
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user_id', response.data.user_id);
      router.push('/files');
    }
  } catch (e) {
    setError('An error occurred');  
  }
};
let name = 'Shub'
// let error
// let username = 'username'
let signup = '1'
  const toggleMode = () => {
    setCreateMode(!createMode);
  };
  
  return (
    <div id={cx('login')} className={recaptcha ? cx('recaptcha') : ''}>
      <form onSubmit={submit}>
        <Image src="/images/logo.png" alt="Shub" width={200} height={200}/>
        <h1 className={fontLogo.className}>
          
          
          {name}</h1>
        {error !== '' && <div className={cx('wrong')}>{error}</div>}

        <input
          autoFocus
          className={cx('input','input--block')}
          type="text"
          autoCapitalize="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <input
          className={cx('input','input--block')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {createMode && (
          <input
            className={cx('input','input--block')}
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm your password"
          />
        )}

        {recaptcha && <div id="recaptcha"></div>}
        <input
          className={cx('button','button--block')}
          type="submit"
          value={createMode ? 'Sign Up' : 'Log In'}
        />

        {signup && (
          <p onClick={toggleMode}>
            {createMode ? 'Log In instead' : 'Create an Account'}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
