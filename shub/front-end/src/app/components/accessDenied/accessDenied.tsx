import styles from './accessDenied.module.scss'
import Link from 'next/link';

const AccessDenied = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.error}>404</h1>
            <div className={styles.message}>Oops! Page not found</div>
            <Link href="/files"><div className={styles.link}>Go back</div></Link>
        </div>
    )
}
export default AccessDenied;