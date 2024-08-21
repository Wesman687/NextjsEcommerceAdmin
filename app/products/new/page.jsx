"use client";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/navigation";
import axios from "axios";
function NewProducts({
  _id,
  product: existingProduct,
  desc: existingDesc,
  price: existingPrice,
  images: existingImages,
}) {
  const router = useRouter();
  const [price, setPrice] = useState(existingPrice || "");
  const [product, setProduct] = useState(existingProduct || "");
  const [images, setImages] = useState(existingImages || []);

  async function uploadImages(e) {
    e.preventDefault()
    const files = e.target.files;
    const formData = new FormData();
    console.log('starting')
    if (files?.length > 0) {
      for (const file of files) {
        formData.append("file", file);
      }
      formData.append("upload_preset", "ecommerce");
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );
      
      console.log(res.data.secure_url, res.data.public_id, 'response');
      setImages((oldImages) => {
        return [...oldImages,{ link: res.data.secure_url, public_id: res.data.public_id}];
      });
    }
  }
  async function removeImage(index, public_id) {
    console.log('removing', public_id, images)
    const formData = new FormData()
    formData.append('public_id', public_id)
    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/destroy`,
        formData
      );
    setImages(images.splice(index, 1))
    console.log('removed')
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    const product = formData.get("product");
    const desc = formData.get("desc");
    const price = formData.get("price");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          product,
          desc,
          price,
        }),
      });
      router.push("/products");
    } catch (error) {
      throw new Error(console.log(error));
    }
  }
  useEffect(() => {}, []);
  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <h1>New Product</h1>
          <label htmlFor="">Product Name:</label>
          <input
            type="text"
            id="product"
            name="product"
            placeholder="new product"
          ></input>
          <label htmlFor="Phtoos"></label>
          <div className="mb-2 flex gap-2 flex-wrap">
          {!!images?.length && images.map((item, index) => (
                <div key={index} className="relative px-2">
                  <img src={item.link} className="h-24 max-w-24 rounded-md"></img>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 absolute top-0 text-red-600 cursor-pointer"
                    onClick={()=>removeImage(index, item.public_id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              ))}

            <label className="cursor-pointer w-24 h-24 flex items-center text-center justify-center gap-1 text-gray-500 rounded-md bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
              <div>Upload</div>
              <input
                type="file"
                name="file"
                onChange={uploadImages}
                className="hidden"
              />
            </label>
            {!images.length && <div>No photos in this products.</div>}
          </div>
          <label htmlFor="">Description:</label>
          <textarea name="desc" id="desc" placeholder="description"></textarea>
          <label htmlFor="">Price (in USD):</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="price"
          ></input>
          <button className="btn-primary" type="submit">
            Save
          </button>
        </form>
      </Layout>
    </>
  );
}

export default NewProducts;
