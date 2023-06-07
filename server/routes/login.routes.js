import express from "express";
import {loginUser,getProfile} from '../controllers/login.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/profile',getProfile)
export default router;