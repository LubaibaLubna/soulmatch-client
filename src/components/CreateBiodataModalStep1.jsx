

const CreateBiodataModalStep1 = ({ formData, onChange, nextStep }) => {


  const generateHeightOptions = () => {
    const options = [];
    for (let ft = 4; ft <= 6; ft++) {
      for (let inch = 0; inch <= 11; inch++) {
        if ((ft === 4 && inch < 5) || (ft === 6 && inch > 7)) continue;
        options.push(`${ft}'${inch}"`);
      }
    }
    return options;
  };

  const generateWeightOptions = () => {
    const options = [];
    for (let w = 35; w <= 150; w += 1) {
      options.push(`${w}kg`);
    }
    return options;
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Step 1: Basic Info</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Biodata Type */}
        <div>
          <label className="block mb-1 font-medium">Biodata Type*</label>
          <select
            value={formData.type}
            onChange={(e) => onChange("type", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name*</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>



        {/* Date of Birth */}
        <div>
          <label className="block mb-1 font-medium">Date of Birth*</label>
          <input
            type="date"
            min="1980-01-01"
            max={new Date().toISOString().split("T")[0]}
            value={formData.dob}
            onChange={(e) => onChange("dob", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>


                {/* Permanent Division */}
        <div>
          <label className="block mb-1 font-medium">Permanent Division*</label>
          <select
            value={formData.permanentDivision}
            onChange={(e) => onChange("permanentDivision", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select division</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattagram">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        </div>

        {/* Present Division */}
        <div>
          <label className="block mb-1 font-medium">Present Division*</label>
          <select
            value={formData.presentDivision}
            onChange={(e) => onChange("presentDivision", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select division</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattagram">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        </div>

        {/* Height */}
        <div>
          <label className="block mb-1 font-medium">Height*</label>
          <select
            value={formData.height}
            onChange={(e) => onChange("height", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select height</option>
            {generateHeightOptions().map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-1 font-medium">Weight*</label>
          <select
            value={formData.weight}
            onChange={(e) => onChange("weight", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select weight</option>
            {generateWeightOptions().map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-right mt-4">
        <button
          type="button"
          onClick={nextStep}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateBiodataModalStep1;
