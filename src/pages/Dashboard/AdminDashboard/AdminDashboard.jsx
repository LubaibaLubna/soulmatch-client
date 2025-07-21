import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/dashboard-stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard stats:", err);
        setLoading(false);
      });
  }, []);

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
    <div className="p-6 bg-white rounded shadow-md max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-pink-700">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard label="Total Biodata" value={stats.totalBiodataCount} />
        <StatCard label="Male Biodata" value={stats.maleBiodataCount} />
        <StatCard label="Female Biodata" value={stats.femaleBiodataCount} />
        <StatCard label="Premium Biodata" value={stats.premiumBiodataCount} />
        <StatCard
          label="Total Revenue"
          value={`৳ ${stats.totalRevenue.toLocaleString()}`}
        />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="p-4 border rounded-lg shadow-sm bg-pink-50 text-center">
    <p className="text-gray-500 font-semibold mb-2">{label}</p>
    <p className="text-2xl font-bold text-pink-700">{value}</p>
  </div>
);

export default AdminDashboard;
