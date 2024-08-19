'use client'
import Layout from '../../components/Layout'
import { redirect, useRouter } from 'next/navigation'
function NewProducts() {
    const router = useRouter()
    
   async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const product = formData.get('product')
        const desc = formData.get('desc')
        const price = formData.get('price')
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'content-type': "application/json",
                },
                body: JSON.stringify({
                    product,
                    desc,
                    price
                })
            })  
            router.push('/products')          
        } catch (error) {
            throw new Error(console.log(error))
        }
        
    }
  return (
    <>
    <Layout>
        <form onSubmit={handleSubmit}>
        <h1>New Product</h1>
        <label htmlFor="">Product Name:</label>
      <input type="text" id='product' name='product' placeholder='new product'></input>
      <label htmlFor="">Description:</label>
      <textarea name="desc" id='desc'  placeholder='description'></textarea>
      <label htmlFor="">Price (in USD):</label>
      <input type="text" id='price' name='price' placeholder='price'></input>
      <button className='btn-primary' type='submit' >Save</button>
      </form>
    </Layout>
    </>
  )
}

export default NewProducts
