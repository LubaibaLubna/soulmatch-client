import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa"; // 👑 Premium Icon

const PremiumMembers = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://ass-12-server-wheat.vercel.app/api/premium-biodatas")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) =>
          sortOrder === "asc" ? a.age - b.age : b.age - a.age
        );
        setBiodatas(sorted);
      });
  }, [sortOrder]);

  return (
    <section className="py-12 bg-gradient-to-b from-pink-50 to-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-pink-600 mb-10">
          Premium Members
        </h2>

        <div className="mb-6 flex justify-end">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-pink-300 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="asc">Age: Ascending</option>
            <option value="desc">Age: Descending</option>
          </select>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {biodatas.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white border border-gray-200 rounded-xl shadow-xl group hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Premium Icon */}
              <div className="absolute top-3 right-3 z-20 bg-yellow-400 text-white p-2 rounded-full shadow-md">
                <FaCrown className="text-sm" title="Premium Member" />
              </div>

              {/* Animated Background Glow */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-pink-100 via-white to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

              <div className="relative z-10 p-5">
                {/* Square Image */}
                <div className="w-full h-56 overflow-hidden mb-3 rounded-md relative">
                  <img
                    src={item.profileImage}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Centered Name */}
                <h3 className="text-xl font-bold text-center text-pink-600 mb-4">{item.name}</h3>

                {/* Two-Column Details */}
                <div className="grid grid-cols-2 text-sm gap-y-2 mb-4">
                  <div>
                    <p className="text-gray-600 font-medium">Biodata ID: {item.biodataId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Type / Age: {item.type} / {item.age}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Division: {item.permanentDivision}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Occupation: {item.occupation}</p>
                  </div>
                </div>

                {/* View Button */}
                <Link to={`/biodatas/${item._id}`}>
                  <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md font-semibold transition">
                    View Profile
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumMembers;
