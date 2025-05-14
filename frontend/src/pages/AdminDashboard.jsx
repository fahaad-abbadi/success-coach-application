// AdminDashboard.jsx - enhanced with multiple charts
import React, { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 10,
    totalComments: 20,
    totalUsers: 50,
    deletedPosts: 9,
  });
  const [postTrends, setPostTrends] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const s = await ApiService.getDashboardStats();
      const t = await ApiService.getWeeklyPostStats();
      const c = await ApiService.getCategoryDistribution();
      const e = await ApiService.getEngagementStats();

      if (s.status === 200) setStats(s.data);
      if (t.status === 200) setPostTrends(t.data);
      if (c.status === 200) setCategoryData(c.data);
      if (e.status === 200) setEngagementData(e.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Stats Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Posts" value={stats.totalPosts} />
        <StatCard label="Total Comments" value={stats.totalComments} />
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Deleted Posts" value={stats.deletedPosts} />
      </div>

      {/* Line Chart - Post Trends */}
      <ChartBox title="Post Trends">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={postTrends}>
            <XAxis dataKey="date" /><YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>

      {/* Pie Chart - Category Distribution */}
      <ChartBox title="Category Popularity">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={100}>
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartBox>

      {/* Radar Chart - Engagement Overview */}
      <ChartBox title="Engagement Breakdown">
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={engagementData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="type" />
            <PolarRadiusAxis />
            <Radar name="Engagement" dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </ChartBox>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ChartBox = ({ title, children }) => (
  <div className="bg-white p-4 mb-6 rounded shadow">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export default AdminDashboard;