'use server'

import { auth, signIn, signOut } from "../auth"
import { dbConnect } from "../lib/mongo"
import { Pid } from "../model/pid"


export async function getPid(){
    await dbConnect()
    const result = await Pid.findById('66cfd32bdc0b57274f54c4ce')
    const newPid = result.currentPid + 1
    await Pid.findByIdAndUpdate('66cfd32bdc0b57274f54c4ce',{
        currentPid: newPid
    })

    return newPid
}

export async function doSocialLogin(formData) {
    const action = formData.get('action')
    await signIn(action, { redirectTo: "/home"})
    console.log(action)
}

export async function doLogOut() {
    await signOut({ redirectTo: '/'})
    
}

export async function doCredentialLogin(formData) {
    console.log("credential")
    
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        })
        return response
    
} 

const adminEmails= ['WESMAN687@GMAIL.COM', 'GUEST@GUEST.COM']
export async function isAdminRequest(){
    const session = await auth()
    if (session && adminEmails.includes(session?.user?.email.toUpperCase())){
        return true
    }
    else {
        return false
    }
}