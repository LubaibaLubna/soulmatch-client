import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BiodataDetails = () => {
  const { id } = useParams();
  const [biodata, setBiodata] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/biodatas/${id}`)
      .then(res => res.json())
      .then(data => setBiodata(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!biodata) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={`http://localhost:5000${biodata.profileImage}`} className="w-48 h-48 object-cover rounded" />
      <h2 className="text-2xl font-bold mt-4">{biodata.name}</h2>
      <p>Age: {biodata.age}</p>
      <p>Occupation: {biodata.occupation}</p>
      <p>Permanent Division: {biodata.permanentDivision}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default BiodataDetails;
