import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import AddEditCommentPage from "../pages/AddEditCommentPage";
import RandomName from "../component/RandomName";
import Sidebar from "../component/Sidebar";
import RightSidebar from "../component/RightSidebar";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { BsChatRightFill } from "react-icons/bs";
import { PiChatTeardropDotsFill } from "react-icons/pi";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [anonymousName, setAnonymousName] = useState("");
  const [categories, setCategories] = useState([]);
  
  // NEW: States for replies
  const [replyParentId, setReplyParentId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  
  // Suppose we have an ApiService helper that can tell us if user is admin
  const isAdmin = ApiService.isAdmin();
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // 1) Fetch Post
        const postResponse = await ApiService.getPostById(postId);
        if (postResponse.status === 200) {
          console.log(postResponse.post.deleted)
          setPost(postResponse.post);
        }
        
        // 2) Fetch Comments
        const commentsResponse = await ApiService.getCommentsByPostId(postId);
        if (commentsResponse.status === 200) {
          setComments(commentsResponse.comments);
        }
        
        // 3) Fetch Categories
        const categoryResponse = await ApiService.getAllCategories();
        if (categoryResponse.status === 200) {
          setCategories(categoryResponse.categories);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error fetching post details."
        );
      }
    };
    
    fetchPostDetails();
    setAnonymousName(RandomName());
  }, [postId]);
  
  // Helper function to refresh comments after adding or replying
  const handleCommentAdded = async () => {
    try {
      const commentsResponse = await ApiService.getCommentsByPostId(postId);
      if (commentsResponse.status === 200) {
        setComments(commentsResponse.comments);
      }
    } catch (error) {
      showMessage("Error refreshing comments.");
    }
  };

  // Used to show messages/errors on screen
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };
  
  // Called when user clicks "Reply" under a comment
  const handleReplyClick = (commentId) => {
    setReplyParentId(commentId);
    setReplyContent(""); // Clear any old content
  };
  
  // Called when user submits the reply form
  const handleAddReply = async (e) => {
    e.preventDefault();
    try {
      // Use the same addComment endpoint
      await ApiService.addComment(postId, {
        content: replyContent,
        parentCommentId: replyParentId,
      });
      // Clear states
      setReplyParentId(null);
      setReplyContent("");
      // Reload or refresh the comment list
      handleCommentAdded();
    } catch (error) {
      console.error("Error adding reply:", error);
      showMessage("Error adding reply.");
    }
  };
  
  // Handle the Delete Post logic
  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const response = await ApiService.deletePost(postId);
      if (response.status === 200) {
        alert("Post deleted successfully");
        // Possibly redirect to the posts list
        navigate("/posts");
      } else {
        alert("Error deleting post: " + response.message);
      }
    } catch (error) {
      alert("Error deleting post: " + error);
    }
  };
  const handleVote = async (type) => {
    try {
      await ApiService.votePost(postId, type); // No need to use res.data
      const updatedPost = await ApiService.getPostById(postId);
      if (updatedPost.status === 200) {
        setPost(updatedPost.post); // Refresh the whole post
      }
    } catch (err) {
      console.error("Vote failed", err);
    }
  };
  

  return (
    <Layout>
      <div className="flex max-w-7xl mx-auto p-4 gap-6">
        {/* Left Sidebar (Categories) */}
        <Sidebar trendingPosts={[]} categories={categories} />

        {/* Main Post Content */}
        <main className="w-full lg:w-3/5 ml-[20%] mr-[20%]">
          {/* Show Error Message If API Fails */}
          {message && (
            <div className="bg-red-500 text-white p-3 rounded-md text-center">
              {message}
            </div>
          )}

          {/* Post Header */}

          {post ? (
            post.deleted ? (
              <div className="bg-red-100 text-red-700 p-4 rounded-md text-center font-semibold">
                🚫 This post has been deleted by the admin.
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  {/* Upvote/Downvote Section */}
                  <div className="flex flex-col items-center">
                    <button className="hover:text-green-600 text-2xl">
                      <BiSolidUpvote className="text-blue-500 hover:text-blue-300" onClick={() => handleVote("UPVOTE")}/>
                    </button>
                    <span className="text-gray-700">{post.voteCount || 0}</span>
                    <button className="text-2xl">
                      <BiSolidDownvote className="text-gray-300 hover:text-gray-500" onClick={() => handleVote("DOWNVOTE")}/>
                    </button>
                  </div>

                  {/* 📄 Post Content */}
                  <div className="w-full">
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                    <p className="text-gray-700 mt-2">{post.content}</p>
                    <p className="text-sm text-gray-400 mt-2 font-semibold">
                      By {anonymousName} -{" "}
                      {new Date(post.createdAt).toLocaleString()}
                    </p>

                    {isAdmin && (
                      <button
                        onClick={handleDeletePost}
                        className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600 transition"
                      >
                        Delete Post
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          ) : (
            <p className="text-gray-600 text-center mt-4">Loading...</p>
          )}

          {/* 📝 Add Comment Box (top-level comment) */}
          <div className="mt-6">
            <AddEditCommentPage
              postId={postId}
              onCommentAdded={handleCommentAdded}
            />
          </div>

          {/* 💬 Comments Section */}
          <div className="mt-6 bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <GoCommentDiscussion className="text-blue-500" /> Comments
            </h2>

            {comments.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    className={`p-2 rounded-lg ${
                      comment.parentCommentId
                        ? "ml-8 border-l-4 border-blue-400 pl-4"
                        : ""
                    }`}
                  >
                    {/* Comment Header */}
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                      <span className="font-medium">
                        <BsPersonCircle className="text-blue-500 text-sm" />
                      </span>
                      <span>
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {/* Comment Content */}
                    <p className="text-gray-800">{comment.content}</p>

                    {/* Action Buttons */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleReplyClick(comment.id)}
                        className="text-blue-500 hover:underline text-xs"
                      >
                        <PiChatTeardropDotsFill className="text-lg text-blue-500" />
                      </button>
                    </div>

                    {/* Reply Form (Only visible if this comment is the one we clicked "Reply" on) */}
                    {replyParentId === comment.id && (
                      <form onSubmit={handleAddReply} className="mt-2">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write your reply..."
                          className="w-full rounded"
                        />
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded mt-1"
                        >
                          Submit
                        </button>
                      </form>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center mt-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </main>

        {/* 🏆 Right Sidebar (User Stats + Contributors + Rules) */}
        <RightSidebar
          userStats={{ karma: 120, posts: 5, comments: 14 }}
          topContributors={[]}
        />
      </div>
    </Layout>
  );
};
export default PostDetailPage;
