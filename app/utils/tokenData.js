import jwt from 'jsonwebtoken'

export const TokenData = (request) => {
    try {
        const token = request.cookies.get("token")?.value || ""

        const decodeToken = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET)
        
    } catch (error) {
        throw new Error(error.message)
    }
}