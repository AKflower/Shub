"use client"
import styles from './org.module.scss'
import  fonts  from '../../../../public/fonts/fonts'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Link from 'next/link';
import { useEffect,useState} from 'react';
import axios from 'axios';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Cookies from 'js-cookie';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useShub } from '@/app/Provider/Provider';
import { useRouter } from 'next/navigation';
import AccessDenied from '@/app/components/accessDenied/accessDenied';

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

const Org = ({role}:{role:string}) => {
  interface User {
    user_id: string,
    email: string,
    fullName: string,
    firstName: string,
    lastName: string,
    role: string,
    organization: string,
    isActive: boolean,
    isFirstAccess: boolean,
  }

  const { handleView } = useShub();

  const [reload,setReload] = useState(false)
  const [isSaving,setIsSaving] = useState(false)
  const [users,setUsers]  = useState<User[]>([])
  const userId = Cookies.get('userId');
  const router = useRouter()
  
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
  }, [reload]
  )
  const accessToken = Cookies.get('accessToken');
    const changeActive = (user: User) => {
      const data={
        user_id: user.user_id,
        isActive: !user.isActive
      }
      console.log(data);
      setIsSaving(true);
      axios.put(`http://localhost:3001/user/changeStatus`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`, 
                },
              })
              .then(response => {
                toast.success('Successfully!', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                  });
            
                    
                  
                setReload(!reload)
                setIsSaving(false);
              })
              .catch(error => {
                console.error('Error change status:', error);
                toast.error('Error change status of user', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                  });
                setIsSaving(false);
              });
      
    }
    const [more,setMore] = useState(false)
    const handleMore = (item:any) => {
        // setMore(!more);
        
        item.check= !item.check;
    }
    const dis = false
    return (
      <>
      { role !=="role_1" ?
       <div className={fonts.poppins.className+' '+styles.container}>
           <div className={styles.headerContainer}>
              <h1 className={styles.header}>Organization</h1>
           </div>
           
           <div className={styles.tableContainer}>
           <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <td>Full Name</td>
                        <td>Email</td>
                        <td>Organization</td>
                        <td>Role</td>
                        <td style={{textAlign: 'center'}}>Action</td>
                    </tr>
                </thead>
                <tbody>
                   {users.map((item)=> (
                        <tr>
                            <td>{item.fullName}</td>
                            <td className={styles.blue}>{item.email}</td>
                            <td>Computer Science and Engineer</td>
                            <td>{item.role}</td>
                            <td className={styles.action}>
                              {item.user_id != userId &&(<Link onClick={() => handleView(item.user_id)} href={`/setting/org/${item.user_id}/view`}>{dis ? (<div  className={styles.viewD}><img  src='/viewD.svg'></img></div>) : (<div className={styles.view}><img  src='/view.svg'></img></div>)}</Link>)}
                            </td>
                            
                        </tr>
                   ))}
                </tbody>
           </table>
           </div>
           <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition= {Bounce}
            />
        </div>
          :
          <AccessDenied />       }
        </>
    )
}
export default Org;