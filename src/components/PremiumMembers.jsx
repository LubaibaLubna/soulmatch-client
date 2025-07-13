import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PremiumMembers = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:5000/api/premium-biodatas")
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) =>
          sortOrder === "asc" ? a.age - b.age : b.age - a.age
        );
        setBiodatas(sorted);
      });
  }, [sortOrder]);

  return (
    <section className="py-10 bg-gray-50 text-gray-700">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">Premium Members</h2>

        <div className="mb-4 text-right">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="asc">Age: Ascending</option>
            <option value="desc">Age: Descending</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {biodatas.map((item) => (
            <div key={item._id} className="bg-white shadow rounded p-4 text-center">
              <img
                src={`http://localhost:5000${item.profileImage}`}
                alt={item.name}
                className="w-32 h-32 object-cover mx-auto rounded-full"
              />
              <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
              <p>{item.type} | Age: {item.age}</p>
              <p>{item.permanentDivision}</p>
              <p>{item.occupation}</p>
              <Link to={`/biodatas/${item._id}`}>
                <button className="mt-3 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
                  View Profile
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumMembers;
