import bcrypt from 'bcryptjs';
import db from './config/db.js';

const seed = async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.query(
        "INSERT INTO admins (username, password, nama_lengkap, role) VALUES (?, ?, ?, ?)",
        ['admin', hashedPassword, 'Administrator Zamoa', 'superadmin']
    );
    console.log("Admin berhasil dibuat!");
    process.exit();
};

seed();