import styles from './userDefaultSettingForm.module.scss'
import LanguageSelector from '@/app/components/settings/languages/lanuages'
import Button from '@/app/components/button/button'
import Permissions from '@/app/components/settings/permissions/permissions'
export default function UserDefaultSettingForm() {
    return (
        <div className={styles.container}>
            <form action="" className="">
            <div className={styles.title}><h2 className="">User Default Setting</h2></div>
            <div className={styles.content}>
                <p className={styles.small}>These are the default settings for new users.</p>
                <p className={styles.subtitle}>Scope</p>
                <input type='text' className={styles.input} />
                <p className={styles.subtitle}>Lanuages</p>
                <div className={styles.language}>
                    <LanguageSelector />
                </div>
                
                <Permissions />
                
                
            </div>
            <div className={styles.footer}><Button buttonName='UPDATE' color='blue' /></div>
            </form>
            
        </div>
    )
}