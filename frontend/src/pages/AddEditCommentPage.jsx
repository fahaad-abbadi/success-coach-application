import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const AddEditCommentPage = () => {
  const { postId, commentId } = useParams();
  const [content, setContent] = useState("");
  const [parentCommentId, setParentCommentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
            error.response?.data?.message || "Error fetching comment: " + error
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

    if (content.trim()) {
      onSubmit(content);
      setContent("");
      setIsFocused(false);
    }
  };

  return (
    <>
      <div className="">
        {" "}
        {/* pt-24 ensures space for the fixed navbar */}
        {message && (
          <div className="rounded-lg bg-red-500 p-3 text-center text-white shadow-md">
            {message}
          </div>
        )}
        <div className="rounded-lg bg-white p-2">
          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-500">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => !content && setIsFocused(false)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSubmit(e)
                }
                rows={isFocused ? "2" : "1"}
                placeholder="Add a comment..."
                className="w-full resize-none border-none focus:outline-none"
              />
              <button
                type="submit"
                className="text-gray-400 hover:text-blue-500"
              >
                ↵
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEditCommentPage;
