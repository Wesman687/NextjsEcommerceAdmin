'use server'

import { auth, signIn, signOut } from "../auth"


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