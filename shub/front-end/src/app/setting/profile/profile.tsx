import styles  from './profile.module.scss'
import LanguageSelector from '@/app/components/settings/languages/lanuages'
import Button from '@/app/components/button/button'
import SettingsForm from '@/app/components/settings/settingsForm/settingForm'
export default function Profile() {
    return (
        <>
        <h1 className={styles.header}>Setting</h1>
       <SettingsForm />
       </>
        
        )
}