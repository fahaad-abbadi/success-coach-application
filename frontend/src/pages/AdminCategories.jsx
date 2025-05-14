import React, { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategories();
      if (response.status === 200) {
        setCategories(response.categories);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setMessage("Category name cannot be empty.");
      return;
    }

    try {
      const response = await ApiService.createCategory({ name: newCategoryName });
      if (response.status === 200) {
        setNewCategoryName("");
        setMessage("Category added successfully.");
        fetchCategories();
      }
    } catch (error) {
      setMessage("Failed to add category.");
      console.error(error);
    }
  };

  const handleDeleteCategory = async (categoryId, categoryName) => {
    if (categoryName.toLowerCase() === "uncategorized") {
      alert("You cannot delete the 'Uncategorized' category.");
      return;
    }

    if (!window.confirm(`Delete category '${categoryName}'?`)) return;

    try {
      const response = await ApiService.deleteCategory(categoryId);
      if (response.status === 200) {
        setMessage("Category deleted.");
        fetchCategories();
      }
    } catch (error) {
      setMessage("Failed to delete category.");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* Message Box */}
      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      {/* Add Category */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="border px-3 py-2 rounded w-1/3"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* List of Categories */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">#</th>
            <th className="p-3">Name</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat.id} className="border-t">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{cat.name}</td>
              <td className="p-3">
                {cat.name.toLowerCase() !== "uncategorized" && (
                  <button
                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                )}
                {cat.name.toLowerCase() === "uncategorized" && (
                  <span className="text-gray-400 italic">Protected</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategories;
