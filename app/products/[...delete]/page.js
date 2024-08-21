'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/navigation'
import axios from 'axios'

function DeleteProduct({params}) {
  const [product, setProduct] = useState([])
  const router = useRouter()  
  const id = params.delete[1]
  async function deleteProduct(e){
    e.preventDefault()
    await axios.delete('/api/products?id='+id)
    router.push('/products')
  }

  useEffect(()=>{
    if (!id){
      return
    }
    axios.get('/api/products?id='+id).then(response=>{
      setProduct(response.data)
    })
  },[])
  return (
    <Layout>
        <h1 className='text-center'>Do you really want to delete <span className='text-red-500'>{product.product}</span>?</h1>
        <div className='flex gap-2 justify-center'>
        <button className='btn-red' onClick={(e)=> deleteProduct(e)}>Yes</button>
        <button className='btn-default' onClick={()=>router.push('/products')}>No</button>
        </div>
    </Layout>
  )
}

export default DeleteProduct
