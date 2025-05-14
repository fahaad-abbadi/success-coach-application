import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import Sidebar from "../component/Sidebar";
import RightSidebar from "../component/RightSidebar";
import { FaUserCircle } from "react-icons/fa"; // User Profile Icon
import { IoIosStats } from "react-icons/io"; // Stats Icon
import { BsFillChatDotsFill } from "react-icons/bs"; // Comments Icon
import { MdPostAdd } from "react-icons/md"; // Posts Icon
import { CgProfile } from "react-icons/cg";
import { BiSolidNotepad } from "react-icons/bi";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState("posts"); // "posts" or "comments"
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userResponse = await ApiService.getCurrentUser();
        const categoryResponse = await ApiService.getAllCategories();

        if (userResponse.status === 200) {
          setUser(userResponse.user);
          setPosts(userResponse.user.posts);
          setComments(userResponse.user.comments);
        }

        if (categoryResponse.status === 200) {
          setCategories(categoryResponse.categories);
        }
      } catch (error) {
        showMessage("Error fetching profile data.");
      }
    };

    fetchProfileData();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <Layout>
      <div className="flex max-w-7xl mx-auto p-4 gap-6">
        {/* 🔥 Left Sidebar (Trending + Categories) */}
        <Sidebar trendingPosts={[]} categories={categories} />

        {/* 🏆 Main Profile Section */}
        <main className="w-full lg:w-3/5 ml-[20%] mr-[20%]">
          {/* 🔴 Show Error Message If API Fails */}
          {message && (
            <div className="bg-red-500 text-white p-3 rounded-md text-center">
              {message}
            </div>
          )}

          {/* ✅ Profile Header (Updated) */}
          {user && (
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
              {/* 🔥 Profile Avatar */}
              <CgProfile className="text-6xl text-blue-500 mb-2" />

              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-400 text-sm">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>

              {/* 🏆 Stats Section */}
              <div className="mt-4 flex justify-center space-x-24">
                {/* ⭐ Karma */}
                <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-36">
                  <IoIosStats className="text-2xl text-blue-500" />
                  <h3 className="text-sm font-semibold">score</h3>
                  <p className="text-lg text-blue-500">{user.score || 0}</p>
                </div>

                {/* 📝 Posts */}
                <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-36">
                  <MdPostAdd className="text-2xl text-blue-500" />
                  <h3 className="text-sm font-semibold">Posts</h3>
                  <p className="text-lg">{posts.length}</p>
                </div>

                {/* 💬 Comments */}
                <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-36">
                  <BsFillChatDotsFill className="text-2xl text-blue-500" />
                  <h3 className="text-sm font-semibold">Comments</h3>
                  <p className="text-lg">{comments.length}</p>
                </div>
              </div>
            </div>
          )}

          {/* ✅ Tabs for Posts & Comments */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeTab === "posts"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              Posts ({posts.length})
            </button>

            <button
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeTab === "comments"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("comments")}
            >
              Comments ({comments.length})
            </button>
          </div>

          {/* ✅ Posts & Comments List */}
          <div className="mt-4 space-y-4">
            {activeTab === "posts" && (
              <div className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm transition hover:shadow-md"
                      onClick={() => navigate(`/post/${post.id}`)}
                    >
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <p className="text-gray-500">{post.content}</p>
                      <p className="mt-2 text-sm text-gray-400">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No posts yet.</p>
                )}
              </div>
            )}

{activeTab === "comments" && (
  <div className="space-y-4">
    {comments.length > 0 ? (
      comments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-col bg-white p-4 rounded-lg shadow hover:shadow-md transition border border-gray-200"
        >
          {/* Comment Header */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-700">AnonymousUser</span> {/* Add dynamic username if available */}
            <span>•</span>
            <span>{new Date(comment.createdAt).toLocaleString()}</span>
          </div>

          {/* Comment Content */}
          <p className="text-gray-700 mt-2">{comment.content}</p>

          {/* Actions (Post Link) */}
          <div className="flex justify-between items-center mt-2">
            <a
              href={`/post/${comment.postId}`}
              className="text-blue-500 text-sm hover:underline"
            >
              View Post
            </a>

            {/* Reply Button (Optional, for later implementation) */}
            <button className="text-gray-500 text-sm hover:text-blue-500 transition">
              Reply
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No comments yet.</p>
    )}
  </div>
)}

          </div>
        </main>

        {/* 🏆 Right Sidebar (User Stats + Contributors + Rules) */}
        <RightSidebar
          userStats={{
            score: 120,
            posts: posts.length,
            comments: comments.length,
          }}
          topContributors={[]}
        />
      </div>
    </Layout>
  );
};

export default ProfilePage;
