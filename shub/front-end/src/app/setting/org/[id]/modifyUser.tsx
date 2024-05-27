"use client"
import styles from './modifyUser.module.scss'
import SettingsForm from '@/app/components/settings/settingsForm/settingForm'
import fonts from '../../../../../public/fonts/fonts'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'next/navigation';


const ModifyUser = () => {
    
    const user_id = useParams() as { id: string };

    type User = {
        user_id: string,
        email:string,
        firstName: string,
        lastName: string,
    }    
    const [userCurrent, setUserCurrent] = useState<User | null >(null);
    
    const [user,setUser] = useState<User | null >(null);
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUserCurrent(JSON.parse(savedUser));
          }
        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:3001/user/${user_id.id}`)
            setUser(response.data)
        }
        fetchUser()
      }, []);
    console.log(user);
    return (
      
        <div className="px-4">
            <h1 className={styles.header+' '+fonts.poppins.className}>User Management</h1>
            <p className={styles.title}>{userCurrent?.user_id === user?.user_id ? 'Your' : user?.firstName+'\'s' } Account</p>
            <SettingsForm actionBy='admin' userAffected={user}/>
        </div>
           
    )
}
export default ModifyUser;