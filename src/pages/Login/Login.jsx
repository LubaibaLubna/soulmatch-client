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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const res = await axios.post("https://ass-12-server-wheat.vercel.app/api/users", {
        name: user.displayName || "Email User",
        email: user.email,
        photoURL: user.photoURL || "",
        role: "user",
      });

      localStorage.setItem("soulmatch-token", res.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await axios.post("https://ass-12-server-wheat.vercel.app/api/users", {
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
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/1G2Wk7Z0/pexels-jonathanborba-3397026.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0"></div>

      {/* Login Form */}
      <div className="relative z-10 max-w-md w-full bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-xl shadow-xl text-gray-700">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6 font-heading">
          Welcome Back to SoulMatch
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded focus:outline-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded focus:outline-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition font-semibold shadow"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm mb-2">OR</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition text-gray-700 font-medium"
          >      Continue with Google
          </button>
        </div>

        <p className="text-sm mt-5 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-pink-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
