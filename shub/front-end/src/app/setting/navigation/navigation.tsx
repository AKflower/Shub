"use client"
import Link from "next/link"
import styles from './navigation.module.scss'
import { usePathname } from 'next/navigation'
const Navigation = () => { 
    const pathname = usePathname()
    
    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <ul className={styles.list}>
                    <Link href="/setting/profile"><li className={pathname === "/setting/profile" ? styles.itemActive : styles.item}><span className={styles.title}>Profile Setting</span></li></Link>
                    <Link href="/setting/share"><li className={pathname === "/setting/share" ? styles.itemActive : styles.item}>Share Management</li></Link>
                    <Link href="/setting/global"><li className={pathname === "/setting/global" ? styles.itemActive : styles.item}>Global Settings</li></Link>
                    <Link href="/setting/users"><li className={pathname.startsWith("/setting/users" ) ? styles.itemActive : styles.item}>User Management</li></Link>
                    
                    
                </ul>
            </div>
        </nav>
    )
}
export default Navigation;