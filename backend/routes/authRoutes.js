import express from 'express';
import { login, logout, me } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/login', login);
router.delete('/logout', logout);
router.get('/me', verifyToken, me);

export default router;