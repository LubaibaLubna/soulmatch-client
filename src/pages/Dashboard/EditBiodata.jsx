import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BiodataForm from "./BiodataForm";

const EditBiodata = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBiodata = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/biodatas?email=${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch biodata");
        const data = await res.json();
        setBiodata(data);
      } catch (err) {
        console.error(err);
        setBiodata(null); // no biodata found, user can create new
      } finally {
        setLoading(false);
      }
    };

    fetchBiodata();
  }, [user, navigate]);

  if (loading) {
    return <div className="text-center mt-20">Loading your biodata...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white  rounded shadow">
      <h1 className="text-3xl text-pink-600 font-bold mb-6">Edit Your Biodata</h1>
      <BiodataForm
        initialData={biodata}
        onSuccess={() => navigate("/dashboard")}
      />
    </div>
  );
};

export default EditBiodata;
