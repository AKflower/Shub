import styles  from './profile.module.scss'
import LanguageSelector from '@/app/components/settings/languages/lanuages'
import Button from '@/app/components/button/button'
export default function Profile() {
    return (
       
        <div className="grid grid-cols-2 gap-4">
            <div className={styles.container}>
                <form action="" className="">
                <div className={styles.title}><h2 className="">Profile Setting</h2></div>
                <div className={styles.content}>
                    <p className={styles.choose}><input type= "checkbox" className={styles.chooseTitle} /> Hide dot file</p>
                    <p className={styles.choose}><input type= "checkbox" className={styles.chooseTitle} /> Use single clicks to open files and directories</p>
                    <p className={styles.choose}><input type= "checkbox" className={styles.chooseTitle} /> Set exact date format</p>
                    <h3 className={styles.languages}>Language</h3>
                    <div className={styles.languagesSelector}>
                        <LanguageSelector />
                    </div>
                </div>
                <div className={styles.footer}><Button buttonName='UPDATE' color='blue'/></div>
                </form>
               
                
            </div>
            <div className={styles.container}>
                <div className={styles.title}><h2 className="">Change Password</h2></div>
                <form action="" className={styles.form}>
                    <div className={styles.content}>
                        <input type="text" className={styles.input} placeholder='Your new password'/>
                        <input type="text" className={styles.input} placeholder='Confirm your new password'/>
                    </div>
                    <div className={styles.footer}><Button buttonName='UPDATE' color='blue'/></div>
                </form>
            </div>
            
        </div>
        
        
    )
}