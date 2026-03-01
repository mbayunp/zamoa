import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

// 1. Import Routes
import authRoutes from './routes/authRoutes.js';
import donasiRoutes from './routes/donasiRoutes.js';
import programRoutes from './routes/programRoutes.js'; // <--- PASTIKAN INI ADA

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Folder publik untuk akses gambar
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 2. Daftarkan Routes
app.use('/api/auth', authRoutes);
app.use('/api/donasi', donasiRoutes);
app.use('/api/programs', programRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});