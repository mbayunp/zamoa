import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Mengambil token dari cookie

    if (!token) return res.status(401).json({ message: "Akses ditolak, silakan login!" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Sesi telah berakhir atau tidak valid." });
        
        req.userId = decoded.id; // Menyimpan ID user ke request untuk dipakai di controller
        next();
    });
};