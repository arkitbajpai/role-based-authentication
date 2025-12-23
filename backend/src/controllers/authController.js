import User from '../models/User.js';
import byrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const resgister=async(req,res)=>{
    try{
        const{
            email,
            password,
            role,
        }= req.body;

         const adminExists = await User.exists({ role: "admin" });
          let assignedRole = "user";
       if(!adminExists){
            if(email=process.env.ADMIN_EMAIL ){
                assignedRole="admin";
             }
             else{
              return res.status(400).json({ message: 'Admin user already exists' });  
              }
            }else{
         assignedRole = role === "admin" ? "admin" : "user";
       }
       const salt= await byrypt.genSalt(10);
        const hashedPassword= await byrypt.hash(password,salt);
       const newUser= await create({
        email, password:hashedPassword, role: assignedRole
       });
       res.status(201).json({
        message: 'User registered successfully',
        user:{
            id:newUser._id, 
            email:newUser.email,
            role:newUser.role,
        }
       });

    }
    catch(error){
        console.error('Error during user registration:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

export const Login =async(req,res)=>{

const {email,password}=req.body;
try{
    const user = await user.findOne({email});
    if(!user){
        return res.status(400).json({message:'Invalid credentials'});
    }
    const isMatch= await byrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:'Invalid credentials'});
    }
    // Generate JWT token
    const token=jwt.sign({
        userId:user._id,
        role:user.role,
    },
    process.env.JWT_SECRET,
    {expiresIn:process.env.JWT_EXPIRES_IN}
    );
    res.status(200).json({
        message:'Login successful',
        user:{
            id:user._id,
            email:user.email,
            role:user.role,
        }
    });
} catch(error){
    console.error('Error during user login:', error.message);
    res.status(500).json({message:'Server error'});
}
}