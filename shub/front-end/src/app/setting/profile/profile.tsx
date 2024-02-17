import styles  from './profile.module.scss'
import LanguageSelector from '@/app/components/settings/languages/lanuages'
import Button from '@/app/components/button/button'
import SettingsForm from '@/app/components/settings/settingsForm/settingForm'
import fonts from '../../../../public/fonts/fonts'
import Link from 'next/link'

export default function Profile() {
    return (
        <div className={fonts.poppins.className}>
            <div className={styles.headerContainer}>
                <h1 className={styles.header}>Setting</h1>
                <Link href='/setting/userManage'><button className={styles.button}>User Manager</button></Link>
            </div>
            <p className={styles.title}>Your Account</p>
            <SettingsForm actionBy='user'/>
        </div>
        
       
        
        )
}