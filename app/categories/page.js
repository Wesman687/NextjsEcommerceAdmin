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

  async function saveCategory(e) {
    e.preventDefault();
    const data = { name, parentCategory };
    if (editedCategory) {
      try {
        data._id = editedCategory._id;
        const result = await axios.put("/api/categories", data);
        setEditedCategory(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("category updating", data, parentCategory);
      try {
        const result = await axios.post("/api/categories", data);
      } catch (error) {
        console.log(error);
      }
    }

    setName("");
    setParentCategory("");
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
  console.log(categories);
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

      <form onSubmit={(e) => saveCategory(e)} className="flex gap-1">
        <div className="flex gap-1"></div>
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
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      <table className="basic mt-4">
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
      </table>
    </Layout>
  );
});
