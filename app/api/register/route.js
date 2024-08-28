import { NextResponse } from "next/server"
import { dbConnect } from '../../lib/mongo'
import bcrypt from 'bcryptjs'
import { sendEmail } from "../../utils/mailhelper"
import createUser from '../../queries/user'

export const POST = async (request) => {
    const { name, email, password } = await request.json()
    // Create a db connection
    await dbConnect()
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 5)
    //form a db payload
    const newUser = {
        name, password: hashedPassword, email
    }
    //update the db
    const savedUser = await createUser(newUser)
    console.log('sending email from register')
    sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
    return Response.json({
        status: 201,
        email: email,
        uid: savedUser._id
    })
}