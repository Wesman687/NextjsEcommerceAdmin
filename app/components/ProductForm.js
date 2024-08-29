"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";
import Spinner from '../components/Spinner'
export default function ProductForm({
  _id,
  product: existingProduct,
  desc: existingDesc,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties
}) {
  const router = useRouter();
  const [price, setPrice] = useState(existingPrice || "");
  const [product, setProduct] = useState(existingProduct || "");
  const [images, setImages] = useState(existingImages || []);
  const [productProperties, setProductProperties] = useState(assignedProperties || {})
  const [category, setCategory] = useState(assignedCategory)
  const [desc, setDesc] = useState(existingDesc || "");
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios.get('/api/categories').then(result=>{
      setCategories(result.data)
    })
  }, []);

  async function uploadImages(e) {
    setUploading(true)
    e.preventDefault();
    const files = e.target.files;
    const formData = new FormData();
    if (files?.length > 0) {
      for (const file of files) {
        formData.append("file", file);
      }
      formData.append("upload_preset", "ecommerce");
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );

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
            images,
            category,
            properties: productProperties,
          }),
        });
        router.push("/products");
      } catch (error) {
        throw new Error(console.log(error));
      }
    } else {
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
            images,
            category,
            properties: productProperties
          }),
        });
        router.push("/products");
        setLoading(false)
      } catch (error) {
        throw new Error(console.log(error));
      }
    }
  }
  function setProductProp(propName, value){
    propertiesToFill = []
    setProductProperties(prev => {
      const newProductProps = {...prev}
      newProductProps[propName] = value
      return newProductProps
    })

  }
  function updateImagesOrder(images){
    setImages(images)
  }
  let propertiesToFill = []
  if (categories?.length > 0 && category) {
    let catInfo = categories?.find(({_id}) => _id === category)
    if (catInfo.properties?.length > 0) {
      propertiesToFill.push(...catInfo?.properties)
    }    
    while(catInfo.parent?._id) {
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id)
      propertiesToFill.push(...parentCat?.properties)
      catInfo = parentCat
    }
  }

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
        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="">Uncategorized</option>
          {categories?.length && categories.map(c => (
            <option value={c._id} key={c._id}>{c.name}</option>
          ))}
        </select>
        {categories.length > 0 && propertiesToFill.map((p, index) => (
          <div key={index} className="flex gap-1 flex-col">
            <div className="text-blue-900">{p.name[0].toUpperCase()+p.name.substring(1)}:</div>
            <div className="w-fit">
            <select value={productProperties[p.name]} onChange={(e)=> setProductProp(p.name, e.target.value)}>
              {p.value.map((v, index) => (
                <option key={index} value={v}>{v}</option>
              ))}
            </select>
          </div>
          </div>
        ))}
        <label>Photos</label>
        <div className="mb-2 flex gap-2 flex-wrap">
            <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-">
          {!!images?.length &&
            images.map((item, index) => (
              <>
              <div key={index} className="relative mx-2 bg-white p-2 shadow-sm rounded-sm border-gray-200 flex justify-center">
                <img src={item.link} alt="" className="h-24 max-w-24  overflow-hidden rounded-sm hover:scale-125 cursor-pointer"></img>

                
              </div>
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
            </>
            ))}
            </ReactSortable>
          {uploading ? <div className="h-24 p-1 bg-gray-200 flex items-center rounded-md"><Spinner /></div> : 
          <label className="cursor-pointer   gap-1 text-gray-500 rounded-md bg-white p-4 shadow-sm border-gray-200">
            <div className=" w-24 h-24 items-center text-center justify-center flex">
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
            </div>
          </label> }         
        
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
