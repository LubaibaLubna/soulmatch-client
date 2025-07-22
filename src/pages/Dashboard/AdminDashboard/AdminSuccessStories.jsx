import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminSuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/success-stories")
      .then((res) => res.json())
      .then(setStories)
      .catch(() => setStories([]));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">💑 Success Stories</h2>
      <table className="w-full border text-sm">
        <thead className="bg-pink-100">
          <tr>
            <th className="p-3 border">Self Biodata ID</th>
            <th className="p-3 border">Partner Biodata ID</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story) => (
            <tr key={story._id} className="hover:bg-pink-50">
              <td className="p-3 border">{story.selfBiodataId}</td>
              <td className="p-3 border">{story.partnerBiodataId}</td>
              <td className="p-3 border text-center">
                <button
                  className="bg-pink-600 text-white px-3 py-1 rounded"
                  onClick={() =>
                    Swal.fire({
                      title: "💖 Success Story",
                      html: `
                        <img src="http://localhost:5000/uploads/${story.coupleImage}" alt="couple" style="max-height:200px; width:auto; margin-bottom:1rem;" />
                        <p><strong>Story:</strong> ${story.story}</p>
                        <p><strong>Rating:</strong> ${story.stars} Stars</p>
                        <p><strong>Date:</strong> ${story.marriageDate}</p>
                      `,
                      confirmButtonColor: "#d63384"
                    })
                  }
                >
                  View Story
                </button>
              </td>
            </tr>
          ))}
          {stories.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-6 text-gray-500">
                No stories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSuccessStories;
