"use client"
import { useShub } from '@/app/Provider/Provider'
import UserManage from './userManage'
import { useEffect,useState} from 'react';

export default function UserManagePage () {
    const [role, setRole] = useState(null);
    const {sessionInfo} = useShub();

    useEffect(() => {
        if (sessionInfo && sessionInfo.role) {
            setRole(sessionInfo.role);
        }
    }, [sessionInfo]);

    return role ? <UserManage role={role}/> : null;
}