import { useState } from "react";
import Swal from "sweetalert2";

const SubmitSuccessStory = () => {
  const [form, setForm] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    marriageDate: "",
    stars: 5,
    story: "",
    coupleImage: "", // now a string URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { selfBiodataId, partnerBiodataId, marriageDate, story, stars, coupleImage } = form;

    if (!selfBiodataId || !partnerBiodataId || !marriageDate || !story || !coupleImage) {
      return Swal.fire("Error", "Please fill in all fields", "error");
    }

    try {
      // No upload needed since user provides URL directly
      // Just send the data to your server
      const res = await fetch("https://ass-12-server-wheat.vercel.app/api/success-stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selfBiodataId,
          partnerBiodataId,
          marriageDate,
          stars: parseInt(stars),
          story,
          coupleImage, // direct URL from user input
        }),
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
          coupleImage: "",
        });
      } else {
        Swal.fire("Error", data.error || "Submission failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
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
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Couple Image URL</label>
          <input
            type="url"
            name="coupleImage"
            value={form.coupleImage}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Paste image URL here"
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
