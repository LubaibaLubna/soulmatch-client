import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ass-12-server-wheat.vercel.app/api/biodata-stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
        setLoading(false);
      });
  }, []);

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#A569BD"];

  const chartData = stats
    ? [
        { name: "Male", value: stats.maleCount },
        { name: "Female", value: stats.femaleCount },
        {
          name: "Others",
          value: stats.total - stats.maleCount - stats.femaleCount,
        },
        { name: "Married", value: stats.marriageCount },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="text-pink-600 font-semibold text-lg">Loading stats...</span>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Failed to load stats.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">📊 Admin Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="text-lg text-gray-700 space-y-2">
          <p>Total Biodatas: <strong>{stats.total}</strong></p>
          <p>Male: <strong>{stats.maleCount}</strong></p>
          <p>Female: <strong>{stats.femaleCount}</strong></p>
          <p>Married Couples: <strong>{stats.marriageCount}</strong></p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
