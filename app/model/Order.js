

import mongoose, { model, Schema } from "mongoose";

const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    city: String,
    email: String,
    postal: String,
    address: String,
    state: String,
    country: String,
    paid:Boolean,
    paidDate: Date,
    total: String
}, {
    timestamps: true,
})

export const Order =  mongoose.models?.Order || model('Order', OrderSchema)