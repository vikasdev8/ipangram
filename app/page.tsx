"use client"
import { useEffect } from "react";
import {useSession} from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function Home() {
  const {status} = useSession();
  const router = useRouter();
  useEffect(()=>{
    if(status === "authenticated"){
        router.push('/dashboard')
    }else{
      router.push('/login')
    }
  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        
    </main>
  )
}
