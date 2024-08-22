import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { User } from './model/user-model'

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (credentials === null) return null
                try {
                    const user = await User.findOne({
                        email: credentials?.email
                    })
                    
                    if (user){
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        )
                        if (isMatch){
                            return user
                        } 
                        else {
                            throw new Error("Check your password")
                        }
                        
                    }   else {
                        throw new Error("User not Found")
                    }
                }
                catch(error) {

                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        })
    ], 
    callbacks: {
        jwt: ({token, account,profile}) => {
            console.log({token, account,profile})
            return token
        }
    }
})

