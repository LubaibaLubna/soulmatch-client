import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
import CreateBiodataModalStep1 from "../../components/CreateBiodataModalStep1";
import CreateBiodataModalStep2 from "../../components/CreateBiodataModalStep2";
import CreateBiodataModalStep3 from "../../components/CreateBiodataModalStep3";
;

const BiodataForm = ({ initialData = null, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    profileImage: "",
    dob: "",
    height: "",
    weight: "",
    age: "",
    occupation: "",
    race: "",
    fatherName: "",
    motherName: "",
    permanentDivision: "",
    presentDivision: "",
    expectedPartnerAge: "",
    expectedPartnerHeight: "",
    expectedPartnerWeight: "",
    contactEmail: "", // from Firebase or initialData
    mobileNumber: "",
    religion: "",
    education: "",
    isPremium: false,
  });

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        contactEmail: user.email,
        ...initialData, // if editing, override with saved data
      }));
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!formData.profileImage) {
      Swal.fire("Error", "Profile Image is required", "error");
      return;
    }

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const method = initialData ? "PUT" : "POST";
      const url = initialData
        ? `https://ass-12-server-wheat.vercel.app/api/biodatas/${initialData._id}`
        : "https://ass-12-server-wheat.vercel.app/api/biodatas";

      const res = await fetch(url, {
        method,
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire("Success", `Biodata ${initialData ? "updated" : "created"} successfully!`, "success");
        onSuccess && onSuccess();
      } else {
        Swal.fire("Error", data.error || "Something went wrong", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to submit biodata", "error");
    }
  };

  return (
    <div className="w-full text-gray-700">
      {step === 1 && (
        <CreateBiodataModalStep1
          formData={formData}
          onChange={handleChange}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <CreateBiodataModalStep2
          formData={formData}
          onChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <CreateBiodataModalStep3
          formData={formData}
          onChange={handleChange}
          prevStep={prevStep}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default BiodataForm;
