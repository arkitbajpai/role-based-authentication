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
            cretatedBy: req.user._id
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