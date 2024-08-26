'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

export default function OrderPage() {
    const [orders, setOrders] = useState([])
    useEffect(()=>{
            axios.get('/api/orders').then(res =>{
                setOrders(res.data)
            })
    },[])

  return (
    <Layout>
      <h1>Orders</h1>
      <table className='basic'>
        <thead>
          <tr className='underline text-xl'>
        <th className=''>Date</th>
        <th>Paid</th>
        <th className=''>Recipient</th>
        <th className=''>Products</th>
        </tr>
        </thead>
      <tbody>
        {orders?.length > 0 && orders?.map((order)=>(
            <tr key={order._id}>
               <td>{(new Date(order.createdAt)).toLocaleString()}<br /> Total: ${order.total}</td>
               <td className={order.paid ? 'text-green-600' : 'text-red-600'}>{order.paid ? "YES" : "No"}</td>
               <td className='flex items-center '>{order.name}<br />
               {order.email}<br />
               {order.city} {order.state}<br />
               {order.address}<br />
               {order.postal}
               </td>
               {order.line_items.map((product)=> (
                    <td className='text-right'>
                        {product?.price_data?.product_data?.name}<br />     Quantity: {product?.quantity}      Price: ${(product?.price_data?.unit_amount / 100).toFixed(2)}
                    </td>
               ))}

               
            </tr>
        ))}
      </tbody>
      </table>
    </Layout>
  )
}
