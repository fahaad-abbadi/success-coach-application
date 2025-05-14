import React, { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

const AdminAnnouncements = () => {
  const [content, setContent] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAllAnnouncements();
  }, []);

  const fetchAllAnnouncements = async () => {
    try {
      const resp = await ApiService.getAllAnnouncements();
      console.log(resp.announcements);
      if (resp.status === 200) {
        setAnnouncements(resp.announcements);
      }
    } catch (error) {
      setMessage("Error fetching announcements");
    }
  };

  const handleCreate = async () => {
    if (!content.trim()) return;
    try {
      const resp = await ApiService.createAnnouncement(content);
      if (resp.data.status === 200) {
        setMessage("Announcement created successfully");
        setContent("");
        fetchAllAnnouncements();
      }
    } catch (error) {
      setMessage("Error creating announcement");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      {message && (
        <div className="bg-red-500 text-white p-2 rounded mb-2 text-center">
          {message}
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>

      {/* Create new announcement */}
      <div className="flex items-center space-x-2 mb-4">
        <textarea
          className="border p-2 w-full rounded"
          rows="2"
          placeholder="Type your announcement..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* List existing announcements */}
      <ul className="space-y-2">
        {announcements.map((ann) => (
          <li key={ann.id} className="border p-2 rounded">
            <div className="text-sm text-gray-600 mb-1">
              Posted on: {new Date(ann.createdAt).toLocaleString()}
            </div>
            <p>{ann.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminAnnouncements;
