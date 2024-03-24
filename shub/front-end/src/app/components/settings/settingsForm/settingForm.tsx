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


type User = {
  user_id: string,
  email:string,
  firstName: string,
  lastName: string,
}    
const SettingsForm = ({actionBy,userAffected,isAddNew} : {actionBy: string,userAffected?:User | null,isAddNew?: boolean}) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [password,setPassword] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [firstName,setFirstName] = useState<string>("");
  const [lastName,setLastName] = useState<string>("");
  useEffect(() => {
    console.log('test: ', errorEmail);
  }, [errorEmail]);
  
  const handleSubmit = (event : any) => {
    event.preventDefault();
    setIsSaving(true);
    console.log(email,password,firstName,lastName);
     const newUser = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
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
    const roles = [
        "Admin","User"
    ]
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
            
            <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16 mt-1">
                <Input label='First name' type='text' value={user.firstName} />
                <Input label='Last name' type='text' value={user.lastName} />
                <Input label='Email' type='email' value={user.email} />
                <Input label='Password' type='password' value={encryptPassword} changePossible={true}/>
                <Select label='Role' list={roles}/>
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16 mt-1">
                <Select label='Themes' list={themes}/>

            </div>
            
            {/* <div className={styles.buttonContainer}>
                <Button1 name='Cancel' type=''/>
                <Button1 name='Save' type='success'/>
                
            </div> */}
        </form>
    )
  }
  else if (actionBy==='admin') {

    if (isAddNew) {
      //Add new user
      return (
        <form action="" className={fonts.poppins.className}>
                
        <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16 mt-1">
            <Input label='First name' type='text' isDisabled={false} value={firstName} onChange={setFirstName} isProcessing={isSaving}/>
            <Input label='Last name' type='text' isDisabled={false} value={lastName} onChange={setLastName} isProcessing={isSaving}/>
            <Input label='Email' type='email' isDisabled={false} value={email} onChange={setEmail} isError={errorEmail} isProcessing={isSaving}/>
            <Input label='Password' type='password' isDisabled={false} value={password} onChange={setPassword} isProcessing={isSaving}/>
            <Select label='Role' list={roles}/>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16 mt-1">
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
           
     
        
    </form>
      )
    } else {
      return (
        //Modify user
        <form action="" className={fonts.poppins.className}>
                
        <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16 mt-1">
            <Input label='First name' type='text' value={userAffected?.firstName}/>
            <Input label='Last name' type='text' value={userAffected?.lastName}/>
            <Input label='Email' type='email' value={userAffected?.email} />
            <Input label='Password' type='password' value={encryptPassword} changePossible={true}/>
            <Select label='Role' list={roles}/>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-2 pr-16 mt-1">
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