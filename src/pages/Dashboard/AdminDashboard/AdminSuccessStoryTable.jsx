import { useEffect, useState } from "react";
import { X } from "lucide-react"; // Optional: icon for modal close

const AdminSuccessStoryTable = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/success-stories")
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((err) => console.error("Error loading stories:", err));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
        💍 Admin Success Stories
      </h2>

      {stories.length === 0 ? (
        <p className="text-center text-gray-600">No success stories submitted yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow ring-1 ring-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-pink-100 text-pink-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Male Biodata ID</th>
                <th className="px-6 py-4">Female Biodata ID</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story) => (
                <tr
                  key={story._id}
                  className="border-t hover:bg-pink-50 transition duration-200 text-gray-700"
                >
                  <td className="px-6 py-3">{story.selfBiodataId}</td>
                  <td className="px-6 py-3">{story.partnerBiodataId}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => setSelectedStory(story)}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1.5 rounded-full text-xs transition duration-200"
                    >
                      View Story
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X size={22} />
            </button>

            <h3 className="text-xl font-semibold text-pink-600 mb-4 text-center">Success Story</h3>

            {selectedStory.coupleImage && (
              <img
                src={`http://localhost:5000${selectedStory.coupleImage}`}
                alt="Couple"
                className="w-full h-52 object-cover rounded-lg shadow mb-4"
              />
            )}

            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed text-justify">
              {selectedStory.story}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSuccessStoryTable;
