import express from "express";
import {loginUser, getProfile, logoutUser} from '../controllers/login.controller.js';

const router = express.Router();
/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login user
 *     description: Endpoint to login a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '401':
 *         description: Invalid password.
 *       '404':
 *         description: Admin not found.
 *       '500':
 *         description: Error occurred during the connection.
 *
 * /api/v1/profile:
 *   get:
 *     summary: Get user profile
 *     description: Endpoint to retrieve user profile.
 *     responses:
 *       '200':
 *         description: User profile successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 id:
 *                   type: string
 *       '401':
 *         description: Unauthorized request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 * /api/v1/logout:
 *   post:
 *     summary: Logout user
 *     description: Endpoint to logout a user.
 *     responses:
 *       '200':
 *         description: User successfully logged out.
 *       '401':
 *         description: Unauthorized request.
 */


router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);
export default router;
