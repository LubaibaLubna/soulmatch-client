import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";

const MyFavourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser?.email) {
      setUserEmail(currentUser.email);
      fetch(`https://ass-12-server-wheat.vercel.app/api/favourites/${currentUser.email}`)
        .then((res) => res.json())
        .then((data) => setFavourites(data));
    }
  }, []);

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      const res = await fetch(`https://ass-12-server-wheat.vercel.app/api/favourites/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFavourites((prev) => prev.filter((fav) => fav._id !== id));
        Swal.fire("Deleted!", "Favourite removed", "success");
      } else {
        Swal.fire("Error", "Failed to delete", "error");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 text-gray-800 py-10">
      <h2 className="text-2xl font-bold mb-6">My Favourite Biodatas</h2>
      {favourites.length === 0 ? (
        <p>No favourites found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Biodata ID</th>
              <th className="border p-2">Permanent Address</th>
              <th className="border p-2">Occupation</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {favourites.map((fav) => (
              <tr key={fav._id}>
                <td className="border p-2">{fav.name}</td>
                <td className="border p-2">{fav.biodataId}</td>
                <td className="border p-2">{fav.permanentDivision}</td>
                <td className="border p-2">{fav.occupation}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(fav._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyFavourites;
