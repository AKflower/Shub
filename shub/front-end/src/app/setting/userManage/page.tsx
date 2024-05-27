"use client"
import { useShub } from '@/app/Provider/Provider'
import UserManage from './userManage'
import { useEffect,useState} from 'react';

export default function UserManagePage () {
    const [permissionIds, setPermissionIds] = useState<string[]>([]);
    const {sessionInfo} = useShub();

    useEffect(() => {
        if (sessionInfo && sessionInfo.permissionIds) {
            setPermissionIds(sessionInfo.permissionIds);
        }
    }, [sessionInfo]);

    return permissionIds ? <UserManage permissionIds={permissionIds}/> : null;
}