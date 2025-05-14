import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await ApiService.getAllCategory();
        if (response.status === 200) {
          setCategories(response.categories);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error fetching categories: " + error
        );
      }
    };
    getCategories();
  }, []);

  const addCategory = async () => {
    if (!categoryName) {
      showMessage("Category name cannot be empty");
      return;
    }
    try {
      await ApiService.createCategory({ name: categoryName });
      showMessage("Category successfully added");
      setCategoryName("");
      window.location.reload();
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error adding category: " + error
      );
    }
  };

  const editCategory = async () => {
    try {
      await ApiService.updateCategory(editingCategoryId, { name: categoryName });
      showMessage("Category successfully updated");
      setIsEditing(false);
      setCategoryName("");
      window.location.reload();
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error updating category: " + error
      );
    }
  };

  const handleEditCategory = (category) => {
    setIsEditing(true);
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await ApiService.deleteCategory(categoryId);
        showMessage("Category successfully deleted");
        window.location.reload();
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error deleting category: " + error
        );
      }
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
<div className="mx-auto max-w-4xl space-y-6 p-6">
      {message && (
        <div className="rounded-lg bg-red-500 p-3 text-center text-white shadow-md">
          {message}
        </div>
      )}

      <div className="flex flex-col space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">📂 Categories</h1>

        <div className="flex items-center space-x-3">
          <input
            value={categoryName}
            type="text"
            placeholder="Enter category name..."
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={isEditing ? editCategory : addCategory}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            {isEditing ? "✏️ Edit" : "➕ Add"}
          </button>
        </div>
      </div>

      {categories.length > 0 ? (
        <ul className="space-y-3">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <span className="font-medium text-gray-700">{category.name}</span>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="rounded-lg bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="rounded-lg bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No categories available.</p>
      )}
    </div>
    </Layout>
  );
};

export default CategoryPage;
