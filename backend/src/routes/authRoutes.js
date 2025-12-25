import express from 'express';
import {register,Login} from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router= express.Router();
router.post('/register', register);
router.post('/login', Login);
// router.get("/dashboard",authMiddleware, (req, res) => {
//   res.status(200).json({ message: `Welcome to the dashboard, ${req.user.email}` });
// });
export default router