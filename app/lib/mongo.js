import mongoose from 'mongoose'

export async function dbConnect() {
    try {
        const conn = await mongoose.connect(String(process.env.MONGO_DB))
        return conn
    } catch (e) {
        throw new Error(e)       
    }
}