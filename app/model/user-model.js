import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
        unique: true
    },
    email: {
        required: true,
        type: String,
    },
    isVerified: {
        required: true,
        type: Boolean,
        default: false,
    },
    isAdmin: {
        required: true,
        type: Boolean,
        default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
})

export const User = mongoose.models.users || mongoose.model('users', userSchema) 