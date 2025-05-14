import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import RightSidebar from "../component/RightSidebar";
import { IoIosAddCircle } from "react-icons/io";

const AddEditPostPage = () => {
  const { postId } = useParams();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [userStats, setUserStats] = useState({});
  const [topContributors, setTopContributors] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await ApiService.getAllCategories();
        setCategories(categoriesData.categories);
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error fetching categories"
        );
      }
    };

    const fetchPostById = async () => {
      if (postId) {
        setIsEditing(true);
        try {
          const postData = await ApiService.getPostById(postId);

          if (postData.status === 200) {
            setTitle(postData.post.title);
            setContent(postData.post.content);
            setCategoryId(postData.post.categoryId);
            setVoteCount(postData.post.voteCount);
          } else {
            showMessage(postData.message);
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

  const handleVote = async (type) => {
    try {
      const response = await ApiService.votePost(postId, type);
      if (response.status == 200) {
        setVoteCount(response.newVoteCount);
      }
    } catch (error) {
      showMessage(error.response?.data?.message || "Error Voting");
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-6 p-6">
        {message && (
          <div className="rounded-lg bg-red-500 p-3 text-center text-white shadow-md">
            {message}
          </div>
        )}

        {/* 🔥 Left Sidebar */}
        <Sidebar trendingPosts={posts.slice(0, 5)} categories={categories} />

        <div className="rounded-lg bg-white">
          <h1 className="flex justify-stretch align-middle text-2xl font-bold text-gray-800">
            {isEditing ? "Edit Post" : <><IoIosAddCircle className="text-blue-500"/><p>Add Post</p></>}
          </h1>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-1">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                required
                rows="5"
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              {isEditing ? "✅ Update Post" : "Post"}
            </button>
          </form>
        </div>
      </div>
      {/* 🏆 Right Sidebar */}
      <RightSidebar userStats={userStats} topContributors={topContributors} />
    </Layout>
  );
};

export default AddEditPostPage;
