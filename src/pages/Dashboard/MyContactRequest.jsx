import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

const MyContactRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const userEmail = auth.currentUser?.email;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/contact-requests?email=${userEmail}`);
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) fetchRequests();
  }, [userEmail]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this contact request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/contact-requests/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setRequests((prev) => prev.filter((r) => r._id !== id));
          Swal.fire("Deleted!", "Request deleted successfully", "success");
        } else {
          Swal.fire("Error", "Failed to delete request", "error");
        }
      } catch {
        Swal.fire("Error", "Server error while deleting", "error");
      }
    }
  };

  if (loading) {
    return <p className="text-center py-10 text-pink-600 font-medium">Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Contact Requests</h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full min-w-[600px] text-sm text-left text-gray-700">
          <thead className="bg-pink-100 text-pink-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Biodata ID</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Mobile No</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{req.biodata?.name || "N/A"}</td>
                <td className="px-6 py-4">{req.biodata?.biodataId || "N/A"}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      req.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {req.status === "approved" ? req.biodata?.mobileNumber : "---"}
                </td>
                <td className="px-6 py-4">
                  {req.status === "approved" ? req.biodata?.contactEmail : "---"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No contact requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactRequest;
