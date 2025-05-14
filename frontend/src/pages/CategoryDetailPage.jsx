import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import Sidebar from "../component/Sidebar";
import RightSidebar from "../component/RightSidebar";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { FiFolder } from "react-icons/fi"; // Minimal Icons

const CategoryDetailPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]); // For sidebar
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) Fetch the category info (optional)
        const catResponse = await ApiService.getCategoryById(categoryId);
        if (catResponse.status === 200) {
          setCategory(catResponse.category);
        }

        // 2) Fetch the posts for this category
        const postsResponse = await ApiService.getPostsByCategory(categoryId);
        if (postsResponse.status === 200) {
          console.log(postsResponse);
          setPosts(postsResponse.posts);
        }

        // 3) Possibly fetch all categories for the sidebar
        const allCats = await ApiService.getAllCategories();
        if (allCats.status === 200) {
          setCategories(allCats.categories);
        }
      } catch (error) {
        showMessage("Error fetching category or posts");
      }
    };
    fetchData();
  }, [categoryId]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <Layout>
      <div className="flex max-w-7xl mx-auto p-4 gap-6">
        <Sidebar categories={categories} />

        <main className="w-full lg:w-3/5 ml-[20%] mr-[20%]">
          {message && (
            <div className="bg-red-500 text-white p-3 rounded-md text-center">
              {message}
            </div>
          )}

          {category && (
            <div className="bg-white">
              <h1 className="flex align-start text-3xl font-bold"><FiFolder className="text-xl text-blue-500" />{category.name}</h1>
            </div>
          )}

          <div className="mt-6 bg-white rounded-lg">
            {/* Posts List */}
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex bg-white p-5 rounded-lg shadow-md mb-4"
              >
                {/* 🔼 Upvote/Downvote Section */}
                <div className="flex flex-col items-center mr-4">
                  <button className="text-green-500 hover:text-green-600">
                    <BiSolidUpvote className="text-blue-500" />
                  </button>
                  <span className="text-gray-700">{post.voteCount || 0}</span>
                  <button className="text-red-500 hover:text-red-600">
                    <BiSolidDownvote className="text-gray-300" />
                  </button>
                </div>

                {/* 📄 Post Content */}
                <div
                  className="cursor-pointer w-full"
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
                  <p className="text-gray-600 mt-1">
                    {post.content.substring(0, 120)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>

        <RightSidebar
          userStats={{ karma: 100, posts: 10, comments: 25 }}
          topContributors={[]}
        />
      </div>
    </Layout>
  );
};

export default CategoryDetailPage;
