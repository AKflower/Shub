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
                    <li className={pathname === "/setting/profile" ? styles.itemActive : styles.item}><Link href="/setting/profile"><span className={styles.title}>Profile Setting</span></Link></li>
                    <li className={pathname === "/setting/share" ? styles.itemActive : styles.item}><Link href="/setting/share">Share Management</Link></li>
                    <li className={pathname === "/setting/global" ? styles.itemActive : styles.item}><Link href="">Global Settings</Link></li>
                    <li className={pathname === "/setting/user" ? styles.itemActive : styles.item}><Link href="">User Management</Link></li>
                    
                    
                </ul>
            </div>
        </nav>
    )
}
export default Navigation;