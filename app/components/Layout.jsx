'use client'

import Login from "./Login";
import Link from "next/link";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Layout({children}) {
  const router = useRouter()
  const [session, setSession] = useState()
  useEffect(()=>{
    const fetchSession = async () =>{
      const res = await axios.get('/api/user')
      if (res?.data?.user) {
      setSession(res.data.user)
      }
      else {
        router.push('/login')

      }
    }
    fetchSession()
  },[])
  return (
    <>
      <div className="bg-blue-900 min-h-screen w-screen flex font-bold">
        <Nav />      
          <>          
            <div className="bg-white flex-grow mt-5 mb-5 mr-5 rounded-lg p-4 shadow-lg shadow-black ">
              {children}
            </div>
          </>       
      </div>
    </>
  );
}
