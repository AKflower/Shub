import styles from './newUser.module.scss'
import fonts from '../../../../../public/fonts/fonts';
import SettingsForm from '@/app/components/settings/settingsForm/settingForm';

const NewUser = () => {
    
    return (
        <div className="px-4">
        <h1 className={styles.header+' '+fonts.poppins.className}>User Management</h1>
        <p className={styles.title}>Add New User</p>
        <SettingsForm actionBy='admin' isAddNew={true}/>
    </div>
    )
}
export default NewUser;