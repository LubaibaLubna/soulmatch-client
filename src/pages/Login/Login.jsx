import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Send to backend to save user and get JWT token
      const res = await axios.post("http://localhost:5000/api/users", {
        name: user.displayName || "Email User",
        email: user.email,
        photoURL: user.photoURL || "",
        role: "user",
      });

      // Save JWT token in localStorage
      localStorage.setItem("soulmatch-token", res.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await axios.post("http://localhost:5000/api/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
      });

      localStorage.setItem("soulmatch-token", res.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-gray-600">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Login to SoulMatch
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">OR</p>
          <button
            onClick={handleGoogleLogin}
            className="mt-2 w-full border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
          >
            Continue with Google
          </button>
        </div>

        <p className="text-sm mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-pink-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
