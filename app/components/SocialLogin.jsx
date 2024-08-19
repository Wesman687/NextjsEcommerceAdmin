import React from 'react'
import { doSocialLogin } from '../actions'

export default function SocialLogin() {
  return (
    <div>
      <form action={doSocialLogin}>
        <button className='bg-pink-400 text-white p-1 rounded-md m-1 text-lg' type='submit' name='action' value='google'>
            Sign in With Google
        </button>
        <button className='bg-black text-white p-1 rounded-md m-1 text-lg' type='submit' name='action' value='github'>
            Sign in With Github
        </button>
      </form>
    </div>
  )
}
