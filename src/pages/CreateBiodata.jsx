import { useState } from "react";
import Swal from "sweetalert2";

const CreateBiodata = () => {
  const [formData, setFormData] = useState({
    type: "",
    profileImage: "",
    division: "",
    age: "",
    occupation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.type || !formData.profileImage || !formData.division) {
      return Swal.fire("Error", "Please fill all required fields", "error");
    }

    try {
      const res = await fetch("http://localhost:5000/api/biodatas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire("Success", "Biodata created successfully!", "success");
        setFormData({ type: "", profileImage: "", division: "", age: "", occupation: "" });
      } else {
        Swal.fire("Error", data.error || "Something went wrong", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to submit biodata", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-black px-4 py-10">
      <h2 className="text-2xl font-heading font-bold mb-6 text-center text-pink-600">Create Your Biodata</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-lg rounded-lg">

        {/* Biodata Type */}
        <div>
          <label className="block mb-1 font-medium">Biodata Type*</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Profile Image URL*</label>
          <input
            type="text"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Division */}
        <div>
          <label className="block mb-1 font-medium">Permanent Division*</label>
          <select
            name="division"
            value={formData.division}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattagram">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block mb-1 font-medium">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition"
          >
            Submit Biodata
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBiodata;
