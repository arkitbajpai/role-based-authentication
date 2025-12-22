import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

app.use('/api/auth', authRoutes);


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