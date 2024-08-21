import { NextResponse } from "next/server";
import { createProduct, updateProduct } from "../../queries/product";
import { Product } from "../../model/products";

export const POST = async (request, res) => {
  const { product, desc, price, images, category } = await request.json();
  const url = request.nextUrl.searchParams
  const id = url.get('id')
  console.log('is this working?')
  
    if (id) {
      console.log(product, desc, price, images, category, "checking if update works")
        const response = await updateProduct({id, product, desc, price, images, category })
        throw new NextResponse("Product has been updated", {
          status: 201,
        });
      }
      
      else {
        console.log(product, desc, price, images, category, "checking if post works")
        await createProduct({ product, desc, price, images, category });
        throw new NextResponse("Product has been created", {
          status: 201,
        });
      } 
  

};

export const GET = async (request, res) => {
    const url = request.nextUrl.searchParams
    const id = url.get('id')
    try {
        if (id){
            const products = (await Product.findOne({_id: id}))
            return Response.json(products)
        }
        else {
            const products = (await Product.find())
          return Response.json(products)
    
        }
        
    } catch (error) {
        return Response.json(error)
    }
    
};

export const DELETE = async (req, res) => {    
    const url = req.nextUrl.searchParams
    const id = url.get('id')
    try {
        await Product.deleteOne({_id: id})
    return Response.json("Product Deleted")
        
    } catch (error) {
        return Response.json(error)
    }
    
}
