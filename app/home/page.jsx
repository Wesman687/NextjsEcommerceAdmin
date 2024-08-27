'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Home() {
    const router = useRouter()
    useEffect(()=>{
        router.push('/')
    },[])
  return (
    <div>
      
    </div>
  )
}
