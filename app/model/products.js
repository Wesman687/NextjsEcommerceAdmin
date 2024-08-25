import mongoose, { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  product: { type: String, required: true },
  desc: { type: String, required: false },
  price: { type: Number, required: true },
  images: [
    {
      link: { type: String },
      public_id: { type: String },
    },
  ],
  category: {type:mongoose.Types.ObjectId, ref: 'category', required:false},
  properties: { type:Object}
},{
  timestamps: true,
});
export const Product =
  mongoose.models.product || model("product", ProductSchema);
