"use client"
import styles from './settingForm.module.scss';
import Input from '../../input/input';
import Button1 from '../../button/button1';
import { useState, useEffect } from 'react';
import Select from '../../select/select';
import fonts from '../../../../../public/fonts/fonts';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { error } from 'console';
import { useShub } from '@/app/Provider/Provider';

type User = {
  user_id: string,
  email:string,
  firstName: string,
  lastName: string,
}    

const SettingsForm = ({actionBy,userAffected,isAddNew} : {actionBy: string,userAffected?:User | null,isAddNew?: boolean}) => {
  const router = useRouter();
  const {sessionInfo}=useShub()

  const [selectedOrgId, setSelectedOrgId] = useState('Org1');
  const [isSaving, setIsSaving] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorFirstName,setErrorFirstName] = useState(false);
  const [errorLastName,setErrorLastName] = useState(false);
  const [password,setPassword] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [firstName,setFirstName] = useState<string>("");
  const [lastName,setLastName] = useState<string>("");
  const [role,setRole] = useState<string>("");
  useEffect(() => {
    console.log('test: ', errorEmail);
  }, [errorEmail]);
  useEffect(() => {
    if (errorEmail) setErrorEmail(false)
    
    
  },[email])
  useEffect(() => {
    if (errorFirstName) setErrorFirstName(false)
  },[firstName])
  useEffect(() => {
    if (errorLastName) setErrorLastName(false)
  },[lastName])
  const handleSubmit = (event : any) => {
    event.preventDefault();
    setIsSaving(true);
    console.log(email,password,firstName,lastName);
    if (email==='' || firstName==='' || lastName === '') {
      if (email==='') setErrorEmail(true);
      if (firstName==='') setErrorFirstName(true);
      if (lastName==='') setErrorLastName(true);
      toast.error(`You must fill in all the fields above!`, {
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
      return;      
    }
    console.log(role);
     const newUser = {
        email: email,
        password: email,
        firstName: firstName,
        lastName: lastName,
        role: role,
        organization: selectedOrgId
     }
     axios.post(`http://localhost:3001/user/new`, newUser,{
              
          })
          .then(response => {
            console.log('Res:', response)
            toast.success('User has been created!', {
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
              setPassword('');
              setEmail('');
              setFirstName('');
              setLastName('');
              setErrorEmail(false);
              setRole('')
              setIsSaving(false)

          })
          .catch(error => {
              console.error('Error creating user:', error);
              setErrorEmail(true);
              
              toast.error(`${email} already exists!`, {
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
  const handleCancel = (event:any) => {
    event.preventDefault();
    router.push('/setting/userManage');
  }


    const [user, setUser] = useState<User | null >(null);

    const orgs= [
      {
          id: "Org1",
          name: "Khoa Máy Tính"
      },
      {
          id: "Org2",
          name: "Phòng đào tạo"
      },
      {
          id: "Org3",
          name: "Phòng CTCTSV"
      }
  ]
  interface Role {
    role_id: string;
    idInt: number;
    level: number;
    role_name: string;
    role_type: number;
    role_organization: string;
  }
  const [roles,setRoles] = useState<Role[]>([])
  const [rolesName,setRolesName] = useState<string[]>([])

  const fetchData = async () => {
      const params = {
          role_organization: selectedOrgId,
      }
      const res = await axios.get(`http://localhost:3001/role/org`,{ params});
      
      var roleName: string [] = []
      
      res.data.forEach((item: Role) => {
        roleName.push(item.role_name);
      })
      setRolesName(roleName)
      
      setRoles(res.data);
      setRole(res.data[0].role_id)
    }
  useEffect(() => {
      
      fetchData();
    }, [selectedOrgId]
    )
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrgId(event.target.value);
  };

  const handleChangeRole =  (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    setRole(event.target.value);
    
  }
    const themes = [
        "Light", "Dark"
    ]
  
  // Lấy thông tin người dùng từ localStorage khi component được render
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  // Password giả chỉ dùng để hiển thị
  const encryptPassword = ' '.repeat(8)
  // Nếu user không null, hiển thị thông tin người dùng
  if (actionBy==='user' && user) {
    console.log(user);

  return ( 
        <form action="" className={fonts.poppins.className}>
            <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16 mt-1" style={{display:'grid'}}>
                <Input label='First name' type='text' value={user.firstName} />
                <Input label='Last name' type='text' value={user.lastName} />
                <Input label='Email' type='email' value={user.email} />
                <Input label='Password' type='password' value={encryptPassword} changePossible={true} user_id={user.user_id}/> 
                <Input label='Role' type='text' value={sessionInfo.role_name}/> 
            </div>
        </form>
    )
  }
  else if (actionBy==='admin') {

    if (isAddNew) {
      //Add new user
      return (
        <>
          {sessionInfo && <form action="" className={fonts.poppins.className}>
                

                <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16 mt-1" style={{display:'grid'}}>
                    <Input label='First name' type='text' isDisabled={false} value={firstName} onChange={setFirstName} isError={errorFirstName} isProcessing={isSaving}/>
                    <Input label='Last name' type='text' isDisabled={false} value={lastName} onChange={setLastName} isError={errorLastName} isProcessing={isSaving}/>
                    <Input label='Email' type='email' isDisabled={false} value={email} onChange={setEmail} isError={errorEmail} isProcessing={isSaving}/>
                    <Input label='Password' type='password' isDisabled={true} value={email} onChange={setPassword} isProcessing={isSaving}/>
                    {<div style={{display:'flex',flexDirection:'column'}}>
                      <label htmlFor="" className="" style={{    fontSize: '0.8rem',color: '#546E7A'}}>Organization</label>  
                      <select value={selectedOrgId} onChange={handleChange} style={{padding:'.5em',borderRadius: '10px',boxShadow: '1px 1px 2px silver',width: '80%',background: !sessionInfo.permissionIds.includes('permission_1') ? '#f7f7f7' : 'white'}} disabled={!sessionInfo.permissionIds.includes('permission_1')}>
                            {orgs.map((org) => (
                            <option key={org.id} value={org.id}>
                                {org.name}
                            </option>
                        ))}
                      </select>
                    </div>}
                    <div style={{display:'flex',flexDirection:'column'}}>
                      <label htmlFor="" className="" style={{    fontSize: '0.8rem',color: '#546E7A'}}>Role</label>  
                      <select value={role} onChange={handleChangeRole} style={{padding:'.5em',borderRadius: '10px',boxShadow: '1px 1px 2px silver',width: '80%'}} >
                            {roles.map((role) => (
                            <option key={role.role_id} value={role.role_id}>
                                {role.role_name}
                            </option>
                        ))}
                      </select>
                    </div>
        
                </div>
                <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16 mt-1" style={{display:'grid'}}>
                    <Select label='Themes' list={themes}/>
            
                </div>
                
                <div className={styles.buttonContainer}>
                    <Button1 name='Cancel' type='' onClick={handleCancel} isDisabled={isSaving}/>
                    <Button1 name='Save' type='success' onClick={handleSubmit} isDisabled={isSaving}/>
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
                   
             
                
            </form>}
        </>
        
      )
    } else {
      return (
        //Modify user
        <form action="" className={fonts.poppins.className}>
                

        <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16 mt-1" style={{display:'grid'}}>
         
            <Input label='First name' type='text' value={userAffected?.firstName}/>
            <Input label='Last name' type='text' value={userAffected?.lastName}/>
            <Input label='Email' type='email' value={userAffected?.email} />
            <Input label='Password' type='password' value={encryptPassword} changePossible={true} user_id={userAffected?.user_id}/>
            <Select label='Role' list={rolesName}/>
        </div>

        <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16 mt-1" style={{display:'grid'}}>
            <Select label='Themes' list={themes}/>
    
        </div>
        
        <div className={styles.buttonContainer}>
            <Button1 name='Cancel' type='' isDisabled={isSaving}/>
            <Button1 name='Save' type='success' isDisabled={isSaving}/>
        </div>
           
     
        
    </form>
      )
    }
  }
  else return (
    <><h1 className="">Error</h1></>
  )
}
export default SettingsForm;