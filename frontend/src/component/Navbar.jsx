import React from "react";
import { Link } from "react-router-dom";
import ApiService from "../service/ApiService";
import { FiSearch, FiUser } from "react-icons/fi"; // Icons
import { BsChatRightTextFill } from "react-icons/bs";
import { useState } from "react";

const logout = () => {
  ApiService.logout();
};

const Navbar = () => {
  const isAuth = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const user = ApiService.getCurrentUser();

  // State for dropdown menu
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
        
        {/* 🔥 Left Side - Logo */}
        <Link to="/" className="flex items-center space-x-2 text-white text-xl font-semibold">
          <BsChatRightTextFill className="text-xl text-blue-500"/>
          <span>MyForum</span>
        </Link>

        {/* 🔍 Middle - Search Bar */}
        <div className="relative w-2/5">
          <input
            type="text"
            placeholder="Search posts, users, categories..."
            className="w-full p-2 pl-10 pr-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-400"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        {/* 👤 Right Side - User Profile & Logout */}
        <div className="flex items-center space-x-4">
          {isAuth ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-md text-white hover:bg-gray-600"
              >
                <FiUser className="text-lg" />
                <span>{user?.username || "User"}</span>
              </button>

              {/* 🔽 Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-blue-500 px-4 py-1 text-white rounded-md hover:bg-blue-600">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
