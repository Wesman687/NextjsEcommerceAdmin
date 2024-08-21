'use client'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from "axios";
export default function Categories() {
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState('')

  async function saveCategory(e){
    e.preventDefault()
    try {      
    const result = await axios.post('/api/categories', {name})
    } catch (error) {
      console.log(error)
    }
    setName('')
    fetchCategories()
  }
  async function fetchCategories(){
    axios.get('/api/categories').then(result=> {
      setCategories(result.data)
    })
  }
  useEffect(()=>{
    fetchCategories()
  },[])
  return (
    <Layout>
      <h1>Categories</h1>
      <label>New Category Name</label>
      <form onSubmit={(e)=>saveCategory(e)} className='flex gap-1'>
      <div className='flex gap-1 items-center'>
      <input type='text' placeholder={'Category Name'} className='mb-1' value={name} onChange={(e)=>setName(e.target.value)} />
      <select className='mb-0'>
        <option onChange={(e)=>setParentCategory(e.target.value)} value='0'>No parent category</option>
        {!!categories.length && categories.map((category, index)=>(
               <option value={category._id}>{category.name}</option> 
          ))}
      </select>
      <button type='submit' className='btn-primary py-1'>Save</button>
      </div>
      </form>
      <table className='basic mt-4'>
        <thead>
          <tr>
            <td>Category Name</td>
          </tr>
        </thead>
        <tbody>
          {!!categories.length && categories.map((category, index)=>(
            <tr key={index}>
              <td>
                {category.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>

  )
}

