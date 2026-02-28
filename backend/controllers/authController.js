import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Cek apakah user ada di database
        const [users] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
        if (users.length === 0) {
            return res.status(404).json({ message: "Username tidak ditemukan!" });
        }

        const user = users[0];

        // 2. Verifikasi Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password salah!" });
        }

        // 3. Buat JWT Token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 4. Set token ke HTTP-Only Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 hari
        });

        res.status(200).json({
            message: "Login berhasil",
            user: { id: user.id, username: user.username, nama: user.nama_lengkap, role: user.role }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout berhasil" });
};

// Endpoint untuk mengecek sesi (dipanggil React saat pertama kali load)
export const me = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, username, nama_lengkap, role FROM admins WHERE id = ?', [req.userId]);
        if (users.length === 0) return res.status(404).json({ message: "User tidak ditemukan" });
        
        res.status(200).json(users[0]);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};