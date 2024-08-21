"use client";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";

function EditProduct({ params }) {
  const route = useRouter();
  const [product, setProduct] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const id = params.id[0];
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/products?id=" + id, {
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

  async function fetchData() {
    const res = await axios.get("/api/products?id=" + id);
    setProduct(res.data.product);
    setPrice(res.data.price);
    setDesc(res.data.desc);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout>
      <form onSubmit={handleUpdate}>
        <h1>Update Product</h1>
        <label htmlFor="">Product Name:</label>
        <input
          type="text"
          onChange={(e) => setProduct(e.target.value)}
          placeholder={product}
          value={product}
          id="product"
          name="product"
        ></input>
        <label htmlFor="">Description:</label>
        <textarea
          name="desc"
          id="desc"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          placeholder={desc}
        ></textarea>
        <label htmlFor="">Price (in USD):</label>
        <input
          type="text"
          id="price"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder={`$${price}`}
        ></input>
        <button className="btn-primary" type="submit">
          Update
        </button>
      </form>
    </Layout>
  );
}

export default EditProduct;
