import mongoose, { model, Schema } from 'mongoose'

const ProductSchema = new Schema({
    product: {type: String, required: true},
    desc: {type: String, required:false},
    price: {type: Number, required: true}
})
export const Product = mongoose.models.product || model('product', ProductSchema)