import { auth } from '../../auth'

export const GET = async () => {
    const  session  = await auth();
    if (session) {
        return Response.json(session)
    }
    else {
        return Response.json('Not logged in.')
    }
}