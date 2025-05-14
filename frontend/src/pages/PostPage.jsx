import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import Sidebar from "../component/Sidebar";
import RightSidebar from "../component/RightSidebar";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { PiListPlusFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [topContributors, setTopContributors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await ApiService.getAllPosts();
        const categoryData = await ApiService.getAllCategories();
        console.log(postData.posts);
        if (postData.status === 200) setPosts(postData.posts);
        if (categoryData.status === 200) setCategories(categoryData.categories);
      } catch (error) {
        console.error("Error fetching data.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await ApiService.getLatestAnnouncement();
        console.log(res.announcement);
        if (res.status === 200) setLatestAnnouncement(res.announcement);
      } catch (err) {
        console.error("Failed to fetch announcement");
      }
    };
    fetchLatest();
  }, []);

  const handleVote = async (postId, type) => {
    try {
      const res = await ApiService.votePost(postId, type);
      if (res.status === 200) {
        // Update the vote count for that specific post
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, voteCount: res.data.data } : p
          )
        );
      }
    } catch (err) {
      console.error("Vote failed", err);
    }
  };

  return (
    <Layout>
      <div className="flex max-w-7xl mx-auto p-4">
        {/* 🔥 Left Sidebar */}
        <Sidebar
          categories={categories}
          latestAnnouncement={latestAnnouncement}
        />

        {/* 📰 Main Content (Fix: Adjust `ml-1/5`) */}
        <main className="w-full lg:w-3/5 ml-[20%]">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-4 p-3 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold flex justify-between">
              <PiListPlusFill className="text-blue-500" />
              Posts
            </h2>
            <button
              className="flex justify-between bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
              onClick={() => navigate("/add-post")}
            >
              <FaPlus />
              <p>Add Post</p>
            </button>
          </div>

          {/* Posts List */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex bg-white p-5 rounded-lg shadow-md mb-4"
            >
              {/* 🔼 Upvote/Downvote Section */}
              <div className="flex flex-col items-center">
                <button
                  className="hover:text-green-600 text-2xl"
                  onClick={() => handleVote(post.id, "UPVOTE")}
                >
                  <BiSolidUpvote className="text-blue-500 hover:text-blue-300" />
                </button>
                <span className="text-gray-700">{post.voteCount || 0}</span>
                <button
                  className="text-2xl"
                  onClick={() => handleVote(post.id, "DOWNVOTE")}
                >
                  <BiSolidDownvote className="text-gray-300 hover:text-gray-500" />
                </button>
              </div>

              {/* 📄 Post Content */}
              <div
                className="cursor-pointer w-full"
                onClick={() => !post.isDeleted && navigate(`/post/${post.id}`)}
              >
                {post.deleted ? (
                  <>
                    <h3 className="text-gray-400 italic">[deleted]</h3>
                    <p className="text-gray-300 text-sm">
                      This post was removed by the admin.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
                    <p className="text-gray-600 mt-1">
                      {post.content.length > 120
                        ? post.content.substring(0, 120) + "..."
                        : post.content}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* 🏆 Right Sidebar */}
          <RightSidebar
            userStats={userStats}
            topContributors={topContributors}
          />
        </main>
      </div>
    </Layout>
  );
};

export default PostPage;
