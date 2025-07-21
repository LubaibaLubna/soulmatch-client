import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

const MyFavourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user email
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user?.email) setUserEmail(user.email);
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    fetch(`http://localhost:5000/api/favourites?userEmail=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setFavourites(data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load favourites", "error");
        setLoading(false);
      });
  }, [userEmail]);

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Delete Favourite?",
      text: "Are you sure you want to remove this biodata from your favourites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/favourites/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setFavourites((prev) => prev.filter((fav) => fav._id !== id));
          Swal.fire("Deleted!", "Biodata removed from favourites.", "success");
        } else {
          Swal.fire("Error", "Failed to delete favourite", "error");
        }
      } catch {
        Swal.fire("Error", "Failed to delete favourite", "error");
      }
    }
  };

  if (loading) return <div className="text-center py-20">Loading favourites...</div>;

  if (!favourites.length)
    return <div className="text-center py-20 text-gray-500">No favourites found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-pink-700">My Favourite Biodatas</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-pink-100 text-pink-700">
              <th className="px-4 py-2 border border-pink-200">Name</th>
              <th className="px-4 py-2 border border-pink-200">Biodata ID</th>
              <th className="px-4 py-2 border border-pink-200">Permanent Address</th>
              <th className="px-4 py-2 border border-pink-200">Occupation</th>
              <th className="px-4 py-2 border border-pink-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {favourites.map(({ _id, biodata }) => (
              <tr key={_id} className="hover:bg-pink-50">
                <td className="border border-pink-200 px-4 py-2">{biodata.name}</td>
                <td className="border border-pink-200 px-4 py-2">{biodata.biodataId}</td>
                <td className="border border-pink-200 px-4 py-2">{biodata.permanentDivision}</td>
                <td className="border border-pink-200 px-4 py-2">{biodata.occupation}</td>
                <td className="border border-pink-200 px-4 py-2">
                  <button
                    onClick={() => handleDelete(_id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavourites;
