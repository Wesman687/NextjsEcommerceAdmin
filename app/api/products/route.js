import { NextResponse } from "next/server";
import { Product } from "../../model/products";
import { getPid, isAdminRequest } from "../../actions";
import { dbConnect } from "../../lib/mongo";

export const POST = async (request, res) => {
  await dbConnect()
  const adminRequest = await isAdminRequest()
  if (!adminRequest) {
    throw 'not an admin'
  }
  const { product, desc, price, images, category, properties} = await request.json();
  const url = request.nextUrl.searchParams
  const id = url.get('id')
  
    if (id) {
      console.log(id, product, desc, price, images, category, properties, "checking if update works")
        const response = await Product.findByIdAndUpdate(id, {product, desc, price, images, category  , properties})
        throw new NextResponse("Product has been updated", {
          status: 201,
        });
      }
      
      else {
        console.log(product, desc, price, images, category, properties, "checking if post works")
        const productPid = await getPid()
        console.log(productPid, 'PRODUCT PID')
        await Product.create({ product, desc, price, images, category, properties, pid: productPid});
        throw new NextResponse("Product has been created", {
          status: 201,
        });
      } 
  

};

export const GET = async (request, res) => {
  await dbConnect()
  const adminRequest = await isAdminRequest()
  if (!adminRequest) {
    throw 'not an admin'
  }
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
  const adminRequest = await isAdminRequest()
  if (!adminRequest) {
    throw 'not an admin'
  }  
    const url = req.nextUrl.searchParams
    const id = url.get('id')
    try {
        await Product.deleteOne({_id: id})
    return Response.json("Product Deleted")
        
    } catch (error) {
        return Response.json(error)
    }
    
}
