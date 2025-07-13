import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Check if we came from a protected route (like modal trigger)
  const redirectFrom = location.state?.from;

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Redirect based on intent
        if (redirectFrom === "modal") {
          navigate("/", { state: { openModal: true } });
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleGoogleLogin = () => {
    setError("");

    signInWithPopup(auth, googleProvider)
      .then(() => {
        if (redirectFrom === "modal") {
          navigate("/", { state: { openModal: true } });
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
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
            className="w-full bg-pink-400 text-white py-2 rounded hover:bg-pink-600 transition"
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
          Don't have an account?{" "}
          <Link to="/register" className="text-pink-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
