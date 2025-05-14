import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import AddEditCommentPage from "../pages/AddEditCommentPage";

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postResponse = await ApiService.getPostById(postId);
        if (postResponse.status === 200) {
          setPost(postResponse.post);
        }

        const commentsResponse = await ApiService.getCommentsByPostId(postId);
        if (commentsResponse.status === 200) {
          setComments(commentsResponse.comments);
        }
      } catch (error) {
        showMessage(error.response?.data?.message || "Error fetching post details.");
      }
    };

    fetchPostDetails();
  }, [postId]);

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

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      {post && (
        <div className="post-detail">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p><strong>Author:</strong> {post.author}</p>
        </div>
      )}

      <AddEditCommentPage postId={postId} onCommentAdded={handleCommentAdded} />

      <div className="comments-section">
        <h2>Comments</h2>
        {comments.length > 0 ? (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <p>{comment.content}</p>
                <span className="comment-date">Posted on: {new Date(comment.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </Layout>
  );
};

export default PostDetailPage;
