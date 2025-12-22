import User from '../models/User.js';

export const resgister=async(req,res)=>{
    try{
        const{
            email,
            password,
            role,
        }= req.body;

        const userExists=  await User.findOne({email})

    }
    catch(error){
        console.error('Error in user registration:',error.message);
        res.status(500).json({message:'Server error'});
    }
}