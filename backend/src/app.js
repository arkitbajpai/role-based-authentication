import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';


dotenv.config();
connectDB();

const app=express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API is running...');
});

const PORT= process.env.PORT || 4999;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})