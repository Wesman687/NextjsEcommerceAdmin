"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Spinner from '../components/Spinner'
export default function ProductForm({
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
  const [desc, setDesc] = useState(existingDesc || "");
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  async function uploadImages(e) {
    setUploading(true)
    e.preventDefault();
    const files = e.target.files;
    const formData = new FormData();
    console.log("starting");
    if (files?.length > 0) {
      for (const file of files) {
        formData.append("file", file);
      }
      formData.append("upload_preset", "ecommerce");
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );

      console.log(res.data.secure_url, res.data.public_id, "response");
      setImages((oldImages) => {
        return [
          ...oldImages,
          { link: res.data.secure_url, public_id: res.data.public_id },
        ];
      });
    }
    setUploading(false)
  }
  async function removeImage(index, public_id) {
    setImages(images.splice(index, 1));
  }

  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault();
    if (_id) {
      e.preventDefault();
      try {
        const response = await fetch("/api/products?id=" + _id, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            product,
            desc,
            price,
            images
          }),
        });
        router.push("/products");
      } catch (error) {
        throw new Error(console.log(error));
      }
    } else {
        console.log('adding')
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
            images
          }),
        });
        router.push("/products");
        setLoading(false)
      } catch (error) {
        throw new Error(console.log(error));
      }
    }
  }

  useEffect(() => {}, []);
  return (
    <>
      {loading ? <Spinner /> : 
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Product Name:</label>
        <input
          type="text"
          id="product"
          name="product"
          value={product}
          placeholder="new product"
          onChange={(e) => setProduct(e.target.value)}
        ></input>
        <label htmlFor="Phtoos"></label>
        <div className="mb-2 flex gap-2 flex-wrap">
          {!!images?.length &&
            images.map((item, index) => (
              <div key={index} className="relative px-2">
                <img src={item.link} className="h-24 max-w-24 rounded-md"></img>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 absolute top-0 text-red-600 cursor-pointer"
                  onClick={() => removeImage(index, item.public_id)}
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
              className="size-6 text-center pr-2"
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
        {uploading && (<Spinner /> )}
        </div>
        
        <label htmlFor="">Description:</label>
        <textarea
          name="desc"
          id="desc"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          placeholder="description"
        ></textarea>
        <label htmlFor="">Price (in USD):</label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>}
    </>
  );
}
