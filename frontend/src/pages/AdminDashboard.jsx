import { useEffect } from "react";
import api from "../services/api.js";


const AdminDashboard = () => {
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


return(
    <div>
        <h1>Admin Dashboard1 </h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
);
};
export default AdminDashboard;
