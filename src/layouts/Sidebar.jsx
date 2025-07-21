import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  FaBars,
  FaTimes,
  FaUserEdit,
  FaAddressCard,
  FaHeart,
  FaEnvelope,
  FaUsers,
  FaCheckCircle,
  FaTachometerAlt,
} from "react-icons/fa";

const Sidebar = ({ role }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setOpen(!open);
  const closeSidebar = () => setOpen(false);

  const isActive = (path) => {
    if (location.pathname === "/dashboard" && path === "/dashboard/edit-biodata") {
      return true;
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded transition ${
      isActive(path)
        ? "bg-pink-100 font-semibold text-pink-700"
        : "text-gray-300 hover:bg-pink-100 hover:text-pink-700"
    }`;

  return (
    <aside
      className="bg-gray-900 w-full h-screen fixed md:static top-0 left-0 z-[1000] md:w-64 pt-16"
    >
      {/* Mobile topbar */}
      <div className="flex justify-between items-center md:hidden px-4 py-3 border-b border-pink-200">
        <h2 className="text-lg font-bold text-pink-600">Dashboard</h2>
        <button
          onClick={toggleSidebar}
          className="text-pink-600 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className={`md:block bg-gray-900 ${
          open ? "block" : "hidden"
        } px-4 py-4 transition-all duration-300`}
      >
        {role === "user" && (
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/dashboard/edit-biodata"
                onClick={closeSidebar}
                className={linkClass("/dashboard/edit-biodata")}
              >
                <FaUserEdit /> Edit Biodata
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/view-biodata"
                onClick={closeSidebar}
                className={linkClass("/dashboard/view-biodata")}
              >
                <FaAddressCard /> View Biodata
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-contact-request"
                onClick={closeSidebar}
                className={linkClass("/dashboard/my-contact-request")}
              >
                <FaEnvelope /> My Contact Request
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/favourites"
                onClick={closeSidebar}
                className={linkClass("/dashboard/favourites")}
              >
                <FaHeart /> Favourites Biodata
              </Link>
            </li>
          </ul>
        )}

        {role === "admin" && (
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/dashboard/admin"
                onClick={closeSidebar}
                className={linkClass("/dashboard/admin")}
              >
                <FaTachometerAlt /> Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage-users"
                onClick={closeSidebar}
                className={linkClass("/dashboard/manage-users")}
              >
                <FaUsers /> Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/approved-premium"
                onClick={closeSidebar}
                className={linkClass("/dashboard/approved-premium")}
              >
                <FaCheckCircle /> Approved Premium
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/approved-contact-request"
                onClick={closeSidebar}
                className={linkClass("/dashboard/approved-contact-request")}
              >
                <FaEnvelope /> Approved Contact Request
              </Link>
            </li>
          </ul>
        )}

        {/* Logout fixed at bottom */}
        <div className="absolute bottom-4 left-0 w-full px-4">
          <button
            onClick={() => signOut(auth)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            <FaTimes /> Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
