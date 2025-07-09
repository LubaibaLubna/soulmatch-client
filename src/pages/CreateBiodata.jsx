import { useState } from "react";
import Swal from "sweetalert2";

const CreateBiodata = () => {
  const [formData, setFormData] = useState({
    type: "",
    division: "",
    age: "",
    occupation: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image file select
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);

    // For preview
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.type || !formData.division || !profileImageFile) {
      return Swal.fire("Error", "Please fill all required fields", "error");
    }

    try {
      // Prepare multipart/form-data
      const data = new FormData();
      data.append("type", formData.type);
      data.append("division", formData.division);
      data.append("age", formData.age);
      data.append("occupation", formData.occupation);
      data.append("profileImage", profileImageFile);

      const res = await fetch("http://localhost:5000/api/biodatas", {
        method: "POST",
        body: data,
      });

      const response = await res.json();

      if (res.ok) {
        Swal.fire("Success", "Biodata created successfully!", "success");
        setFormData({ type: "", division: "", age: "", occupation: "" });
        setProfileImageFile(null);
        setPreviewUrl(null);
      } else {
        Swal.fire("Error", response.error || "Something went wrong", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to submit biodata", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-black px-4 py-10">
      <h2 className="text-2xl font-heading font-bold mb-6 text-center text-pink-600">Create Your Biodata</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-lg rounded-lg" encType="multipart/form-data">

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

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Profile Image*</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="mt-2 h-32 object-cover rounded" />
          )}
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
