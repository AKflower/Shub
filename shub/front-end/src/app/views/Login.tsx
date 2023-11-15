"use client"
import { useState, useEffect } from 'react';
import styles from './Login.module.scss'
import images from '../assets/img';
// import * as auth from '@/utils/auth';
// import {
//   name,
//   logoURL,
//   recaptcha,
//   recaptchaKey,
//   signup,
// } from '@/utils/constants';

interface Props {
  // Add any props if needed
}

const Login: React.FC<Props> = () => {
  const [createMode, setCreateMode] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

//   useEffect(() => {
//     if (!recaptcha) return;

//     window.grecaptcha.ready(function () {
//       window.grecaptcha.render('recaptcha', {
//         sitekey: recaptchaKey,
//       });
//     });
//   }, []);

//   const toggleMode = () => {
//     setCreateMode(!createMode);
//   };

//   const submit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     event.stopPropagation();

//     let redirect = '/files/'; // default redirect path
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const redirectParam = urlParams.get('redirect');
//     if (redirectParam) {
//       redirect = redirectParam;
//     }

//     let captcha = '';
//     if (recaptcha) {
//       captcha = window.grecaptcha.getResponse();

//       if (captcha === '') {
//         setError('Wrong credentials');
//         return;
//       }
//     }

//     if (createMode) {
//       if (password !== passwordConfirm) {
//         setError('Passwords do not match');
//         return;
//       }
//     }

//     try {
//       if (createMode) {
//         await auth.signup(username, password);
//       }

//       await auth.login(username, password, captcha);
//       // Use Next.js router for navigation
//       // Replace this with your actual route logic
//       // e.g., router.push(redirect);
//     } catch (e) {
//       if (e.message === '409') {
//         setError('Username is already taken');
//       } else {
//         setError('Wrong credentials');
//       }
//     }
//   };

let recaptcha = ''
const submit = async (event: React.FormEvent<HTMLFormElement>) =>{}
let name = 'name'
// let error
// let username = 'username'
let signup = '1'
  const toggleMode = () => {
    setCreateMode(!createMode);
  };

  return (
    <div id={styles.login} className={recaptcha ? 'recaptcha' : ''}>
      <form onSubmit={submit}>
        <img src='/file.png' alt="File Browser" />
        <h1>{name}</h1>
        {error !== '' && <div className="wrong">{error}</div>}

        <input
          autoFocus
          className="input input--block"
          type="text"
          autoCapitalize="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <input
          className="input input--block"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {createMode && (
          <input
            className="input input--block"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm your password"
          />
        )}

        {recaptcha && <div id="recaptcha"></div>}
        <input
          className="button button--block"
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
