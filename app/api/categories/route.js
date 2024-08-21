
import { createCategory } from "../../queries/category";
import { Category } from "../../model/category";

export const POST = async (req, res) => {
  const { name, parentCategory } = await req.json();

  console.log(name, parentCategory);

  const response = await createCategory(name, parentCategory || undefined);
  return Response.json("Updated Sucessfully");
};

export const GET = async (req, res) => {
  const categories = await Category.find().populate("parent");
  return Response.json(categories);
};

export const PUT = async (req, res) => {
  const { name, parentCategory, _id } = await req.json();
  console.log(name, parentCategory, _id);
  const response = await Category.findByIdAndUpdate(
    { _id },
    {
      name,
      parent: parentCategory,
    }
  );
};

export const DELETE = async (req, res) => {  
  const url = req.nextUrl.searchParams
  console.log(url)
  const _id = url.get('_id')
  await Category.deleteOne({_id})
  return Response.json("ok")

}