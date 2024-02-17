"use client"
import styles from './userManage.module.scss'
import  fonts  from '../../../../public/fonts/fonts'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';import { useState } from 'react';
import Link from 'next/link';
const users= [
    {
      user_id: "user_1",
      FullName: "John Doe",
      Email: "john.doe@example.com",
      Role: "Admin",
      Organization: "Org1",
    
    },
    {
      user_id: "user_2",
      FullName: "Jane Smith",
      Email: "jane.smith@example.com",
      Role: "User",
      Organization: "Org2",
    },
    {
      user_id: "user_3",
      FullName: "Michael Johnson",
      Email: "michael.johnson@example.com",
      Role: "User",
      Organization: "Org2",

    }
  ]

const UserManage = () => {
    const [more,setMore] = useState(false)
    const handleMore = (item:any) => {
        // setMore(!more);
        
        item.check= !item.check;
    }
    return (
        <div className={fonts.poppins.className+' '+styles.container}>
           <div className={styles.headerContainer}>
              <h1 className={styles.header}>User Manangement</h1>
              <Link href='/setting/userManage/newUser'><button className={styles.button}>Add User</button></Link>

           </div>
           
           <div className={styles.tableContainer}>
           <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <td>Full Name</td>
                        <td>Email</td>
                        <td>Organization</td>
                        <td>Role</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                   {users.map((item)=> (
                        <tr>
                            <td>{item.FullName}</td>
                            <td className={styles.blue}>{item.Email}</td>
                            <td>{item.Organization}</td>
                            <td>{item.Role}</td>
                            <td className={styles.action}><Link href={`/setting/userManage/${item.user_id}`}><span className={styles.edit} onClick={()=>handleMore(item)}><EditOutlinedIcon /></span></Link></td>
                            
                        </tr>
                   ))}
                </tbody>
           </table>
           </div>
           
        </div>
    )
}
export default UserManage;