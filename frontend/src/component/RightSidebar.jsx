import React from "react";
import { FaComment, FaUser, FaLink } from "react-icons/fa"; // Minimal Icons
import { IoMdTrophy } from "react-icons/io";
import { MdOutlineRule } from "react-icons/md";

const RightSidebar = ({ userStats }) => {
  return (
    <aside className="hidden lg:block fixed right-20 top-16 w-1/6 h-screen bg-white p-4 shadow-md overflow-y-auto">
      
      {/* 📊 User Stats */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <IoMdTrophy className="text-xl text-blue-500" /> Your Stats
        </h3>
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-gray-600 text-sm space-y-1">
            Posts: <span className="font-semibold">{userStats.posts}</span>
          </p>
          <p className="flex items-center gap-2 text-gray-600 text-sm space-y-1">
            Comments: <span className="font-semibold">{userStats.comments}</span>
          </p>
          <p className="flex items-center gap-2 text-gray-600 text-sm space-y-1">
            Score: <span className="font-semibold">{userStats.score}</span>
          </p>
        </div>
      </div>

      {/* 📌 Community Rules */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <MdOutlineRule className="text-xl text-blue-500" /> Community Rules
        </h3>
        <ul className="text-gray-600 text-sm space-y-1">
          <li>Be respectful to others.</li>
          <li>Keep it chill</li>
          <li>No spam or self-promotion.</li>
          <li>Stay on topic in discussions.</li>
          <li>Report any abusive behavior.</li>
          <li>No commercial posts</li>
        </ul>
      </div>

      {/* 🔗 More Useful Links */}
      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <FaLink className="text-xl text-blue-500" /> More Links
        </h3>
        <ul className="text-gray-600 text-sm space-y-2">
          <li><a href="/help" className="hover:text-blue-500">Help Center</a></li>
          <li><a href="/about" className="hover:text-blue-500">About Us</a></li>
          <li><a href="/contact" className="hover:text-blue-500">Contact Support</a></li>
        </ul>
      </div>

    </aside>
  );
};

export default RightSidebar;
