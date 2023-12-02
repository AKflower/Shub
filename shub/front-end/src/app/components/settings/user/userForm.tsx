import { useState } from 'react';
import LanguageSelector from '../languages/lanuages';
import styles from './userForm.module.scss'
import Permissions from '../permissions/permissions';
import Button from '../../button/button';
const UserForm = ({title}:{title:string}) => {
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
        <form action="" className={styles.card}>
          <h2>{title}</h2>
          <label className={styles.headerInput}>User name</label>
          <input
            className={styles.input}
            type="text"
            id="username"
          />
           <label className={styles.headerInput}>Password</label>
          <input
            className={styles.input}
            type="password"
            id="password"
          />
          <label className={styles.headerInput}>Scope</label>
      <input
        
        className={styles.input}
        type="text"
        
        id="scope"
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
        <Button buttonName='SAVE' color='blue' />
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
