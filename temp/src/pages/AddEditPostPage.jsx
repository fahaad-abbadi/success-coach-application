import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const AddEditPostPage = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await ApiService.getAllCategories();
        setCategories(categoriesData.categories);
      } catch (error) {
        showMessage(error.response?.data?.message || "Error fetching categories");
      }
    };

    const fetchPostById = async () => {
      if (postId) {
        setIsEditing(true);
        try {
          const postData = await ApiService.getPostById(postId);

          if(postData.status === 200)
          {
            setTitle(postData.post.title);
            setContent(postData.post.content);
            setCategoryId(postData.post.categoryId);
          }
          else
          {
            showMessage(postData.message)
          }
        } catch (error) {
          showMessage(error.response?.data?.message || "Error fetching post");
        }
      }
    };

    fetchCategories();
    if (postId) fetchPostById();
  }, [postId]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, content, categoryId };

    try {
      if (isEditing) {
        await ApiService.updatePost(postId, postData);
        showMessage("Post successfully updated");
      } else {
        await ApiService.createPost(postData);
        showMessage("Post successfully created");
      }
      navigate("/posts");
    } catch (error) {
      showMessage(error.response?.data?.message || "Error saving post");
    }
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}
      <div className="post-form-page">
        <h1>{isEditing ? "Edit Post" : "Add Post"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <button type="submit">{isEditing ? "Update Post" : "Add Post"}</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddEditPostPage;
