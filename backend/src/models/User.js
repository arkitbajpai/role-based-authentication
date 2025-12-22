import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    email:{
        type :String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,  
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null,

    }

},
{timestamps:true}
)

export default mongoose.model('User',userSchema);