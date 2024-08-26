'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

export default function OrderPage() {
    const [orders, setOrders] = useState([])
    console.log(orders)
    useEffect(()=>{
            axios.get('/api/orders').then(res =>{
                setOrders(res.data)
            })
    },[])

  return (
    <Layout>
      <h1>Orders</h1>
      <table className='basic'>
        <th className='text-xl'>Date</th>
        <th className='text-xl'>Recipient</th>
        <th className='text-xl'>Products</th>
      <tbody>
        {orders?.length > 0 && orders?.map((order)=>(
            <tr key={order._id}>
               <td>{(new Date(order.createdAt)).toLocaleString()}<br /> Total: ${order.total}</td>
               <td className=' '>{order.name}<br />
               {order.email}<br />
               {order.city} {order.state}<br />
               {order.address}<br />
               {order.postal}
               </td>
               {order.line_items.map((product)=> (
                    <td className='text-right'>
                        {product?.price_data?.product_data?.name}<br />     Quantity: {product?.quantity}      Price: ${(product?.price_data?.unit_amount / 1000).toFixed(2)}
                    </td>
               ))}

               
            </tr>
        ))}
      </tbody>
      </table>
    </Layout>
  )
}
