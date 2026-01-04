import { useEffect } from "react";
import api from "../services/api.js";
import { useState } from "react";


const AdminDashboard = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("user");
    const [users,setUsers]=useState([]);
  useEffect(() => {
    api.get("/admin/dashboard").catch(() => {
      window.location.href = "/login";
    });
  }, []);
  useEffect(()=>{
    api.get("/admin/users")
    .then(res=>setUsers(res.data.users))
    .catch(err=>alert("Failed to fetch users at admin dashboard"));
  },[]);

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
  const handleDeleteUser=async(userId)=>{
    try{
        await api.delete(`/admin/users/${userId}`);
        setUsers(users.filter(user=>user._id!==userId));
        alert("User deleted successfully by admin");
    }   
    catch(err){
        alert("User deletion failed at admin dashboard");
    }   
    };

    const handleRoleChange = async (id, role) => {
  await api.patch(`/admin/users/${id}`, { role });
  setUsers(users.map(u =>
    u._id === id ? { ...u, role } : u
  ));
};

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
      <h3 style={{ marginTop: "30px" }}>Users</h3>

<table className="user-table">
  <thead>
    <tr>
      <th>Email</th>
      <th>Role</th>
      <th>Created By</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {users.map((user) => (
      <tr key={user._id} className="user-row">
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{user.createdBy?.email || "—"}</td>
        <td>
          <div className="action-btns">
            <button
              className="btn btn-role"
              onClick={() =>
                handleRoleChange(
                  user._id,
                  user.role === "admin" ? "user" : "admin"
                )
              }
            >
              Toggle
            </button>

            <button
              className="btn btn-delete"
              onClick={() => handleDeleteUser(user._id)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>



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
