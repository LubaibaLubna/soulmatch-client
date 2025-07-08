import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
            
            {/* Logo and Website Name */}
            <div className="flex items-center space-x-2">
                <img 
                    src="/logo.png" 
                    alt="SoulMatch Logo" 
                    className="h-8 w-8 object-contain"
                />
                <span className="text-xl font-bold text-gray-800">SoulMatch</span>
            </div>

            {/* Menu Links */}
            <div className="space-x-6 hidden md:flex items-center">
                <Link to="/" className="text-gray-700 hover:text-pink-600">Home</Link>
                <Link to="/biodatas" className="text-gray-700 hover:text-pink-600">Biodatas</Link>
                <Link to="/about" className="text-gray-700 hover:text-pink-600">About Us</Link>
                <Link to="/contact" className="text-gray-700 hover:text-pink-600">Contact Us</Link>

                {user ? (
                    <>
                        <Link to="/dashboard" className="text-gray-700 hover:text-pink-600 font-semibold">Dashboard</Link>
                        <button 
                            onClick={logout} 
                            className="text-gray-700 hover:text-pink-600 font-semibold"
                        >
                            Logout
                        </button>
                        {user.photoURL && (
                            <img
                                src={user.photoURL}
                                alt="User Avatar"
                                className="h-8 w-8 rounded-full border border-gray-300"
                            />
                        )}
                    </>
                ) : (
                    <Link to="/login" className="text-gray-700 hover:text-pink-600 font-semibold">Login</Link>
                )}
            </div>

            {/* Mobile Menu Icon Placeholder */}
            <div className="md:hidden">
                {/* You can add a mobile menu toggle here later */}
            </div>
        </nav>
    );
};

export default Navbar;
