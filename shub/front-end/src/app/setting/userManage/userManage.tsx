import styles from './userManage.module.scss'
import  fonts  from '../../../../public/fonts/fonts'
import classNames from 'classnames/bind'

const users= [
    {
      "Full Name": "John Doe",
      "Email": "john.doe@example.com",
      "Role": "Admin"
    },
    {
      "Full Name": "Jane Smith",
      "Email": "jane.smith@example.com",
      "Role": "User"
    },
    {
      "Full Name": "Michael Johnson",
      "Email": "michael.johnson@example.com",
      "Role": "User"
    }
  ]

const UserManage = () => {
    
    return (
        <div className={styles.container}>
           <h1 className={fonts.poppins.className+' '+styles.header}>User Management</h1>
           <table>
                <thead>
                    <tr>
                        <td>Full Name</td>
                        <td>Email</td>
                        <td>Role</td>

                    </tr>
                </thead>
                <tbody>
                   {users.map((item)=> (
                        <tr></tr>
                   ))}
                </tbody>
           </table>
        </div>
    )
}
export default UserManage;