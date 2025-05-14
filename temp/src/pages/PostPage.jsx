import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../component/PaginationComponent";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Pagination Set-Up
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  // date-time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  console.log(formatDate('2025-02-20T14:02:13.453004'));

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postData = await ApiService.getAllPosts();

        if (postData.status === 200) {
          setTotalPages(Math.ceil(postData.posts.length / itemsPerPage));

          setPosts(
            postData.posts.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
          );
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Getting Posts: " + error
        );
      }
    };

    getPosts();
  }, [currentPage]);

  // Delete a post
  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this Post?")) {
      try {
        await ApiService.deletePost(postId);
        showMessage("Post successfully Deleted");
        window.location.reload(); // reload page
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Deleting the Post: " + error
        );
      }
    }
  };

  // Method to show messages or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="post-page">
        <div className="post-header">
          <h1>Posts</h1>
          <button
            className="add-post-btn"
            onClick={() => navigate("/add-post")}
          >
            Add Post
          </button>
        </div>

        {posts && (
          <div className="post-list">
            {posts.map((post) => (
              <div key={post.id} className="post-item">
                <h3 className="title">{post.title}</h3>
                <p className="content">{post.content}</p>
                <p className="created-at">Created at: {formatDate(post.createdAt)}</p>

                <div className="post-actions">
                  <button className="edit-btn" onClick={() => navigate(`/edit-post/${post.id}`)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeletePost(post.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Layout>
  );
};

export default PostPage;
