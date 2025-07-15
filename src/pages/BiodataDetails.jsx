import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

const BiodataDetails = () => {
  const { id } = useParams();
  const [biodata, setBiodata] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/biodatas/${id}`)
      .then((res) => res.json())
      .then((data) => setBiodata(data));
  }, [id]);

  const handleSendInterest = () => {
    Swal.fire({
      icon: "success",
      title: "Interest Sent",
      text: `You have shown interest in Biodata #${biodata?.biodataId}`
    });
  };

  if (!biodata) {
    return <div className="text-center py-20 text-gray-600">Loading...</div>;
  }

  const imageUrl = biodata.profileImage?.startsWith("/")
    ? `http://localhost:5000${biodata.profileImage}`
    : `http://localhost:5000/uploads/${biodata.profileImage}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-pink-100">
        <div className="grid md:grid-cols-3 gap-6 p-6">
          {/* Image */}
          <div className="flex justify-center items-center">
            <img
              src={imageUrl}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border border-pink-200 shadow"
            />
          </div>

          {/* Basic Info */}
          <div className="md:col-span-2 space-y-2">
            <h2 className="text-2xl font-bold text-pink-700">{biodata.name}</h2>
            <p className="text-sm text-gray-500">Biodata ID: <span className="text-pink-600 font-medium">{biodata.biodataId}</span></p>
            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
              <Info label="Type" value={biodata.type} />
              <Info label="Age" value={biodata.age} />
              <Info label="DOB" value={biodata.dob} />
              <Info label="Occupation" value={biodata.occupation} />
              <Info label="Education" value={biodata.education} />
              <Info label="Religion" value={biodata.religion} />
              <Info label="Height" value={biodata.height} />
              <Info label="Weight" value={biodata.weight} />
              <Info label="Mobile" value={biodata.mobileNumber} />
              <Info label="Email" value={biodata.contactEmail} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-pink-100" />

        {/* Family & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 text-sm">
          <Info label="Father's Name" value={biodata.fatherName} />
          <Info label="Mother's Name" value={biodata.motherName} />
          <Info label="Permanent Division" value={biodata.permanentDivision} />
          <Info label="Present Division" value={biodata.presentDivision} />
        </div>

        {/* Preferences */}
        <div className="bg-pink-50 px-6 py-4">
          <h3 className="text-lg font-semibold text-pink-600 mb-3">Partner Preferences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <Info label="Expected Age" value={biodata.expectedPartnerAge} />
            <Info label="Expected Height" value={biodata.expectedPartnerHeight} />
            <Info label="Expected Weight" value={biodata.expectedPartnerWeight} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            ← Back
          </button>

          <button
            onClick={handleSendInterest}
            className="text-sm bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
          >
            ❤️ Send Interest
          </button>
        </div>
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
