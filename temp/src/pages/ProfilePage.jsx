import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState("posts"); // "posts" or "comments"
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userResponse = await ApiService.getCurrentUser();
        if (userResponse.status === 200) {
          setUser(userResponse.user);
          setPosts(userResponse.user.posts);
          console.log(userResponse.user.posts)
          console.log(userResponse.user.comments)
          setComments(userResponse.user.comments);
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
      {message && <div className="message">{message}</div>}

      {user && (
        <div className="profile-header">
          <h1>{user.username}</h1>
          <p>Email: {user.email}</p>
          <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      )}

      <div className="profile-tabs">
        <button className={activeTab === "posts" ? "active" : ""} onClick={() => setActiveTab("posts")}>
          Posts ({posts.length})
        </button>
        <button className={activeTab === "comments" ? "active" : ""} onClick={() => setActiveTab("comments")}>
          Comments ({comments.length})
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "posts" && (
          <div className="profile-posts">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="post-item" onClick={() => navigate(`/post/${post.id}`)}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <p>{post.createdAt}</p>
                </div>
              ))
            ) : (
              <p>No posts yet.</p>
            )}
          </div>
        )}

        {activeTab === "comments" && (
          <div className="profile-comments">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <p>{comment.content}</p>
                  <span>On post: <a href={`/post/${comment.postId}`}>View</a></span>
                  <span className="comment-date">{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
