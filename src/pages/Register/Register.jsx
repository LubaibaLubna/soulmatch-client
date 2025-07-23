import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      // Firebase create account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Firebase update profile
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });

      // Save user to MongoDB
      await axios.post("https://ass-12-server-wheat.vercel.app/api/users", {
        email,
        name,
        role: "user",
        photoURL,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: "url('https://i.ibb.co/5gnVZq3W/pexels-asadphoto-1024993.jpg')", // ✅ Replace this with your own link
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-60 z-0"></div>

      {/* Form */}
      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200 text-gray-700">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6 font-heading">
          Create Your Account
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

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
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition font-medium"
          >
            Register
          </button>
        </form>

        <p className="text-sm mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
