import React from 'react'
import { doLogOut } from '../actions'

export default function Logout() {
  return (
    <form action={doLogOut}>
        <button
        className='bg-red-500 my-2 text-white p-1 rounded'
        type='submit'
        >
        Logout
        </button>
      
    </form>
  )
}
