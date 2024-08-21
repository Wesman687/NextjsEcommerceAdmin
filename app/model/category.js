import mongoose, { model, Schema } from 'mongoose'

const CategorySchema = new Schema({
    name: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, required: false}
})

export const Category = mongoose.models.category || model('category', CategorySchema)