import prisma from "../utils/prisma.js"; // Pastikan path ke prisma.js sudah benar

// ==========================================================
// FUNGSI STATISTIK LAPORAN (YANG BENAR)
// ==========================================================
export const getStatistics = async (role) => {
  try {
    // 1. Buat filter role, HANYA untuk pimpinan
    const roleFilter = {};
    if (role === "pimpinan") {
      // Pimpinan hanya bisa melihat status yang relevan bagi mereka
      roleFilter.status = {
        in: ["diterima", "diproses", "dilaksanakan"],
      };
    }
    // Jika rolenya 'admin' atau 'master_admin', roleFilter akan kosong (melihat semua)

    // 2. Hitung TOTAL KESELURUHAN (tanpa filter role)
    //    'total' harus selalu menunjukkan semua aduan.
    const total = await prisma.pengaduan.count({});

    // 3. Hitung sisanya MENGGUNAKAN filter role
    const pending = await prisma.pengaduan.count({
      where: { AND: [{ status: "pending" }, roleFilter] },
    });

    const diterima = await prisma.pengaduan.count({
      where: { AND: [{ status: "diterima" }, roleFilter] },
    });

    const diproses = await prisma.pengaduan.count({
      where: { AND: [{ status: "diproses" }, roleFilter] },
    });

    const dilaksanakan = await prisma.pengaduan.count({
      where: { AND: [{ status: "dilaksanakan" }, roleFilter] },
    });

    const ditolak = await prisma.pengaduan.count({
      where: { AND: [{ status: "ditolak" }, roleFilter] },
    });

    // 4. Sesuaikan dengan apa yang diharapkan frontend Anda
    //    Kartu "Diproses" di frontend Anda (laporan.proses)
    //    mungkin harusnya gabungan dari 'diterima' + 'diproses'
    const prosesGabungan = diterima + diproses;

    return {
      total: total,           // Total semua aduan
      pending: pending,       // Akan 0 untuk Pimpinan, tapi 1 (atau lebih) untuk Master Admin
      proses: prosesGabungan, // Gabungan 'diterima' dan 'diproses'
      selesai: dilaksanakan,  // Sesuai dengan 'dilaksanakan'
      ditolak: ditolak,
    };
  } catch (err) {
    console.error("Error di getStatistics:", err);
    // Kembalikan 0 jika ada error
    return { total: 0, pending: 0, proses: 0, selesai: 0, ditolak: 0 };
  }
};

// ==========================================================
// FUNGSI STATISTIK SISTEM (YANG BENAR)
// ==========================================================
export const getSystemStatistics = async () => {
  try {
    const total_users = await prisma.user.count({});
    const active_admins = await prisma.admin.count({});
    // 'categories' tidak diminta oleh frontend, jadi kita tidak hitung

    return {
      total_users: total_users,
      active_admins: active_admins,
    };
  } catch (err) {
    console.error("Error di getSystemStatistics:", err);
    return { total_users: 0, active_admins: 0 };
  }
};

// Pastikan Anda export default jika controller Anda menggunakannya
export default {
  getStatistics,
  getSystemStatistics,
};