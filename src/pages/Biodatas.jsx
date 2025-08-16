import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { FaFilter, FaUser } from "react-icons/fa";

const Biodatas = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [filters, setFilters] = useState({
    minAge: "",
    maxAge: "",
    gender: "",
    division: ""
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(false);
  const limit = 9;

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const pageParam = parseInt(searchParams.get("page")) || 1;
    const gender = searchParams.get("gender") || "";
    const division = searchParams.get("division") || "";
    const minAge = searchParams.get("minAge") || "";
    const maxAge = searchParams.get("maxAge") || "";
    const sortParam = searchParams.get("sort") || "newest";

    setPage(pageParam);
    setFilters({ gender, division, minAge, maxAge });
    setSort(sortParam);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams({
      page,
      sort,
      limit,
      gender: filters.gender,
      division: filters.division,
    });

    if (filters.minAge) query.append("minAge", parseInt(filters.minAge));
    if (filters.maxAge) query.append("maxAge", parseInt(filters.maxAge));

    setLoading(true);
    fetch(`https://ass-12-server-wheat.vercel.app/api/all-biodatas?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setBiodatas(data.biodatas);
        setTotal(data.total);
        setLoading(false);
      });
  }, [page, filters, sort]);

  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    const query = {
      ...newFilters,
      page: 1,
      sort,
    };
    setSearchParams(query);
  };

  const handleResetFilters = () => {
    const reset = {
      minAge: "",
      maxAge: "",
      gender: "",
      division: ""
    };
    setFilters(reset);
    setPage(1);
    setSearchParams({
      ...reset,
      page: 1,
      sort: "newest"
    });
  };

  const handleSortChange = (value) => {
    setSort(value);
    setSearchParams({
      ...filters,
      page,
      sort: value
    });
  };

  const handleViewProfile = (id) => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/biodata-details/${id}`);
    }
  };

  const renderPageButtons = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => {
            setPage(i);
            setSearchParams({ ...filters, page: i, sort });
          }}
          className={`px-3 py-1 rounded text-sm ${
            page === i ? "bg-pink-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            const prev = Math.max(1, page - 1);
            setPage(prev);
            setSearchParams({ ...filters, page: prev, sort });
          }}
          className="px-3 py-1 rounded bg-gray-300 text-sm"
        >
          &lt;
        </button>
        {pages}
        <button
          onClick={() => {
            const next = Math.min(totalPages, page + 1);
            setPage(next);
            setSearchParams({ ...filters, page: next, sort });
          }}
          className="px-3 py-1 rounded bg-gray-300 text-sm"
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-pink-50 px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow p-5 md:sticky md:top-20 h-fit border border-pink-100 text-gray-700">
         

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Min Age</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 mt-1"
                value={filters.minAge}
                onChange={(e) =>
                  handleFilterChange({ ...filters, minAge: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Max Age</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 mt-1"
                value={filters.maxAge}
                onChange={(e) =>
                  handleFilterChange({ ...filters, maxAge: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Gender</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1"
                value={filters.gender}
                onChange={(e) =>
                  handleFilterChange({ ...filters, gender: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Division</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1"
                value={filters.division}
                onChange={(e) =>
                  handleFilterChange({ ...filters, division: e.target.value })
                }
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

            <div>
              <label className="text-sm font-medium">Sort</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1"
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              className="mt-4 w-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded"
            >
              Reset Filters
            </button>
          </div>

          <Link
            to="/got-married"
            className="inline-block mt-6 text-pink-600 hover:underline text-sm"
          >
            Want to share your story? Click here
          </Link>
        </div>

        {/* Biodata Cards */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent border-solid rounded-full animate-spin"></div>
              </div>
            ) : biodatas.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">No biodatas found.</p>
            ) : (
              biodatas.map((data) => (
                <motion.div
                  key={data._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-pink-100"
                >
                  <img
                    src={data.profileImage}
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
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center mt-6 gap-3">
            <p className="text-sm text-gray-600">
              Showing <strong>{start}</strong>–<strong>{end}</strong> of <strong>{total}</strong>
            </p>
            {renderPageButtons()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biodatas;
