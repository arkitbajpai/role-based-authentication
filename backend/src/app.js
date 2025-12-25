import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";
import adminRoutes from './routes/adminRoutes.js';
app.use(cookieParser());


app.use('/api/auth', authRoutes);


dotenv.config();
connectDB();

const app=express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API is running...');
});
app.use("/api/admin", adminRoutes);

const PORT= process.env.PORT || 4999;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})