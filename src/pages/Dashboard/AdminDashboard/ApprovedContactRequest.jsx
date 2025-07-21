import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ApprovedContactRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/admin/contact-requests")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to fetch contact requests", "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/approve-contact/${id}`, {
        method: "PATCH",
      });

      const result = await res.json();
      if (res.ok) {
        Swal.fire("Success", result.message, "success");
        fetchRequests();
      } else {
        Swal.fire("Error", result.error, "error");
      }
    } catch {
      Swal.fire("Error", "Failed to approve request", "error");
    }
  };

  if (loading) {
    return <p className="text-center text-pink-600 py-6">Loading contact requests...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-600 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-pink-700">Approved Contact Request</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No contact requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-pink-100">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Biodata ID</th>
                <th className="border px-4 py-2 text-center">Approve</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-pink-50">
                  <td className="border px-4 py-2">{req.requesterName}</td>
                  <td className="border px-4 py-2">{req.requesterEmail}</td>
                  <td className="border px-4 py-2">{req.biodataId}</td>
                  <td className="border px-4 py-2 text-center">
                    {req.status === "approved" ? (
                      <span className="text-green-600 font-semibold">Approved</span>
                    ) : (
                      <button
                        onClick={() => handleApprove(req._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Approve Contact
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedContactRequest;
