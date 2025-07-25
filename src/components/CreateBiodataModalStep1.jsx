import { useEffect, useState } from "react";

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
    const weights = [];
    for (let w = 35; w <= 110; w++) {
      weights.push(`${w}kg`);
    }
    return weights.sort(() => 0.5 - Math.random());
  };

  const years = Array.from({ length: 2010 - 1970 + 1 }, (_, i) => 1970 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");

  // ✅ Prefill year/month/day if dob exists
  useEffect(() => {
    if (formData.dob && typeof formData.dob === "number") {
      const date = new Date(formData.dob);
      setSelectedYear(String(date.getFullYear()));
      setSelectedMonth(String(date.getMonth() + 1));
      setSelectedDay(String(date.getDate()));
    }
  }, []);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();
      setDays(Array.from({ length: lastDay }, (_, i) => i + 1));
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const dobString = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
      const dobDate = new Date(dobString);
      const dobTimestamp = dobDate.getTime(); // ✅ convert to number

      onChange("dob", dobTimestamp); // ✅ save as number

      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }

      onChange("age", age);
    }
  }, [selectedYear, selectedMonth, selectedDay]);

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
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 font-medium">Date of Birth*</label>
          <div className="grid grid-cols-3 gap-2">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border rounded px-2 py-2"
              required
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border rounded px-2 py-2"
              required
            >
              <option value="">Month</option>
              {months.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="border rounded px-2 py-2"
              required
            >
              <option value="">Day</option>
              {days.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
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

      <div className="text-right mt-6">
        <button
          type="button"
          onClick={nextStep}
          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateBiodataModalStep1;
