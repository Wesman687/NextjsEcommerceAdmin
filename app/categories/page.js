"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

export default withSwal(({ swal, ref }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState();
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties, setProperties] = useState([])

  async function saveCategory(e) {
    e.preventDefault();
    const data = { name, parentCategory, 
      properties:  properties.map(p=>({name:p.name, value:p.value.split(',')}))};
    if (editedCategory) {
      try {
        data._id = editedCategory._id;
        const result = await axios.put("/api/categories", data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await axios.post("/api/categories", data);
      } catch (error) {
        console.log(error);
      }
    }

    setName("");
    setEditedCategory(null);
    setParentCategory("");
    setProperties([])
    fetchCategories();
  }
  async function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }
  async function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category?.parent?._id || "");
    if (category?.properties?.length > 0){
    setProperties(category.properties.map(({name, value})=>({
      name,
      value: value.join(',')
    })))
  }
  }
  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async result => {
        await axios.delete('/api/categories?_id='+ category._id)
        fetchCategories()
      });
  }
  function createProperty(e){
    e.preventDefault()
    setProperties(prev => {
      return[...prev, {name:'', value:''}]
    })    
  }
  function handlePropertyNameChange(property, name, index) {
    setProperties(prev => {
      const properties = [...prev]
      properties[index].name = name
      return properties
    })
  }function handlePropertyValuesChange(property, value, index) {
    setProperties(prev => {
      const properties = [...prev]
      properties[index].value = value
      return properties
    })
  }
  function removeProperty(index){
    setProperties(prev => {
      return [...prev].filter((p, pindex) => {
        return index !== pindex
      })
    })
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit Category ${editedCategory.name}`
          : "Create new category"}
      </label>

        <div className="flex gap-1 flex-col">
          
        <div className="flex gap-1 items-center">
          <input
            type="text"
            placeholder={"Category Name"}
            className=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="flex items-center"
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value={"0"}>No parent category</option>
            {!!categories.length &&
              categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          </div>
          <div className="flex gap-1 flex-col">
          <label>Properties:</label>
          <button className="btn-default text-sm w-fit mb-1" onClick={(e)=>createProperty(e)}>Add New Property</button>
          {properties?.length > 0 && properties.map((property, index)=>(
            <div className="flex gap-1 mb-2" key={index}>
              <input type="text" className="mb-0 text-sm" value={property.name} onChange={(e)=>handlePropertyNameChange(property, e.target.value, index)} placeholder="property name (example: color" />
              <input type="text" className="mb-0" value={property.value} onChange={(e)=>handlePropertyValuesChange(property, e.target.value, index)} placeholder="values, comma separated" />
              
          <button onClick={()=>removeProperty(index)} className="w-fit btn-default">Remove</button>
            </div>
          ))}          
          </div>
        </div>
        <button onClick={()=>{
          setEditedCategory(null)
          setName('')
          setParentCategory('')
          setProperties([])
          fetchCategories()
          }} className="btn-default mr-1">Cancel</button>
        <button type="submit" onClick={(e) => saveCategory(e)}   className="btn-primary w-fit py-1">
            Save
          </button>
      {!editedCategory && <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {!!categories.length &&
            categories.map((category, index) => (
              <tr key={index}>
                <td>{category?.name}</td>
                <td>{category?.parent?.name}</td>
                <td className="flex flex-wrap">
                  <button
                    onClick={(e) => editCategory(category)}
                    className="btn-primary mr-1 text-sm flex"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      Edit
                  </button>
                  <button
                    onClick={(e) => deleteCategory(category)}
                    className="btn-red text-sm flex"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>}
    </Layout>
  );
});
