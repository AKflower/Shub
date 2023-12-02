"use client"
import { useParams } from 'next/navigation';
import UserForm from '@/app/components/settings/user/userForm';
import UserDetail from './userDetail';
import Navigation from '../../navigation/navigation';
export default function UserDetailPage () {
    const id = useParams() as { id: string };
    console.log(typeof(id.id))
    
    
    return (
        <>
            <Navigation />
            <UserDetail title={'User '+id.id} />
        </>
        
    )
}