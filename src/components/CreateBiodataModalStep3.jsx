import { useRef, useState, useEffect } from "react";

const CreateBiodataModalStep3 = ({ formData, onChange, prevStep, onSubmit }) => {
  const fileInputRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (formData.profileImage && typeof formData.profileImage !== "string") {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(formData.profileImage);
    } else {
      setPreviewUrl(null);
    }
  }, [formData.profileImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange("profileImage", file);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-6 text-pink-600">Step 3: Expectations & Contact</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expected Partner Height */}
        <div>
          <label className="block mb-1 font-medium">Expected Partner Height*</label>
          <select
            value={formData.expectedPartnerHeight}
            onChange={(e) => onChange("expectedPartnerHeight", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select height</option>
            {generateHeights()}
          </select>
        </div>

        {/* Expected Partner Weight */}
        <div>
          <label className="block mb-1 font-medium">Expected Partner Weight*</label>
          <select
            value={formData.expectedPartnerWeight}
            onChange={(e) => onChange("expectedPartnerWeight", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select weight</option>
            {generateWeights()}
          </select>
        </div>

        {/* Expected Partner Age */}
        <div>
          <label className="block mb-1 font-medium">Expected Partner Age</label>
          <input
            type="number"
            value={formData.expectedPartnerAge}
            onChange={(e) => onChange("expectedPartnerAge", e.target.value)}
            className="w-full border rounded px-3 py-2"
            min="18"
            max="100"
          />
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Profile Image*</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded border"
            />
          )}
        </div>

        {/* Premium Profile Checkbox */}
        <div className="col-span-2">
          <label className="inline-flex items-center mt-2">
            <input
              type="checkbox"
              checked={formData.isPremium}
              onChange={(e) => onChange("isPremium", e.target.checked)}
              className="form-checkbox h-4 w-4 text-pink-600"
            />
            <span className="ml-2 text-sm text-gray-700 font-medium">Make this a Premium Profile</span>
          </label>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateBiodataModalStep3;

// Helper functions
function generateHeights() {
  const heights = [];
  const feet = [4, 5, 6];
  const inches = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  for (let f of feet) {
    for (let i of inches) {
      const label = `${f}'${i}"`;
      const val = `${f}ft ${i}in`;
      if ((f === 4 && i < 5) || (f === 6 && i > 7)) continue;
      heights.push(<option key={val} value={val}>{label}</option>);
    }
  }
  return heights;
}

function generateWeights() {
  const weights = [];
  for (let i = 40; i <= 120; i += 5) {
    weights.push(<option key={i} value={`${i}kg`}>{i} kg</option>);
  }
  return weights;
}
