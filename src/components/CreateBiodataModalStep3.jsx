const CreateBiodataModalStep3 = ({ formData, onChange, prevStep, onSubmit }) => {
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

        {/* Image URL Input (Instead of Upload) */}
        <div>
          <label className="block mb-1 font-medium">Profile Image URL*</label>
          <input
            type="url"
            value={formData.profileImage}
            onChange={(e) => onChange("profileImage", e.target.value)}
            placeholder="Paste imgbb image URL"
            className="w-full border rounded px-3 py-2"
            required
          />
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded border"
            />
          )}
        </div>

        {/* Last Education */}
        <div>
          <label className="block mb-1 font-medium">Last Education</label>
          <select
            value={formData.education}
            onChange={(e) => onChange("education", e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select education</option>
            <option value="SSC">SSC</option>
            <option value="HSC">HSC</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>
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
