import React from "react";
import { FiFolder } from "react-icons/fi";
import { BsPinAngleFill } from "react-icons/bs";
import { RiMegaphoneFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ categories, latestAnnouncement }) => {
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:block fixed left-0 top-16 w-1/5 h-screen bg-white p-4 shadow-md overflow-y-auto">
      {/* 📂 Categories Section */}
      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <FiFolder className="text-xl text-blue-500" /> Categories
        </h3>
        <ul className="text-gray-500 space-y-2">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li
                key={cat.id}
                onClick={() => navigate(`/categories/${cat.id}`)}
                className="cursor-pointer hover:text-blue-600"
              >
                {cat.name}
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No categories yet.</p>
          )}
        </ul>
      </div>

      {/* 📌 Fun Fact Section */}
      <div className="p-4 bg-gray-100 rounded-lg shadow mt-6">
        <h3 className="flex items-center text-lg font-semibold mb-3">
          <BsPinAngleFill className="text-blue-500 text-xl mr-2" />
          Did you know?
        </h3>
        <p className="text-gray-600 text-sm">
          The first-ever forum software was built in 1978!
        </p>
      </div>

      {/* 📣 Announcement Section */}
      {latestAnnouncement && (
        <div className="p-4 bg-gray-100 rounded-lg shadow mt-6">
          <h3 className="flex items-center text-lg font-semibold mb-2">
            <RiMegaphoneFill className="text-blue-500 text-xl mr-2" />
            Announcement
          </h3>
          <p className="text-gray-600 text-sm italic line-clamp-3">
            {latestAnnouncement.content}
          </p>
          <button
            onClick={() => navigate("/announcements")}
            className="mt-3 text-sm text-blue-500 hover:underline"
          >
            View All
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
