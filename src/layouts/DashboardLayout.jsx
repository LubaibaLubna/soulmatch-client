import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !authLoading) {
      navigate("/login");
      return;
    }

    if (user?.email) {
      fetch(`http://localhost:5000/api/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data.role); // 👈 "admin" or "user"
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch role:", err);
          setLoading(false);
        });
    }
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-pink-600 font-semibold text-xl">Loading Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Pass role to sidebar */}
      <Sidebar role={role} />

      {/* ✅ Render nested dashboard route */}
      <main className="flex-1 ml-0 md:ml-64 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
