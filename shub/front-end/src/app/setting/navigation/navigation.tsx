"use client"
import Link from "next/link"
import styles from './navigation.module.scss'
import { usePathname } from 'next/navigation'
import { useShub } from "@/app/Provider/Provider"
const Navigation = () => { 
    const pathname = usePathname()
    const { sessionInfo} = useShub()
    return (
        <>
             {sessionInfo &&
             <>
                {sessionInfo.permissionIds && 
                    <nav className={styles.nav}>
                    <div className={styles.container}>
                        <ul className={styles.list}>
                            {(sessionInfo.permissionIds.includes('permission_1') || sessionInfo.permissionIds.includes('permission_2')) && <Link href="/setting/userManage"><li className={pathname === "/setting/userManage" ? styles.itemActive : styles.item}>User Management</li></Link>}
                            {sessionInfo.permissionIds.includes('permission_3') && <Link href="/setting/role"><li className={pathname.startsWith("/setting/role" ) ? styles.itemActive : styles.item}>Role Setting</li></Link>}
                            {sessionInfo.permissionIds.includes('permission_3') && <Link href="/setting/permission"><li className={pathname.startsWith("/setting/permission" ) ? styles.itemActive : styles.item}>Permission</li></Link>}
                            
                        </ul>   
                    </div>
                </nav>}
             </>
                
               
            }
        </>
       
    )
}
export default Navigation;