// src/layouts/DashboardLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin"; // Ensure role is set when user logs in

  return (
    <div className="flex min-h-screen text-gray-600">
      {/* Sidebar */}
      <aside className="w-64 bg-pink-100 p-4 space-y-4 shadow-md">
        <h2 className="text-xl font-bold text-pink-700">Dashboard</h2>

        {!isAdmin ? (
          <>
            <NavLink to="/dashboard/edit-biodata" className="block hover:text-pink-600">Edit Biodata</NavLink>
            <NavLink to="/dashboard/view-biodata" className="block hover:text-pink-600">View Biodata</NavLink>
            <NavLink to="/dashboard/my-contact-request" className="block hover:text-pink-600">My Contact Request</NavLink>
            <NavLink to="/dashboard/favourites" className="block hover:text-pink-600">Favourites</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/dashboard/admin" className="block hover:text-pink-600">Admin Dashboard</NavLink>
            <NavLink to="/dashboard/manage-users" className="block hover:text-pink-600">Manage Users</NavLink>
            <NavLink to="/dashboard/approved-premium" className="block hover:text-pink-600">Approved Premium</NavLink>
            <NavLink to="/dashboard/approved-requests" className="block hover:text-pink-600">Approved Contact Request</NavLink>
          </>
        )}

        <NavLink to="/" className="block text-red-500 hover:text-red-700">← Logout</NavLink>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
