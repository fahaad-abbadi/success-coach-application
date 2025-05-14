import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const AddEditCommentPage = () => {
  const { postId, commentId } = useParams();
  const [content, setContent] = useState("");
  const [parentCommentId, setParentCommentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommentById = async () => {
      if (commentId) {
        setIsEditing(true);
        try {
          const response = await ApiService.getCommentById(commentId);
          if (response.status === 200) {
            setContent(response.comment.content);
            setParentCommentId(response.comment.parentCommentId || null);
          } else {
            showMessage(response.message);
          }
        } catch (error) {
          showMessage(
            error.response?.data?.message ||
              "Error fetching comment: " + error
          );
        }
      }
    };
    if (commentId) fetchCommentById();
  }, [commentId]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentData = { content, parentCommentId };

    try {
      if (isEditing) {
        await ApiService.updateComment(commentId, commentData);
        showMessage("Comment successfully updated");
      } else {
        await ApiService.addComment(postId, commentData);
        showMessage("Comment successfully added");
      }
      navigate(`/post/${postId}`);
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error saving comment: " + error
      );
    }
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}
      <div className="comment-form-page">
        <h1>{isEditing ? "Edit Comment" : "Add Comment"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Comment</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isEditing ? "Edit Comment" : "Add Comment"}</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddEditCommentPage;
