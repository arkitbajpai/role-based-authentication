import express from 'express';
import {protedctRoute} from '../middleware/authMiddleware.js';
import{createRoom} from '../controllers/roomController.js';

const router= express.Router();
router.post("/",protedctRoute, createRoom);

export default router;
