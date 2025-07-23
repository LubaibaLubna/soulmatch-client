import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const debounceTimeout = useRef(null);

  const fetchUsers = (query = "") => {
    setLoading(true);
    fetch(`https://ass-12-server-wheat.vercel.app/api/admin/users?search=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load users", "error");
        setUsers([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchUsers(search.trim());
    }, 300);

    return () => clearTimeout(debounceTimeout.current);
  }, [search]);

  const updateUser = async (id, updates) => {
    try {
      const res = await fetch(`https://ass-12-server-wheat.vercel.app/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const result = await res.json();
      if (res.ok) {
        Swal.fire("Success", result.message, "success");
        fetchUsers(search); // refresh list with current search term
      } else {
        Swal.fire("Error", result.error || "Failed to update user", "error");
      }
    } catch {
      Swal.fire("Error", "Failed to update user", "error");
    }
  };

  return (
    <div className="p-6 bg-white text-gray-700 rounded shadow max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-pink-700">Manage Users</h2>

      <input
        type="text"
        placeholder="Search by username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-3 py-2 border rounded w-full max-w-sm"
        autoComplete="off"
        autoFocus // Keeps input focused on page load
      />

      {loading && <p className="text-pink-600 font-semibold">Loading users...</p>}

      {!loading && users.length === 0 && search.trim() !== "" && (
        <p className="mt-4 text-red-600">No users found.</p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-pink-100">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2">Make Admin</th>
                <th className="border px-4 py-2">Make Premium</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-pink-50">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      disabled={user.role === "admin"}
                      onClick={() => updateUser(user._id, { makeAdmin: true })}
                      className={`px-3 py-1 rounded text-white ${
                        user.role === "admin"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-pink-600 hover:bg-pink-700"
                      }`}
                    >
                      {user.role === "admin" ? "Admin" : "Make Admin"}
                    </button>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      disabled={user.isPremium === true}
                      onClick={() => updateUser(user._id, { makePremium: true })}
                      className={`px-3 py-1 rounded text-white ${
                        user.isPremium
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      {user.isPremium ? "Premium" : "Make Premium"}
                    </button>
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

export default ManageUsers;
