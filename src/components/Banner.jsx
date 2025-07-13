import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import CreateBiodataModal from "../components/CreateBiodataModal";

const images = [
  "https://i.ibb.co/v4pN8BfY/pexels-wolrider-32632269.jpg",
  "https://i.ibb.co/Y7VqfjDQ/pexels-minan1398-752831.jpg",
  "https://i.ibb.co/r2FGzLwT/pexels-esther-huynh-bich-1211596-2892199.jpg",
  "https://i.ibb.co/4Z1KF4pS/pexels-anhtuank7c-1806361.jpg",
  "https://i.ibb.co/fYg3Wyy4/pexels-emmawiseman-2871648.jpg",
  "https://i.ibb.co/hJ0MbmmL/pexels-christy-chacko-3786097-32878569.jpg",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(handleNext, 3000);
    return () => clearInterval(timer);
  }, []);

  // If redirected from login, show modal
  useEffect(() => {
    if (location.state?.openModal) {
      setShowModal(true);
    }
  }, [location.state]);

  // Handle profile button
  const handleCreateProfileClick = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please login first to add biodatas",
        confirmButtonText: "Login Now",
      }).then(() => {
        navigate("/login", { state: { from: "modal" } });
      });
    } else {
      setShowModal(true);
    }
  };

  const handleSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Profile Created Successfully!",
      showConfirmButton: false,
      timer: 2000,
    });
    setShowModal(false);
  };

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <img
        src={images[current]}
        alt="SoulMatch Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-white text-3xl md:text-5xl font-heading font-bold drop-shadow-lg"
        >
          Find Your Soulmate with SoulMatch
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
          className="text-white text-lg md:text-xl mt-4 max-w-xl font-body"
        >
          Join thousands of happy couples. Create your profile today and meet your perfect match.
        </motion.p>

        <motion.button
          onClick={handleCreateProfileClick}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full text-sm md:text-base font-body transition"
        >
          Create Your Profile
        </motion.button>
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/60 hover:bg-white text-pink-600 p-2 rounded-full shadow"
        aria-label="Previous Slide"
      >
        <FaArrowLeft size={18} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/60 hover:bg-white text-pink-600 p-2 rounded-full shadow"
        aria-label="Next Slide"
      >
        <FaArrowRight size={18} />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl relative overflow-y-auto max-h-[90vh] p-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-black text-xl font-bold hover:text-red-500"
              aria-label="Close modal"
            >
              ✕
            </button>
            <CreateBiodataModal onSuccess={handleSuccess} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
