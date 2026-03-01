import express from 'express';
import multer from 'multer';
import path from 'path';

// Pastikan getProgramById sudah ditambahkan di baris import ini
import { 
    getPrograms, 
    getProgramById, 
    createProgram, 
    updateProgram, 
    deleteProgram 
} from '../controllers/programController.js';

import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Konfigurasi Multer (Upload)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        // Penamaan file unik berdasarkan waktu saat ini + ekstensi asli gambar
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

// --- ROUTES ---

// 1. Rute Publik (Bisa diakses tanpa login)
router.get('/', getPrograms);           // Ambil semua program (Untuk halaman utama Galeri)
router.get('/:id', getProgramById);     // Ambil detail 1 program (Untuk halaman Program Detail) <--- INI TAMBAHANNYA

// 2. Rute Terproteksi (Hanya Admin yang punya Token yang bisa akses)
router.post('/', verifyToken, upload.single('image_file'), createProgram);
router.put('/:id', verifyToken, upload.single('image_file'), updateProgram);
router.delete('/:id', verifyToken, deleteProgram);

export default router;