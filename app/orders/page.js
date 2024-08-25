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
        <th>ID</th>
        <th>Recipient</th>
        <th>Products</th>
      </table>
      <tbody>
        {orders?.map((order)=>(
            <tr key={order._id}>
               <td>{order._id}</td>
               <td>{order.name}</td>
               <td></td>
            </tr>
        ))}


      </tbody>
    </Layout>
  )
}
