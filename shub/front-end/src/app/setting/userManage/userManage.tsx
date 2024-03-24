"use client"
import styles from './userManage.module.scss'
import  fonts  from '../../../../public/fonts/fonts'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Link from 'next/link';
import { useEffect,useState} from 'react';
import axios from 'axios';
// const users= [
//     {
//       user_id: "user_1",
//       FullName: "John Doe",
//       Email: "john.doe@example.com",
//       Role: "Admin",
//       Organization: "Org1",
    
//     },
//     {
//       user_id: "user_2",
//       FullName: "Jane Smith",
//       Email: "jane.smith@example.com",
//       Role: "User",
//       Organization: "Org2",
//     },
//     {
//       user_id: "user_3",
//       FullName: "Michael Johnson",
//       Email: "michael.johnson@example.com",
//       Role: "User",
//       Organization: "Org2",

//     }
//   ]

const UserManage = () => {
  interface User {
    user_id: number,
    email: string,
    fullName: string,
    firstName: string,
    lastName: string,
    role: string,
    organization: string,
  }
  const [users,setUsers]  = useState<User[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3001/user`);
      res.data.forEach((item: User) => {
        item.fullName=item.firstName+' '+item.lastName;
      })
      setUsers(res.data);
  
      console.log(users);
    }
    fetchData();
  }, []
  
  )
    
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
                            <td>{item.fullName}</td>
                            <td className={styles.blue}>{item.email}</td>
                            <td>{item.organization}</td>
                            <td>{item.role}</td>
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