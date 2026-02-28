import db from '../config/db.js';

// [PUBLIK] - Kirim form donasi baru
export const createDonasi = async (req, res) => {
    try {
        const { nama_donatur, no_whatsapp, nominal, program_pilihan, pesan } = req.body;
        
        const query = "INSERT INTO donasi (nama_donatur, no_whatsapp, nominal, program_pilihan, pesan) VALUES (?, ?, ?, ?, ?)";
        await db.query(query, [nama_donatur, no_whatsapp, nominal, program_pilihan, pesan]);
        
        res.status(201).json({ message: "Terima kasih! Data donasi berhasil dicatat." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal menyimpan data donasi." });
    }
};

// [ADMIN] - Ambil semua data donasi
export const getDonasi = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM donasi ORDER BY created_at DESC");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data." });
    }
};

// [ADMIN] - Update status donasi (pending/diterima/ditolak)
export const updateStatusDonasi = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await db.query("UPDATE donasi SET status = ? WHERE id = ?", [status, id]);
        res.status(200).json({ message: `Status berhasil diubah menjadi ${status}` });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate status." });
    }
};