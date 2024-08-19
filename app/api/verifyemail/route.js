import { NextResponse } from 'next/server'
import { dbConnect } from '../../lib/mongo'
import { User } from '../../model/user-model'


export const POST = async (request) => {
    await dbConnect()        
        try {
            const reqbody = await request.json()
        const { token } = reqbody
        const user = await User.findOne({
            verifyToken: token,
        })
        if (!user){
            return NextResponse({error: "invalid Token"}, {status: 400})
        }
        await user.save()
        return new NextResponse("Email has been verified", {
            status: 201,
        })
            
        } catch (error) {
            return new NextResponse("Failed Response", {
                status: 500,
            })
        }
}