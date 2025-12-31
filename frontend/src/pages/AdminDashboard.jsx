import { useEffect } from "react";
import api from "../services/api.js";


const AdminDashboard = () => {
  useEffect(() => {
    api.get("/admin/dashboard").catch(() => {
      window.location.href = "/login";
    });
  }, []);


const handleLogout = async () => {
    await api.post("/auth/logout");
    window.location.href = "/login";
  };


return(
    <div>
        <h1>Admin Dashboard1 </h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
);
};
export default AdminDashboard;
