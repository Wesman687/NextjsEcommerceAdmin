'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

function EditProduct({params}) {
    const searchParams = useSearchParams()
    const [product, setProduct] = useState([])
    const id = params.id[0]
    async function fetchData(){
      const res = await axios.get('/api/products?id='+id)
      setProduct(res.data)
    }
    useEffect(()=>{
      fetchData()
    },[])
  return (
    <Layout>
      Edit product form
    </Layout>
  )
}

export default EditProduct
