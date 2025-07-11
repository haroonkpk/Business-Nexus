import express from 'express';
import { checkAuth, getEntrepreneurs, login, logout, signup } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/checkAuth', protectedRoute, checkAuth);
router.get("/entrepreneurs", getEntrepreneurs);
export default router;