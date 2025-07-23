import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ApprovedPremium = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/pending-premiums");
      const data = await res.json();
      setPending(data);
    } catch {
      setPending([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Make Premium?",
      text: "This biodata will be marked as premium.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/approve-premium/${id}`, {
          method: "PATCH",
        });

        const result = await res.json();
        if (res.ok) {
          Swal.fire("Success", result.message, "success");
          fetchPending(); // Refresh after approval
        } else {
          Swal.fire("Error", result.error || "Approval failed", "error");
        }
      } catch {
        Swal.fire("Error", "Server error", "error");
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-pink-700 mb-6">Pending Premium Requests</h2>

      {loading ? (
        <p className="text-pink-600">Loading...</p>
      ) : pending.length === 0 ? (
        <p className="text-gray-500">No premium request found.</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm text-gray-700">
          <thead className="bg-pink-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Biodata ID</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((biodata) => (
              <tr key={biodata._id} className="hover:bg-pink-50">
                <td className="border px-4 py-2">{biodata.name}</td>
                <td className="border px-4 py-2">{biodata.contactEmail}</td>
                <td className="border px-4 py-2">{biodata.biodataId}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleApprove(biodata._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Make Premium
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovedPremium;
