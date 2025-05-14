import React, { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await ApiService.getAllPosts();
      if (response.status === 200) {
        setPosts(response.posts || []);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await ApiService.deletePost(postId);
      if (res.status === 200) {
        setMessage("Post deleted successfully.");
        fetchPosts(); // Refresh list
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete post.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>
      <p className="text-gray-600 mb-4">Here you can delete or edit posts, moderate content, etc.</p>

      {/* Success/Error Messages */}
      {message && <div className="bg-green-500 text-white px-4 py-2 rounded mb-4">{message}</div>}
      {error && <div className="bg-red-500 text-white px-4 py-2 rounded mb-4">{error}</div>}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow border border-gray-200 p-4 rounded-md hover:shadow-md transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div onClick={() => navigate(`/post/${post.id}`)} className="w-full pr-4">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.content}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <BiSolidUpvote className="text-blue-500" />
                    {post.voteCount || 0}
                    <BiSolidDownvote className="text-gray-300" />
                  </div>
                </div>

                {/* Admin Delete Button */}
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:text-red-800 text-sm px-3 py-1 border border-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPosts;
