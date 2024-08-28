
import { createCategory } from "../../queries/category";
import { Category } from "../../model/category";
import { isAdminRequest } from "../../actions";
import { dbConnect } from "../../lib/mongo";

export const POST = async (req, res) => {  
  const adminRequest = await isAdminRequest()
  if (!adminRequest) {
    throw 'not an admin'
  }
  const { name, parentCategory, properties } = await req.json();

  console.log(name, parentCategory, properties);

  const response = await createCategory({name, parentCategory, properties});
  return Response.json("Updated Sucessfully");
};

export const GET = async (req, res) => {
  await dbConnect()
  const adminRequest = await isAdminRequest()
  if (!adminRequest) {
    throw 'not an admin'
  }
  const categories = await Category.find().populate("parent");
  return Response.json(categories);
};

export const PUT = async (req, res) => {
  await dbConnect()
  const adminRequest = await isAdminRequest()
  if (!adminRequest) {
    throw 'not an admin'
  }
  const { name, parentCategory, properties, _id } = await req.json();
  console.log(name, parentCategory, properties, _id);
  const response = await Category.findByIdAndUpdate(
    { _id },
    {
      name,
      parent: parentCategory || undefined, 
      properties     
    },
  );
  return Response.json('ok');
};

export const DELETE = async (req, res) => {  
  await dbConnect()
  const adminRequest = await isAdminRequest()
  if (!adminRequest) {
    throw 'not an admin'
  }
  const url = req.nextUrl.searchParams
  console.log(url)
  const _id = url.get('_id')
  await Category.deleteOne({_id})
  return Response.json("ok")

}