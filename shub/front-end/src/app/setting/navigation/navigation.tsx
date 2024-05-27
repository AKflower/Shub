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
                    <Link href="/setting/userManage"><li className={pathname === "/setting/userManage" ? styles.itemActive : styles.item}>User Management</li></Link>
                    <Link href="/setting/role"><li className={pathname.startsWith("/setting/role" ) ? styles.itemActive : styles.item}>Role Setting</li></Link>
                    
                    
                </ul>
            </div>
        </nav>
    )
}
export default Navigation;