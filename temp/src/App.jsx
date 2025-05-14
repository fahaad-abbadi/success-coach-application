import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute, AdminRoute } from "./service/Guard";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/CategoryPage";
import PostPage from "./pages/PostPage";
import AddEditPostPage from "./pages/AddEditPostPage";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
// import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN ROUTES */}
        <Route path="/category" element={<AdminRoute element={<CategoryPage />} />} />

        {/* PROTECTED ROUTES FOR LOGGED-IN USERS */}
        <Route path="/posts" element={<ProtectedRoute element={<PostPage />} />} />
        <Route path="/add-post" element={<ProtectedRoute element={<AddEditPostPage />} />} />
        <Route path="/edit-post/:postId" element={<ProtectedRoute element={<AddEditPostPage />} />} />
        <Route path="/post/:postId" element={<ProtectedRoute element={<PostDetailPage />} />} />

        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        {/* <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} /> */}

        {/* DEFAULT ROUTE */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
