import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire("Logged Out!", "You have been logged out successfully.", "success");
            navigate("/"); 
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50 font-body">
      <nav className="max-w-screen-xl mx-auto px-10 py-3 flex items-center justify-between">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <span className="text-4xl">💖</span>
          <span className="text-2xl font-heading font-bold text-pink-600">SoulMatch</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center text-sm md:text-base text-gray-800 font-semibold">
          <li><Link to="/" className="hover:text-pink-600 transition">Home</Link></li>
          <li><Link to="/biodatas" className="hover:text-pink-600 transition">Biodatas</Link></li>
          <li><Link to="/about" className="hover:text-pink-600 transition">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-pink-600 transition">Contact Us</Link></li>

          {!user ? (
            <li>
              <Link to="/login" className="bg-pink-600 text-white px-4 py-1.5 rounded-full hover:bg-pink-700 transition">
                Login
              </Link>
            </li>
          ) : (
            <>
              <li><Link to="/dashboard" className="hover:text-pink-600 transition">Dashboard</Link></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Toggle Button */}
        <div className="md:hidden z-50">
          <button onClick={handleToggle} className="text-pink-600">
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-6 shadow-lg">
          <ul className="space-y-4 text-base text-gray-700">
            <li><Link to="/" onClick={closeMenu} className="block hover:text-pink-600">Home</Link></li>
            <li><Link to="/biodatas" onClick={closeMenu} className="block hover:text-pink-600">Biodatas</Link></li>
            <li><Link to="/about" onClick={closeMenu} className="block hover:text-pink-600">About Us</Link></li>
            <li><Link to="/contact" onClick={closeMenu} className="block hover:text-pink-600">Contact Us</Link></li>

            {!user ? (
              <li>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block bg-pink-600 text-white px-4 py-2 rounded-full text-center hover:bg-pink-700"
                >
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/dashboard" onClick={closeMenu} className="block hover:text-pink-600">
                    Dashboard
                  </Link>



                </li>
                <li>
                  <button
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
