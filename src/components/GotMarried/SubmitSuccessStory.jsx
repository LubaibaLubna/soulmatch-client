import { useState } from "react";
import Swal from "sweetalert2";

const SubmitSuccessStory = () => {
  const [form, setForm] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    marriageDate: "",
    stars: 5,
    story: "",
    coupleImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, coupleImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { selfBiodataId, partnerBiodataId, marriageDate, story, coupleImage } = form;

    if (!selfBiodataId || !partnerBiodataId || !marriageDate || !story || !coupleImage) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await fetch("https://ass-12-server-wheat.vercel.app/api/success-stories", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", "Your story has been submitted!", "success");
        setForm({
          selfBiodataId: "",
          partnerBiodataId: "",
          marriageDate: "",
          stars: 5,
          story: "",
          coupleImage: null,
        });
      } else {
        Swal.fire("Error", data.error || "Something went wrong", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to submit story", "error");
    }
  };

  return (
    <div className="bg-white py-12 px-4 max-w-3xl mx-auto mt-10 rounded shadow text-gray-800">
      <h3 className="text-2xl font-bold text-center text-pink-600 mb-6">📨 Submit Your Success Story</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Your Biodata ID</label>
          <input
            type="text"
            name="selfBiodataId"
            value={form.selfBiodataId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your biodata ID"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Partner's Biodata ID</label>
          <input
            type="text"
            name="partnerBiodataId"
            value={form.partnerBiodataId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter partner's biodata ID"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Marriage Date</label>
          <input
            type="date"
            name="marriageDate"
            value={form.marriageDate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Rating (1–5 stars)</label>
          <select
            name="stars"
            value={form.stars}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <option key={s} value={s}>
                {s} Star{s > 1 && "s"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Your Story</label>
          <textarea
            name="story"
            value={form.story}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
            placeholder="How did SoulMatch help you?"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Couple Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default SubmitSuccessStory;
