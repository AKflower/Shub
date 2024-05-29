"use client"
import styles from './footer.module.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation'; 
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import fonts from '../../../../public/fonts/fonts';

const cx = classNames.bind(styles);

interface User {
    firstName: string,
    lastName: string,
}

const Foot = () => {
    const [user, setUser] = useState<User>();
    const pathname = usePathname()
    const accessToken = Cookies.get('accessToken');
    let bo1, bo2: string
    if(pathname.includes('/setting/userManage/')){
        bo1 = pathname.replace('/setting/userManage/', '')
        bo2 = bo1.slice(0, bo1.indexOf('/'))
    }
    else{
        bo1 = pathname.replace('/setting/org/', '')
        bo2 = bo1.slice(0, bo1.indexOf('/'))
    }
    
    useEffect(() => {
        
        const fetchData = async () => {
            const resU = await axios.get(`http://localhost:3001/user/${bo2}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
            });
            setUser(resU.data)
        }
        if(((pathname.includes('/setting/userManage/user_') || pathname.includes('/setting/org/user_')) && pathname.includes('/view'))) fetchData()
    },[pathname])

    return (
        <>
        {((pathname.includes('/setting/userManage/user_') || pathname.includes('/setting/org/user_')) && pathname.includes('/view'))  ? (<div className={cx('container')}>
            
            <div className={cx('doc', fonts.poppins.className)}>Viewing documents of {user?.firstName} {user?.lastName}</div>

            
        </div>):
        <></>
        }
        </>
    )
}

export default Foot;