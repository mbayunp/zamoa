// Mock Data and Simulation APIs for Yayasan Zamoa Peduli Bangsa (Staging)

const DEFAULT_PROGRAMS = [
  {
    id: "prog_1",
    title: "Pembinaan Atlet Basket - Zamoa Sports Academy",
    category: "Olahraga",
    caption: "Program pembinaan intensif dan terukur untuk atlet basket muda potensial di Cianjur yang telah berjalan sejak tahun 2004. Kami fokus pada pelatihan teknik dasar, taktik bermain, fisik, serta pembentukan karakter dan sportivitas yang unggul.",
    image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
    youtube_url: "https://www.youtube.com/watch?v=F0p7U_F5s9Q",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
  },
  {
    id: "prog_2",
    title: "PKBM Peduli Bangsa - Kelas Kesetaraan Paket A, B, & C",
    category: "Pendidikan",
    caption: "Pusat Kegiatan Belajar Masyarakat (PKBM) Peduli Bangsa menyediakan pendidikan non-formal gratis bagi anak-anak putus sekolah dan warga belajar dewasa. Kami mendampingi mereka hingga lulus ujian kesetaraan nasional untuk masa depan yang lebih baik.",
    image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
    youtube_url: "",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  },
  {
    id: "prog_3",
    title: "Rumah Yatim Harapan Bangsa - Penyaluran Sembako & Santunan",
    category: "Sosial",
    caption: "Kegiatan rutin bulanan penyaluran bantuan pangan, pakaian layak pakai, dan dana santunan pendidikan untuk anak-anak asuh di Rumah Yatim Harapan Bangsa. Bantuan ini mendukung kesejahteraan hidup mereka sehari-hari.",
    image_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    youtube_url: "",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: "prog_4",
    title: "Renovasi Asrama Zamoa - Kenyamanan untuk Anak Yatim",
    category: "Umum",
    caption: "Proyek perbaikan fasilitas asrama mencakup pengecatan ulang, perbaikan atap bocor, serta pengadaan tempat tidur dan meja belajar baru. Diharapkan asrama ini dapat menjadi tempat tinggal yang aman dan nyaman bagi anak-anak asuh.",
    image_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    youtube_url: "",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() // 15 days ago
  }
];

const DEFAULT_DONASI = [
  {
    id: "don_1",
    nama_donatur: "Meidy Prasetyadi",
    no_whatsapp: "081234567890",
    nominal: "2500000",
    program_pilihan: "Umum (Operasional Yayasan)",
    pesan: "Semoga berkah dan bermanfaat untuk operasional yayasan.",
    status: "diterima",
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "don_2",
    nama_donatur: "Hamba Allah",
    no_whatsapp: "089876543210",
    nominal: "500000",
    program_pilihan: "Beasiswa Yatim Berprestasi",
    pesan: "Khusus untuk biaya sekolah adik-adik yatim.",
    status: "pending",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "don_3",
    nama_donatur: "Keluarga TB. M. Ma'mun",
    no_whatsapp: "087711223344",
    nominal: "1500000",
    program_pilihan: "Renovasi Asrama Zamoa",
    pesan: "Semoga pembangunan berjalan dengan lancar.",
    status: "diterima",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Helper Functions to access localStorage
const getStoredPrograms = () => {
  const data = localStorage.getItem("zamoa_programs");
  if (!data) {
    localStorage.setItem("zamoa_programs", JSON.stringify(DEFAULT_PROGRAMS));
    return DEFAULT_PROGRAMS;
  }
  return JSON.parse(data);
};

const setStoredPrograms = (programs) => {
  localStorage.setItem("zamoa_programs", JSON.stringify(programs));
};

const getStoredDonasi = () => {
  const data = localStorage.getItem("zamoa_donasi");
  if (!data) {
    localStorage.setItem("zamoa_donasi", JSON.stringify(DEFAULT_DONASI));
    return DEFAULT_DONASI;
  }
  return JSON.parse(data);
};

const setStoredDonasi = (donasi) => {
  localStorage.setItem("zamoa_donasi", JSON.stringify(donasi));
};

// --- AUTH API SIMULATIONS ---
export const mockLogin = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin_zamoa" && password === "admin123") {
        localStorage.setItem("zamoa_admin_logged_in", "true");
        localStorage.setItem("zamoa_admin_user", JSON.stringify({ nama: "Super Admin", username: "admin_zamoa" }));
        resolve({ data: { user: { nama: "Super Admin", username: "admin_zamoa" } } });
      } else {
        reject(new Error("Username atau password salah."));
      }
    }, 1000);
  });
};

export const mockLogout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("zamoa_admin_logged_in");
      localStorage.removeItem("zamoa_admin_user");
      resolve({ status: 200 });
    }, 800);
  });
};

export const mockCheckAuth = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const loggedIn = localStorage.getItem("zamoa_admin_logged_in") === "true";
      if (loggedIn) {
        const user = JSON.parse(localStorage.getItem("zamoa_admin_user") || "{}");
        resolve({ status: 200, data: { user } });
      } else {
        reject(new Error("Unauthorized"));
      }
    }, 400);
  });
};

// --- PROGRAMS API SIMULATIONS (CMS) ---
export const mockGetPrograms = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: getStoredPrograms() });
    }, 600);
  });
};

export const mockGetProgramById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const programs = getStoredPrograms();
      const program = programs.find((p) => p.id === id);
      if (program) {
        resolve({ data: program });
      } else {
        reject(new Error("Program tidak ditemukan."));
      }
    }, 500);
  });
};

export const mockCreateProgram = async (programForm) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const programs = getStoredPrograms();
      
      let imageUrl = programForm.image_preview || "https://images.unsplash.com/photo-159027615-cd4628902d4a?q=80&w=800";
      
      const newProgram = {
        id: "prog_" + Date.now(),
        title: programForm.title,
        category: programForm.category,
        caption: programForm.caption,
        image_url: imageUrl,
        youtube_url: programForm.youtube_url || "",
        created_at: new Date().toISOString()
      };
      
      const updated = [newProgram, ...programs];
      setStoredPrograms(updated);
      resolve({ data: newProgram });
    }, 1000);
  });
};

export const mockUpdateProgram = async (id, programForm) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const programs = getStoredPrograms();
      const index = programs.findIndex((p) => p.id === id);
      
      if (index === -1) {
        reject(new Error("Program tidak ditemukan"));
        return;
      }
      
      let imageUrl = programForm.image_preview || programs[index].image_url;
      
      const updatedProgram = {
        ...programs[index],
        title: programForm.title,
        category: programForm.category,
        caption: programForm.caption,
        image_url: imageUrl,
        youtube_url: programForm.youtube_url || ""
      };
      
      const updated = [...programs];
      updated[index] = updatedProgram;
      setStoredPrograms(updated);
      resolve({ data: updatedProgram });
    }, 1000);
  });
};

export const mockDeleteProgram = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const programs = getStoredPrograms();
      const index = programs.findIndex((p) => p.id === id);
      
      if (index === -1) {
        reject(new Error("Program tidak ditemukan"));
        return;
      }
      
      const updated = programs.filter((p) => p.id !== id);
      setStoredPrograms(updated);
      resolve({ data: { success: true } });
    }, 800);
  });
};

// --- DONASI API SIMULATIONS ---
export const mockGetDonasi = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: getStoredDonasi() });
    }, 600);
  });
};

export const mockCreateDonasi = async (donasiForm) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const donasiList = getStoredDonasi();
      
      const newDonasi = {
        id: "don_" + Date.now(),
        nama_donatur: donasiForm.nama_donatur || "Hamba Allah",
        no_whatsapp: donasiForm.no_whatsapp,
        nominal: donasiForm.nominal.toString(),
        program_pilihan: donasiForm.program_pilihan,
        pesan: donasiForm.pesan || "",
        status: "pending",
        created_at: new Date().toISOString()
      };
      
      const updated = [newDonasi, ...donasiList];
      setStoredDonasi(updated);
      resolve({ data: newDonasi });
    }, 1000);
  });
};

export const mockUpdateDonasiStatus = async (id, status) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const donasiList = getStoredDonasi();
      const index = donasiList.findIndex((d) => d.id === id);
      
      if (index === -1) {
        reject(new Error("Data donasi tidak ditemukan."));
        return;
      }
      
      const updatedDonasi = {
        ...donasiList[index],
        status: status
      };
      
      const updated = [...donasiList];
      updated[index] = updatedDonasi;
      setStoredDonasi(updated);
      resolve({ data: updatedDonasi });
    }, 800);
  });
};
