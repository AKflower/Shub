import styles from './user.module.scss'
import Button from '@/app/components/button/button'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Link from 'next/link';
export default function UserManagement() {
    const users = [
        {
            id: 1,
            username: 'admin',
            isAdmin: true,
            scope: '.'
        },
        {
            id: 2,
            username: 'khoa',
            isAdmin: false,
            scope: '/'
        },
        {
            id: 3,
            username: 'dung',
            isAdmin: false,
            scope: '/'
        },
        {
            id: 4,
            username: 'manh',
            isAdmin: false,
            scope: '/'
        }

    ]
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>User</div>
                <Link href="/setting/users/new" >
                <button className=''><div className={styles.button}>New</div></button>
                </Link>
                
            </div>
            <div className={styles.content}>
                <table className={styles.table}>
                    <thead className={styles.tableHeading}>
                        <tr className="">
                            <th className="">Username</th>
                            <th className="">Admin</th>
                            <th className="">Scope</th>
                            <th className=""></th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                    {users.map((user) => (
                        <tr className="" key={user.id}>

                            <td className="">{user.username}</td>
                            <td className="">{user.isAdmin ? 
                            <DoneIcon /> : <CloseIcon />
                            }</td>
                            <td className="">{user.scope}</td>
                            <td className=""><Link href={"/setting/users/" + user.id} ><ModeEditIcon/></Link></td>
                        </tr>
                    ))}
        
                       
                    </tbody>
                    
                </table>
            </div>
        </div>

    )
}