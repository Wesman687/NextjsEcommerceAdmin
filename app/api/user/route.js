import { auth } from '../../auth'
import { dbConnect } from '../../lib/mongo';
import { User } from '../../model/user-model';
import { sendEmail } from '../../utils/mailhelper';

export const GET = async () => {
    const  session  = await auth();
    if (session) {
        return Response.json(session)
    }
    else {
        return Response.json('Not logged in.')
    }
}
export const POST = async(req,res )=>{
    await dbConnect()
    const {id} = await req.json()
    const newUser = await User.findById(id)
    sendEmail({ email: newUser.email, emailType: "VERIFY", userId: id})
    return Response.json('Email Sent')

}