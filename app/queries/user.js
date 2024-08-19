import { User } from "@/model/user-modal"



export async function createUser(user) {
    try {
        return await User.create(user)
    } catch (error) {
        console.log(error)
    }
}