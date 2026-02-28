import express from 'express';
import { createDonasi, getDonasi, updateStatusDonasi } from '../controllers/donasiController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Rute Publik (Siapa saja bisa donasi)
router.post('/', createDonasi);

// Rute Terproteksi (Hanya admin yang sudah login bisa lihat dan ubah status)
router.get('/', verifyToken, getDonasi);
router.put('/:id/status', verifyToken, updateStatusDonasi);

export default router;