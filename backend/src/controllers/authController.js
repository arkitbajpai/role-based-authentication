import User from '../models/User.js';

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
       const newUser= await create({
        email, password, role: assignedRole
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