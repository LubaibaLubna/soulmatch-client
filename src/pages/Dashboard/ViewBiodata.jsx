import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
import axios from "axios";

const ViewBiodata = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user?.email) {
      axios
        .get(`https://ass-12-server-wheat.vercel.app/api/user-biodatas?email=${user.email}`)
        .then((res) => {
          setBiodatas(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire("Error", "Failed to fetch your biodatas", "error");
        });
    }
  }, []);

  const handleMakePremium = async (id) => {
    const confirm = await Swal.fire({
      title: "Make Premium?",
      text: "Are you sure you want to request premium approval?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, request it",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.put(
          `https://ass-12-server-wheat.vercel.app/api/biodatas/request-premium/${id}`
        );
        Swal.fire("Success", res.data.message, "success");
      } catch {
        Swal.fire("Error", "Failed to request premium", "error");
      }
    }
  };

  if (loading) return <p className="p-4 text-center">Loading biodata...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4">
      {biodatas.length === 0 ? (
        <p className="text-center text-gray-500">No biodata found.</p>
      ) : (
        biodatas.map((biodata) => (
          <div
            key={biodata._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden mb-10 border border-gray-200 hover:shadow-xl transition"
          >
            <div className="flex flex-col md:flex-row">
              {/* Profile Image (imgbb link) */}
              <div className="md:w-1/3 w-full">
                <img
                  src={biodata.profileImage}
                  alt={biodata.name}
                  className="w-full h-full object-cover object-center md:rounded-l-2xl"
                />
              </div>

              {/* Biodata Info */}
              <div className="md:w-2/3 w-full p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{biodata.name}</h3>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      biodata.isPremium
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {biodata.isPremium
                      ? "Premium"
                      : biodata.status === "requested"
                      ? "Pending Approval"
                      : "Standard"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                  <p><strong>Biodata ID:</strong> {biodata.biodataId}</p>
                  <p><strong>Gender:</strong> {biodata.type}</p>
                  <p><strong>DOB:</strong> {biodata.dob}</p>
                  <p><strong>Age:</strong> {biodata.age}</p>
                  <p><strong>Height:</strong> {biodata.height}</p>
                  <p><strong>Weight:</strong> {biodata.weight}</p>
                  <p><strong>Occupation:</strong> {biodata.occupation}</p>
                  <p><strong>Race:</strong> {biodata.race}</p>
                  <p><strong>Father's Name:</strong> {biodata.fatherName}</p>
                  <p><strong>Mother's Name:</strong> {biodata.motherName}</p>
                  <p><strong>Permanent Division:</strong> {biodata.permanentDivision}</p>
                  <p><strong>Present Division:</strong> {biodata.presentDivision}</p>
                  <p><strong>Contact Email:</strong> {biodata.contactEmail}</p>
                  <p><strong>Mobile Number:</strong> {biodata.mobileNumber}</p>
                </div>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-md font-semibold text-gray-800 mb-2">
                    Expected Partner Preferences
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700 text-sm">
                    <p><strong>Age:</strong> {biodata.expectedPartnerAge}</p>
                    <p><strong>Height:</strong> {biodata.expectedPartnerHeight}</p>
                    <p><strong>Weight:</strong> {biodata.expectedPartnerWeight}</p>
                  </div>
                </div>

                {/* Make Premium Button */}
                {!biodata.isPremium && biodata.status !== "requested" && (
                  <div className="mt-6">
                    <button
                      onClick={() => handleMakePremium(biodata._id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Make Biodata Premium
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewBiodata;
