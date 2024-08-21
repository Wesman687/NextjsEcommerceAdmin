"use client";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import axios from "axios";
import ProductInfo from '../../../components/ProductForm'

function EditProduct({ params }) {
  const [productInfo, setProductInfo] = useState(null)
  const id = params.id[0];

  async function fetchData() {
    const res = await axios.get("/api/products?id=" + id);
    setProductInfo(res.data)
  }
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <Layout>
      <h1>Edit Product</h1>
      {productInfo && <ProductInfo {...productInfo} />}
    </Layout>
  );
}

export default EditProduct;
