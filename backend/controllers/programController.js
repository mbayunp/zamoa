import db from '../config/db.js';

export const getPrograms = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM programs ORDER BY created_at DESC");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data." });
    }
};

export const createProgram = async (req, res) => {
    try {
        const { title, category, caption, youtube_url } = req.body;
        // Ambil path gambar jika ada file yang diupload
        const image_url = req.file ? `/uploads/${req.file.filename}` : null;

        await db.query(
            "INSERT INTO programs (title, category, caption, image_url, youtube_url) VALUES (?, ?, ?, ?, ?)",
            [title, category, caption, image_url, youtube_url || null]
        );
        res.status(201).json({ message: "Postingan berhasil dibuat!" });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat program." });
    }
};

export const updateProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, caption, youtube_url, existing_image } = req.body;
        
        // Jika admin mengupload gambar baru, pakai yang baru. Jika tidak, tetap pakai existing_image
        const image_url = req.file ? `/uploads/${req.file.filename}` : (existing_image || null);

        await db.query(
            "UPDATE programs SET title=?, category=?, caption=?, image_url=?, youtube_url=? WHERE id=?",
            [title, category, caption, image_url, youtube_url || null, id]
        );
        res.status(200).json({ message: "Program berhasil diperbarui!" });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui program." });
    }
};

export const deleteProgram = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM programs WHERE id=?", [id]);
        res.status(200).json({ message: "Program berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus program." });
    }
};

export const getProgramById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM programs WHERE id = ?", [id]);
        
        if (rows.length === 0) return res.status(404).json({ message: "Program tidak ditemukan" });
        
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil detail program." });
    }
};