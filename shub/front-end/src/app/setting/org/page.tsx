"use client"
import { useShub } from '@/app/Provider/Provider'
import Org from './org'
import { useEffect,useState} from 'react';

export default function UserManagePage () {
    const [role, setRole] = useState(null);
    const {sessionInfo} = useShub();

    useEffect(() => {
        if (sessionInfo && sessionInfo.role) {
            setRole(sessionInfo.role);
        }
    }, [sessionInfo]);

    return role ? <Org role={role}/> : null;
}