import React from "react";
import { Link } from "react-router-dom";
import ApiService from "../service/ApiService";

const logout = () => {
  ApiService.logout();
};

const Sidebar = () => {
  const isAuth = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();

  return (
    <div className="sidebar">
      <h1 className="app-title">TMS</h1>
      <ul className="nav-links">
        {isAuth && (
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/comments">Comments</Link>
          </li>
        )}

        {isAdmin && (
          <li>
            <Link to="/categories">Categories</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link onClick={logout} to="/login">
              Logout
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;