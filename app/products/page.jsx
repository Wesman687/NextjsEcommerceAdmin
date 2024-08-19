'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import axios from 'axios'

function Products() {
  const [products, setProducts] = useState([])
 
  async function fetchData(){
    const res = await axios.get('/api/products')
    setProducts(res.data)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div>
      <Layout>
        <Link href={'/products/new'} className='btn-primary'>Add New Products</Link>
        <table>
          <thead>
            <tr>
              <td>Product Name</td>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </Layout>
    </div>
  )
}

export default Products
