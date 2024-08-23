import { User } from "../model/user-model"



export default async function createUser(user) {
    try {
        return await User.create(user)
    } catch (error) {
        console.log(error)
    }
}