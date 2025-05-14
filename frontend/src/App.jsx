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
import Layout from "./component/Layout";
import PortfolioWebsite from "./pages/PortfolioWebsite";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminPosts from "./pages/AdminPosts";
import AdminCategories from "./pages/AdminCategories";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPdf from "./pages/AdminPdf";
import AdminLayout from "./component/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN ROUTES - Wrapped in Layout */}
        <Route
          path="/category"
          element={
            <Layout>
              <AdminRoute element={<CategoryPage />} />
            </Layout>
          }
        />

        {/*
          /admin is protected. 
          You can wrap <AdminLayout /> with your own AdminRoute 
          if you want only admin to access it:
          
          <Route path="/admin" element={<AdminRoute element={<AdminLayout />} />}>
        */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="pdf" element={<AdminPdf />} />
        </Route>

        {/* Example fallback route */}
        <Route path="*" element={<div className="p-6">404 Not Found</div>} />

        {/* PROTECTED ROUTES FOR LOGGED-IN USERS - Wrapped in Layout */}
        {/* Add a route for "/" that uses your protected or public logic */}
        <Route
          path="/"
          element={
            <Layout>
              <ProtectedRoute element={<PostPage />} />
            </Layout>
          }
        />
        <Route
          path="/categories/:categoryId"
          element={
            <Layout>
              <ProtectedRoute element={<CategoryDetailPage />} />
            </Layout>
          }
        />

        <Route
          path="/posts"
          element={
            <Layout>
              <ProtectedRoute element={<PostPage />} />
            </Layout>
          }
        />
        <Route
          path="/portfolio"
          element={<ProtectedRoute element={<PortfolioWebsite />} />}
        />
        <Route
          path="/add-post"
          element={
            <Layout>
              <ProtectedRoute element={<AddEditPostPage />} />
            </Layout>
          }
        />
        <Route
          path="/edit-post/:postId"
          element={
            <Layout>
              <ProtectedRoute element={<AddEditPostPage />} />
            </Layout>
          }
        />
        <Route
          path="/post/:postId"
          element={
            <Layout>
              <ProtectedRoute element={<PostDetailPage />} />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProtectedRoute element={<ProfilePage />} />
            </Layout>
          }
        />

        {/* DEFAULT ROUTE */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
