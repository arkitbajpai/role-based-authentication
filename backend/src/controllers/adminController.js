import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const createUserByAdmin = async (req, res) => { 
    try{
        const { email, password, role } = req.body;
     if(!email || !password){
        return res.status(400).json({ message: "Email and password required" });
     }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({    
            email,  
            password: hashedPassword,  
            role: role === "admin" ? "admin" : "user",
            createdBy: req.user._id
        });
        res.status(201).json({
            message: "User created successfully by admin",
            user: {
              id: user._id, 
                email: user.email,
                role: user.role
            }
        });
    }
    catch(error){
        console.error("Admin create user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllUsers=async(req,res)=>{
    try{
        const users = await User.find().select("-password").populate('createdBy','email role');
        res.status(200).json({ users });

    }catch(error){

        console.error("Get all users error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUserByAdmin=async(req,res)=>{
    try{
        const userId=req.params.id;
        if(userId===req.user._id.toString()){
            return res.status(400).json({ message: "Admin cannot delete self sorry " });
        }
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully by admin" });
    }
    catch(error){
        console.error("Delete user by admin error:", error);
    }
};

export const changeUserRole=async(req,res)=>{
    try{
        const userId=req.params.id;
        const { role }=req.body;
        if(userId===req.user._id.toString()){
            return res.status(400).json({ message: "Admin cannot update self" });
        }
        const updatedUser=await User.findByIdAndUpdate(
            userId,
            { role: role === "admin" ? "admin" : "user" },  
            { new: true }
        ).select("-password");
        res.status(200).json({
            message: "User role updated successfully by admin",
            user: updatedUser
        });
    } catch(error){
        console.error("Update user role by admin error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
     };