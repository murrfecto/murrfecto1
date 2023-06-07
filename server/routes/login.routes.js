import express from "express";
import {loginUser,getProfile,logoutUser} from '../controllers/login.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/profile',getProfile)
router.post('/logout',logoutUser)
export default router;