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
      properties:  properties.map(p=>({name:p.name, values:p.value.split(',')}))};
    if (editedCategory) {
      try {
        data._id = editedCategory._id;
        const result = await axios.put("/api/categories", data);
        setEditedCategory(null);
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
    setParentCategory(category?.parent?._id || "0");
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
            className="mb-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="p-1 flex items-center"
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
              <input type="text" className="mb-0" value={property.values} onChange={(e)=>handlePropertyValuesChange(property, e.target.value, index)} placeholder="values, comma separated" />
              
          <button onClick={()=>removeProperty(index)} className="w-fit btn-default">Remove</button>
            </div>
          ))}          
          </div>
        </div>
        <button onClick={()=>{
          setEditedCategory(null)
          setName('')
          setParentCategory('')
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
                <td>
                  <button
                    onClick={(e) => editCategory(category)}
                    className="btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => deleteCategory(category)}
                    className="btn-primary"
                  >
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
