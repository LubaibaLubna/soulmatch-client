import { useState, useEffect } from "react";

const CreateBiodataModalStep2 = ({ formData, onChange, nextStep, prevStep }) => {
  const [mobileError, setMobileError] = useState("");

  // ✅ Handle mobile number input with validation
  const handleMobileChange = (value) => {
    const cleaned = value.replace(/\s+/g, "");
    const validPattern = /^(?:\+8801|01)[0-9]{9}$/;

    if (!validPattern.test(cleaned)) {
      setMobileError("Enter a valid Bangladeshi mobile number");
    } else {
      setMobileError("");
    }

    // Always store with +880 prefix
    const normalized = cleaned.startsWith("01")
      ? "+88" + cleaned
      : cleaned;

    onChange("mobileNumber", normalized);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-6 text-pink-600">Step 2: Family & Location</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Age */}
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => onChange("age", e.target.value)}
            className="w-full border rounded px-3 py-2"
            min="18"
            max="100"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block mb-1 font-medium">Occupation*</label>
          <select
            value={formData.occupation}
            onChange={(e) => onChange("occupation", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select occupation</option>
            <option value="Student">Student</option>
            <option value="Job">Job</option>
            <option value="Housewife">Housewife</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Race */}
        <div>
          <label className="block mb-1 font-medium">Race (Skin Color)*</label>
          <select
            value={formData.race}
            onChange={(e) => onChange("race", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select race</option>
            <option value="Fair">Fair</option>
            <option value="Wheatish">Wheatish</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        {/* Religion */}
        <div>
          <label className="block mb-1 font-medium">Religion</label>
          <select
            value={formData.religion}
            onChange={(e) => onChange("religion", e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select religion</option>
            <option value="Islam">Islam</option>
            <option value="Hindu">Hindu</option>
            <option value="Christian">Christian</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Father's Name */}
        <div>
          <label className="block mb-1 font-medium">Father's Name</label>
          <input
            type="text"
            value={formData.fatherName}
            onChange={(e) => onChange("fatherName", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block mb-1 font-medium">Mother's Name</label>
          <input
            type="text"
            value={formData.motherName}
            onChange={(e) => onChange("motherName", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Contact Email (Read-only) */}
        <div>
          <label className="block mb-1 font-medium">Contact Email</label>
          <input
            type="email"
            value={formData.contactEmail || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600"
            placeholder="Your registered email"
          />
        </div>

        {/* Mobile Number (Bangladesh format) */}
        <div>
          <label className="block mb-1 font-medium">Mobile Number*</label>
          <input
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => handleMobileChange(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          {mobileError && (
            <p className="text-sm text-red-500 mt-1">{mobileError}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
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
          onClick={nextStep}
          disabled={!!mobileError}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateBiodataModalStep2;
