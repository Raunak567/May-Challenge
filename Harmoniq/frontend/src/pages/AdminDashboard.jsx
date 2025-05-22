import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react"; // ✅ added useAuth

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useUser();
  const { getToken } = useAuth(); // ✅ Clerk auth token
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = await getToken(); // ✅ Get a valid session token

        const response = await fetch("/api/admin/check", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Correct token now
          },
        });

        const data = await response.json();
        setIsAdmin(data.admin);

        if (!data.admin) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/");
      }
    };

    if (user) {
      checkAdminStatus();
    }
  }, [user, navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Songs</h2>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
            Add New Song
          </button>
        </div>
        <div className="bg-zinc-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Albums</h2>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
            Add New Album
          </button>
        </div>
        <div className="bg-zinc-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
            View Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
