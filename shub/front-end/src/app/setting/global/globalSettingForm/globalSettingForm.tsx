import styles from './globalSettingForm.module.scss'
import Button from '@/app/components/button/button'
export default function GlobalSettingForm () {
    return (
        <div className={styles.container}>
            <form action="" className="">
            <div className={styles.title}><h2 className="">Global Setting</h2></div>
            <div className={styles.content}>
                <p className={styles.choose}>
                    <input type= "checkbox" className={styles.chooseTitle} />Allow users to signup</p>
                <p className={styles.choose}>
                    <input type= "checkbox" className={styles.chooseTitle} />Auto create user home dir while adding new user</p>
                <p className={styles.small}>Base path for user home directories</p>
                <input type="text" className={styles.input} />
                <h3 className={styles.midTitle}>Branding</h3>
                <p className={styles.small}>You can customize how your File Browser instance looks and feels by changing its name, replacing the logo, adding custom styles and even disable external links to GitHub. For more information about custom branding, please check out the documentation.</p>
                <p className={styles.subtitle}>Theme</p>
                
                <input type="text" className={styles.input} />
                <p className={styles.subtitle}>Instance name</p>
                
                <input type="text" className={styles.input} />
                <p className={styles.subtitle}>Branding directory path</p>
                
                <input type="text" className={styles.input} />
                <h3 className={styles.midTitle}>Chunked Uploads</h3>
                <p className={styles.small}>File Browser supports chunked file uploads, allowing for the creation of efficient, reliable, resumable and chunked file uploads even on unreliable networks.</p>
                <p className={styles.subtitle}>Indicates to maximum size of a request (direct uploads will be used for smaller uploads). You may input a plain integer denoting a bytes input or a string like 10MB, 1GB etc.</p>
                <input type="text" className={styles.input} />
                <p className={styles.subtitle}>Number of retries to perform if a chunk fails to upload.</p>
                <input type="text" className={styles.input} />
            </div>
            <div className={styles.footer}>
                <Button buttonName='UPDATE' color='blue' />
            </div>

            </form>
           
        </div>
    )
}