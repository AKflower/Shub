"use client"
import styles from './settingForm.module.scss';
import Input from '../../input/input';
import Button1 from '../../button/button1';
import Select from 'react-select';
import { useState, useEffect } from 'react';


const SettingsForm = () => {
    type User = {
        user_id: string,
        email:string,
        encryptPassword: string,
    }    
    const [user, setUser] = useState<User | null >(null);

  // Lấy thông tin người dùng từ localStorage khi component được render
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Nếu user không null, hiển thị thông tin người dùng
  if (user) {
    
    return ( 

        <form action="" className="">
            
            <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16">
                <Input label='First name' type='text'/>
                <Input label='Last name' type='text'/>
                <Input label='Email' type='email' value={user.email} />
                <Input label='Password' type='password' value={user.encryptPassword}/>
                <Input label='Role' type='text'/>
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16">
            <Input label='Theme' type='text'/>
            
            </div>
            
            <div className={styles.buttonContainer}>
                <Button1 name='Cancel' type=''/>
                <Button1 name='Save' type='success'/>
                
            </div>
               
         
            
        </form>
    )
  }
  else return (
    <><h1 className="">Error</h1></>
  )
}
export default SettingsForm;