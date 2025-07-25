import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CreateBiodataModal from "../../components/CreateBiodataModal";

const EditBiodata = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
      return;
    }

    const fetchBiodata = async () => {
      try {
        const res = await fetch(
          `https://ass-12-server-wheat.vercel.app/api/all-biodatas?email=${user.email}`
        );
        if (!res.ok) throw new Error("Failed to fetch biodata");

        const data = await res.json();
        const selected = Array.isArray(data) ? data[0] : data;

        setBiodata(selected || null);
      } catch (err) {
        console.error("❌ Error loading biodata:", err);
        setBiodata(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBiodata();
  }, [user, navigate]);

  const handleSuccess = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-20">Loading biodata...</div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">✏️ Edit Your Biodata</h2>

      {/* 🔁 Use same modal component here, but as a full-page component */}
      <CreateBiodataModal initialData={biodata} onSuccess={handleSuccess} />
    </div>
  );
};

export default EditBiodata;
