"use client"
import { useState } from 'react';
import LanguageSelector from '../languages/lanuages';
import styles from './userForm.module.scss'
import Permissions from '../permissions/permissions';
import Button from '../../button/button';
import axios from 'axios';
const UserForm = ({title}:{title:string}) => {
  const [username,setUserName] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [email,setEmail] = useState<string>("");

  const handleClick = (event : any) => {
  event.preventDefault();
   const newUser = {
      username: username,
      password: password,
      email: email
   }
   axios.post(`http://localhost:3001/user/new`, newUser,{
            
        })
        .then(response => {
            console.log('User created:', response.data);
            

        })
        .catch(error => {
            console.error('Error creating user:', error);
        });
  }
  const handleTypeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleTypePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleTypeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  // const [createUserDirData, setCreateUserDirData] = useState(false);
  // const [originalUserScope, setOriginalUserScope] = useState('/');

  // const passwordPlaceholder = isNew ? '' : 'settings.avoidChanges';
  // const scopePlaceholder = createUserDir ? 'settings.userScopeGenerationPlaceholder' : '';
  // const displayHomeDirectoryCheckbox = isNew && createUserDir;
  // const isExecEnabled = true; // replace with your condition

  // const handleAdminChange = () => {
  //   if (!user.perm.admin) return;
  //   user.lockPassword = false;
  // };

  // const handleCreateUserDirDataChange = () => {
  //   user.scope = createUserDirData ? '' : originalUserScope;
  // };

  return (
    <div className= {styles.column}>
        <form action="" className={styles.card} method='post'>
          <h2>{title}</h2>
          <label className={styles.headerInput}>User name</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            name="username"
            onChange={handleTypeUserName}
            required
          />
           <label className={styles.headerInput}>Password</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            onChange={handleTypePassword}
            required
          />
          <label className={styles.headerInput}>Email</label>
      <input
        
        className={styles.input}
        type="text"
        
        id="email"
        name="email"
        onChange={handleTypeEmail}
        required

      />
      
       
      <label className={styles.headerInput}>Language</label>
      <div className={styles.language}>
      <LanguageSelector/>
      <p className={styles.prevent}>
          <input type="checkbox"  className={styles.checkbox}/>
          Prevent the user from changing the password
      </p>
      </div>
      <div className={styles.permissions}>
      <Permissions />
      </div>
      
      <div className={styles.footer}>
        <Button buttonName='DELETE' color='red' />
        <div className="" onClick={handleClick}>
        <Button buttonName='SAVE' color='blue' />
        </div>
        
      </div>
       </form>
        
          {/* <label htmlFor="username">settings.username</label>
          <input
            className="input input--block"
            type="text"
            
            id="username"
          />

          <label htmlFor="password">settings.password</label>
          <input
            className="input input--block"
            type="password"
            
            
            id="password"
          />
        
      

      <label htmlFor="scope">settings.scope</label>
      <input
        
        className="input input--block"
        type="text"
        
        id="scope"
      />

      
        <p className="small">
          <input type="checkbox"  />
          settings.createUserHomeDirectory
        </p>
      

      <label htmlFor="locale">settings.language</label>
      <LanguageSelector
        
        
      />

      
        <input
          type="checkbox"
          
        />
      

      
      


        <div>
          <h3>settings.rules</h3>
          <p className="small">settings.rulesHelp</p>
          
        </div> */}
      
    </div>
  );
};

export default UserForm;
