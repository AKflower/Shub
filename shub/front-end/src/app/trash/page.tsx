"use client"
import { useEffect } from "react"
import Trash from "./trash";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export default function FilePage () {

  const router = useRouter();
  const accessToken = Cookies.get('accessToken');

    useEffect(() => {
        if(!accessToken){
            router.push('/');
        }
    },[accessToken])

    return (
        
        <div className="">
            <Trash />
        </div>
    )
}