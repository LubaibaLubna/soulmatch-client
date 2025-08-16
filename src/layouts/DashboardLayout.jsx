import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && !authLoading) {
      navigate("/login");
      return;
    }

    if (user?.email) {
      fetch(`https://ass-12-server-wheat.vercel.app/api/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data.role); // "admin" or "user"
          setLoading(false);

          // Role-based redirect only if on exact /dashboard
          if (location.pathname === "/dashboard") {
            if (data.role === "admin") {
              navigate("/dashboard/admin");
            } else {
              navigate("/dashboard/edit-biodata");
            }
          }
        })
        .catch((err) => {
          console.error("Failed to fetch role:", err);
          setLoading(false);
        });
    }
  }, [user, authLoading, navigate, location.pathname]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-pink-600 font-semibold text-xl">Loading Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-full bg-white shadow-lg z-10">
        <Sidebar role={role} />
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 overflow-auto min-h-screen">
        <Outlet context={{ role }} /> {/* Pass role to children if needed */}
      </main>
    </div>
  );
};

export default DashboardLayout;

//add
