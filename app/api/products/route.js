import { NextResponse } from "next/server";
import { createProduct } from "../../queries/product";
import { Product } from "../../model/products";

export const POST = async (request, res) => {
  const { product, desc, price } = await request.json();
  const { method } = request;

  if (method === "POST") {
    await createProduct({ product, desc, price });
  }

  throw new NextResponse("User has been created", {
    status: 201,
  });
};

export const GET = async (request, res) => {
    const products = (await Product.find())
  return Response.json(products)
};
