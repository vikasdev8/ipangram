"use client"

import { StickyNavbar } from '@app/_components/Navbar';
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function LogInForm() {
    const router = useRouter()
    const {status,data} = useSession();

    useEffect(()=>{
        if(status === 'authenticated'){
            console.log(data)
        }
        if(status === "unauthenticated"){
            router.push('/login')
        }
    },[status])
  return (
    <>
      <StickyNavbar/>
    </>
  );
}