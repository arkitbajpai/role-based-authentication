import { useEffect } from "react";
import api from "../services/api.js";
import { useState } from "react";


const AdminDashboard = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("user");
  useEffect(() => {
    api.get("/admin/dashboard").catch(() => {
      window.location.href = "/login";
    });
  }, []);


  const handelCreateUser=async(e)=>{
    e.preventDefault();
    try{
        await api.post("/admin/create-user",{
            email,
            password,
            role
        });
        alert("User created successfully by admin");
        setEmail("");
        setPassword("");
        setRole("user");
    }
    catch(err){
        alert("User creation failed at admin dashboard");
    }
    
  }


const handleLogout = async () => {
    await api.post("/auth/logout");
    window.location.href = "/login";
  };


return (
  <div className="auth-page">
    <div className="glass-card">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handelCreateUser}>
        <input
          className="auth-input"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="auth-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="primary-btn" type="submit">
          Create User
        </button>
      </form>

      <button
        style={{ marginTop: "15px", background: "transparent", color: "#fff" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </div>
);
};
export default AdminDashboard;
