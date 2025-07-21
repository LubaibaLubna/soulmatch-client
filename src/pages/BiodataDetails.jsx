import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const BiodataDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

useEffect(() => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) {
    navigate("/login");
    return;
  }

  fetch(`http://localhost:5000/api/users/${currentUser.email}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("✅ User loaded: ", data);
      setUser(data);
    })
    .catch(() => {
      setUser(null);
      console.log("❌ Failed to load user data");
    });
}, [navigate]);


  const {
    data: biodata,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["biodata", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/biodatas/${id}`);
      return res.json();
    },
    enabled: !!id,
  });

  const [similarBiodatas, setSimilarBiodatas] = useState([]);

  useEffect(() => {
    if (!biodata) return;
    fetch(
      `http://localhost:5000/api/similar-biodatas?type=${encodeURIComponent(
        biodata.type
      )}&excludeId=${id}`
    )
      .then((res) => res.json())
      .then((similar) => setSimilarBiodatas(similar))
      .catch(() => setSimilarBiodatas([]));
  }, [biodata, id]);

const handleAddFavourite = async () => {
  if (!user?.email) {
    Swal.fire("Error", "User not logged in", "error");
    return;
  }
  if (!biodata?._id) {
    Swal.fire("Error", "Biodata info missing", "error");
    return;
  }

  try {
    console.log("📤 Sending favourite:", {
      userEmail: user.email,
      favouriteBiodataId: biodata._id.toString(),
    });

    const res = await fetch("http://localhost:5000/api/favourites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: user.email,
        biodataId: biodata._id.toString(),
      }),
    });

    const result = await res.json();
    if (res.ok) {
      Swal.fire("Success", "Added to favourites!", "success");
    } else {
      Swal.fire("Error", result.error, "error");
    }
  } catch (error) {
    Swal.fire("Error", "Failed to add favourite", "error");
  }
};


  const handleRequestContact = () => {
    navigate(`/checkout/${id}`);
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error || !biodata) return <div className="text-center py-20">Biodata not found</div>;

  const imageUrl = biodata.profileImage?.startsWith("/")
    ? `http://localhost:5000${biodata.profileImage}`
    : `http://localhost:5000/uploads/${biodata.profileImage}`;

  const canViewContact = user?.isPremium === true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl border border-pink-100 overflow-hidden">
        <div className="grid md:grid-cols-3 gap-6 p-6">
          <div className="flex justify-center items-center">
            <img
              src={imageUrl}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border border-pink-200 shadow"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <h2 className="text-2xl font-bold text-pink-700">{biodata.name}</h2>
            <p className="text-sm text-gray-500">
              Biodata ID: <span className="text-pink-600 font-medium">{biodata.biodataId}</span>
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
              <Info label="Type" value={biodata.type} />
              <Info label="Age" value={biodata.age} />
              <Info label="DOB" value={biodata.dob} />
              <Info label="Occupation" value={biodata.occupation} />
              <Info label="Education" value={biodata.education} />
              <Info label="Religion" value={biodata.religion} />
              <Info label="Height" value={biodata.height} />
              <Info label="Weight" value={biodata.weight} />
              <Info label="Mobile" value={canViewContact ? biodata.mobileNumber : "Only Premium Members"} />
              <Info label="Email" value={canViewContact ? biodata.contactEmail : "Only Premium Members"} />
            </div>
          </div>
        </div>

        <hr className="border-pink-100" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 text-sm">
          <Info label="Father's Name" value={biodata.fatherName} />
          <Info label="Mother's Name" value={biodata.motherName} />
          <Info label="Permanent Division" value={biodata.permanentDivision} />
          <Info label="Present Division" value={biodata.presentDivision} />
        </div>

        <div className="bg-pink-50 px-6 py-4">
          <h3 className="text-lg font-semibold text-pink-600 mb-3">Partner Preferences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <Info label="Expected Age" value={biodata.expectedPartnerAge} />
            <Info label="Expected Height" value={biodata.expectedPartnerHeight} />
            <Info label="Expected Weight" value={biodata.expectedPartnerWeight} />
          </div>
        </div>

        <div className="flex justify-between items-center px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            ← Back
          </button>

          <div className="flex gap-2">
<button
  onClick={handleAddFavourite}
  disabled={!user?.email}
  className={`text-sm px-4 py-2 rounded ${
    user?.email ? 'bg-pink-600 hover:bg-pink-700 text-white' : 'bg-gray-300 cursor-not-allowed'
  }`}
>
  ⭐ Add to Favourites
</button>


            {!canViewContact && (
              <button
                onClick={handleRequestContact}
                className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                🔒 Request Contact Info
              </button>
            )}
          </div>
        </div>

        {similarBiodatas.length > 0 && (
          <div className="p-6 text-gray-600">
            <h3 className="text-xl font-semibold mb-4">Similar Biodatas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {similarBiodatas.map((similar) => (
                <div
                  key={similar._id}
                  onClick={() => navigate(`/biodata-details/${similar._id}`)}
                  className="cursor-pointer border rounded p-4 hover:shadow-lg"
                >
                  <img
                    src={
                      similar.profileImage?.startsWith("/")
                        ? `http://localhost:5000${similar.profileImage}`
                        : `http://localhost:5000/uploads/${similar.profileImage}`
                    }
                    alt={similar.name}
                    className="w-full h-32 object-cover rounded"
                  />
                  <h4 className="mt-2 font-semibold">{similar.name}</h4>
                  <p className="text-sm text-gray-600">Age: {similar.age}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <span className="text-gray-500 font-medium">{label}: </span>
    <span className="text-gray-800">{value || "N/A"}</span>
  </div>
);

export default BiodataDetails;
