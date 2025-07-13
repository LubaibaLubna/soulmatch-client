import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { FaFilter, FaUser } from "react-icons/fa";

const Biodatas = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    minAge: "",
    maxAge: "",
    gender: "",
    division: ""
  });

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    fetch("http://localhost:5000/api/all-biodatas")
      .then((res) => res.json())
      .then((data) => {
        setBiodatas(data.slice(0, 20));
        setFiltered(data.slice(0, 20));
      });
  }, []);

  useEffect(() => {
    const { minAge, maxAge, gender, division } = filters;

    let filteredData = [...biodatas];

    if (gender) {
      filteredData = filteredData.filter((b) => b.type === gender);
    }

    if (division) {
      filteredData = filteredData.filter((b) => b.permanentDivision === division);
    }

    if (minAge) {
      filteredData = filteredData.filter((b) => parseInt(b.age) >= parseInt(minAge));
    }

    if (maxAge) {
      filteredData = filteredData.filter((b) => parseInt(b.age) <= parseInt(maxAge));
    }

    setFiltered(filteredData);
  }, [filters]);

  const handleViewProfile = (id) => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/biodata-details/${id}`);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-pink-50 px-4 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="bg-white rounded-lg shadow p-5 md:sticky md:top-20 h-fit border border-pink-100 text-gray-700">
          <h2 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
            <FaFilter /> Filter Biodatas
          </h2>

          <div className="space-y-4">
            {/* Age Range */}
            <div>
              <label className="text-sm font-medium">Min Age</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 mt-1"
                value={filters.minAge}
                onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Max Age</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 mt-1"
                value={filters.maxAge}
                onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-medium">Gender</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1"
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Division */}
            <div>
              <label className="text-sm font-medium">Division</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1"
                value={filters.division}
                onChange={(e) => setFilters({ ...filters, division: e.target.value })}
              >
                <option value="">All</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattagram">Chattagram</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Barisal">Barisal</option>
                <option value="Khulna">Khulna</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>
          </div>

                            <Link
  to="/submit-story"
  className="inline-block mt-6 text-pink-600 hover:underline text-sm"
>
  Want to share your story? Click here
</Link>
        </div>

        

        {/* Biodata Cards */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No biodatas found.</p>
          )}

          {filtered.map((data) => (
            <motion.div
              key={data._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-pink-100"
            >
              <img
                src={`http://localhost:5000${data.profileImage}`}
                alt="profile"
                className="w-full h-56 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2">
                  <FaUser /> Biodata #{data.biodataId}
                </h3>
                <p className="text-sm text-gray-600">Type: {data.type}</p>
                <p className="text-sm text-gray-600">Division: {data.permanentDivision}</p>
                <p className="text-sm text-gray-600">Age: {data.age}</p>
                <p className="text-sm text-gray-600">Occupation: {data.occupation}</p>

                <button
                  onClick={() => handleViewProfile(data._id)}
                  className="mt-3 inline-block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded text-sm"
                >
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


    </section>


  );
};

export default Biodatas;
