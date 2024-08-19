'use client'
import React, { useState } from 'react'
import SocialLogin from './SocialLogin'
import { doCredentialLogin } from '../actions'
import  { useRouter } from 'next/navigation'
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const router = useRouter()
    async function handleFormSubmit(event){
        event.preventDefault()
        const formData = new FormData()
        formData.append("email", email)
        formData.append('password', password)
        if (email && password) {
        try {           
            const response = await doCredentialLogin(formData)
            if (!!response.error) {
                setError(response.error.message)
            } else {                
                router.push('/')
            }

        } catch (error) {
            console.log(error.message)
            setError("Check your Credentials")
        }
    }
    else {
        setError("Check your Credentials")
    }
    }
  return (
    <>
    <div className='text-xl text-red-500'>{error}</div>
    <form className='text-white my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md w-fit'
    onSubmit={handleFormSubmit}>
    <div className='my-2'>
        <label htmlFor="email">Email Address</label>
        <input className='border mx-2 border-grey-500 rounded text-black focus:text-black focus-within:text-black placeholder:text-black ' 
         type='email' id='email' value={email} onChange={(event)=>setEmail(event.target.value)}/>
    </div>
    <div>
        <label htmlFor="password">Password</label>
        <input className='border mx-2 border-gray-500 rounded ml-10 text-black focus:text-black focus-within:text-black placeholder:text-black'
        type="password" name='password' id='password' value={password} onChange={(event)=>setPassword(event.target.value)} />
    </div>
    <button type='submit' className='bg-orange-300 mt-4 rounded flex justify-center items-center w-36'>Login</button>
    </form>
    <SocialLogin />
    </>
  )
}
