import { NextResponse } from "next/server";
import { createCategory } from "../../queries/category";
import { Category } from "../../model/category";



export const POST = async (req, res) => {
    const { name, parentCategory } = await req.json();

  
    
      console.log(name, "checking if update works")
        const response = await createCategory({name, parentCategory })
        throw new NextResponse("Product has been updated", {
          status: 201,
        });
      
}

export const GET = async (req, res) => {

  const categories = (await Category.find())
  return Response.json(categories)
}