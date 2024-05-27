    "use client"
import styles  from './profile.module.scss'
import { useShub } from '../../Provider/Provider';
import LanguageSelector from '@/app/components/settings/languages/lanuages'
import Button from '@/app/components/button/button'
import SettingsForm from '@/app/components/settings/settingsForm/settingForm'
import fonts from '../../../../public/fonts/fonts'
import Link from 'next/link'
import { useEffect } from 'react';

const Profile =  () => {
   const { sessionInfo } = useShub()
    // style={sessionInfo.role === "Admin" ? {display: "none"}: {}}
    return (
        <div className={fonts.poppins.className}>
            <div className={styles.headerContainer}>
                <h1 className={styles.header}>Setting</h1>
                <Link href='/setting/userManage' style={sessionInfo.role === "User" ? {display: "none"}: {}}><button className={styles.button}>User Manager</button></Link>
                <Link href='/setting/org' style={sessionInfo.role === "Admin" ? {display: "none"}: {}}><button className={styles.button}>Organization</button></Link>
            </div>
            <p className={styles.title}>Your Account</p>
            <SettingsForm actionBy='user'/>
        </div>
        
       
        
        )
}
export default Profile;