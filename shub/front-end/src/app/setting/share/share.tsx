import styles from './share.module.scss'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function Share() {
    
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2 className="">Share Management</h2>

            </div>
            <div className={styles.content}>
                <div className="">
                    <SentimentDissatisfiedIcon  style={{fontSize: '100px'}}/>
                </div>
                <div className={styles.message}>It feels lonely here...</div>
                
            </div>
        </div>
    )
}