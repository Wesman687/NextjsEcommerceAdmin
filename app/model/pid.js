import mongoose, { model, Schema } from 'mongoose'

const PidSchema = new Schema({
    currentPid: {type: Number, required: true},
})

export const Pid = mongoose.models.pid || model('pid', PidSchema)