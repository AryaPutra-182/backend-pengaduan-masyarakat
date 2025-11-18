import prisma from '../utils/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

// ===============================
// 🔐 LOGIN ADMIN
// ===============================
export const loginAdmin = async (username, password) => {
  const admin = await prisma.admin.findUnique({ where: { username } });

  if (!admin) return null;

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return null;

  const token = jwt.sign(
    {
      id: admin.id,
      role: admin.role, // 'admin' / 'master_admin' / 'pimpinan'
    },
    config.JWT_SECRET,
    { expiresIn: '1d' } // Token berlaku 1 hari
  );

  return {
    token,
    admin: {
      id: admin.id,
      nama_lengkap: admin.nama_lengkap,
      username: admin.username,
      role: admin.role,
    },
  };
};

// ===============================
// 👑 ADMIN CRUD (FIXED)
// ===============================
export const getAllAdmins = async () => {
  return await prisma.admin.findMany({
    select: {
      id: true,
      nama_lengkap: true,
      username: true,
      role: true,
      createdAt: true,
    },
  });
};

export const createAdmin = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await prisma.admin.create({
    data: {
      nama_lengkap: data.nama_lengkap,
      username: data.username,
      password: hashedPassword,
      // 💥 PERBAIKAN: Enum Anda huruf kecil, gunakan toLowerCase()
      role: data.role?.toLowerCase() || 'admin',
    },
  });
};

export const updateAdmin = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  if (data.role) {
    // 💥 PERBAIKAN: Enum Anda huruf kecil, gunakan toLowerCase()
    data.role = data.role.toLowerCase();
  }

  return await prisma.admin.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteAdmin = async (id) => {
  return await prisma.admin.delete({
    where: { id: Number(id) },
  });
};

// ===============================
// 👤 USERS
// ===============================
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    // Hapus 'password' dari 'select' untuk keamanan
    select: {
      id: true,
      nama_lengkap: true,
      nik: true,
      no_hp: true,
      alamat: true,
      username: true,
      createdAt: true,
    },
  });
};

// ===============================
// 📩 LIST & SEARCH PENGADUAN (FIXED)
// ===============================
export const getAllPengaduan = async (
  page = 1,
  limit = 10,
  search = "",
  role // 1. Tambahkan 'role'
) => {
  const skip = (page - 1) * limit;

  // 2. Buat klausa 'where' dasar untuk pencarian
  const searchClause = search
    ? {
        OR: [
          // 💥 PERBAIKAN: Logika pencarian relasi yang benar
          { user: { nama_lengkap: { contains: search } } },
          { user: { nik: { contains: search } } },
          { kategori: { nama_kategori: { contains: search } } },
          { judul: { contains: search } },
        ],
      }
    : {};

  // 3. Buat klausa filter berdasarkan role
  const roleClause = {};
  if (role === 'pimpinan') {
    // Pimpinan HANYA melihat aduan yang perlu persetujuan
    roleClause.status = { in: ['diterima', 'diproses', 'dilaksanakan'] };
  }
  // Admin & Master Admin melihat semua (roleClause tetap kosong)

  return prisma.pengaduan.findMany({
    skip,
    take: limit,
    where: {
      AND: [searchClause, roleClause], // 4. Gabungkan kedua klausa
    },
    include: {
      user: { select: { nama_lengkap: true, nik: true } },
      kategori: { select: { nama_kategori: true } },
    },
    orderBy: { id: 'desc' },
  });
};

export const countPengaduan = async (search = "", role) => {
  // Logika filter yang sama seperti di atas
  const searchClause = search
    ? {
        OR: [
          { user: { nama_lengkap: { contains: search } } },
          { user: { nik: { contains: search } } },
          { kategori: { nama_kategori: { contains: search } } },
          { judul: { contains: search } },
        ],
      }
    : {};

  const roleClause = {};
  if (role === 'pimpinan') {
    roleClause.status = { in: ['diterima', 'diproses', 'dilaksanakan'] };
  }

  return prisma.pengaduan.count({
    where: {
      AND: [searchClause, roleClause],
    },
  });
};

// ===============================
// 📝 DETAIL
// ===============================
export const getComplaintDetails = async (id) => {
  return await prisma.pengaduan.findUnique({
    where: { id: Number(id) },
    include: {
      user: true, // Ambil semua data user untuk detail
      kategori: true,
      lampiran: true,
    },
  });
};

// ===============================
// ⚙ STATUS UPDATE (FIXED)
// ===============================

// 1. Ganti nama 'validateComplaint' menjadi 'verifikasiPengaduan'
export const verifikasiPengaduan = async (id, status) => {
  return prisma.pengaduan.update({
    where: { id: Number(id) },
    data: {
      status: status, // status dari req.body ('diterima', 'ditolak', 'diproses')
      // 💥 'catatan' DIHAPUS untuk menghindari error
    },
  });
};

// 2. TAMBAHKAN FUNGSI BARU 'setujuiPengaduan'
export const setujuiPengaduan = async (id, status) => {
  // Validasi: Pastikan aduan ini sudah 'diterima' atau 'diproses'
  const aduan = await prisma.pengaduan.findUnique({
    where: { id: Number(id) },
  });

  if (aduan?.status !== 'diterima' && aduan?.status !== 'diproses') {
    throw new Error(
      "Hanya aduan yang sudah 'diterima' atau 'diproses' yang bisa disetujui."
    );
  }

  // Update status menjadi 'dilaksanakan'
  return prisma.pengaduan.update({
    where: { id: Number(id) },
    data: {
      status: status, // Ini akan menjadi "dilaksanakan"
    },
  });
};
export const selesaikanAduan = async (id) => {
    // 1. Cek status saat ini
    const aduan = await prisma.pengaduan.findUnique({
        where: { id: Number(id) },
        select: { status: true }
    });

    // 2. Validasi: Hanya bisa diselesaikan jika sudah dilaksanakan
    if (aduan?.status !== 'dilaksanakan') {
        throw new Error(
            `Aduan hanya bisa diselesaikan jika statusnya 'dilaksanakan'. Status saat ini: ${aduan?.status}`
        );
    }

    // 3. Update status
    return prisma.pengaduan.update({
        where: { id: Number(id) },
        data: {
            status: 'selesai', // Status baru
        },
    });
};


// 3. Perbaiki 'respondToComplaint' (Jika Anda menggunakannya)
export const respondToComplaint = async (id, notes) => {
  return prisma.pengaduan.update({
    where: { id: Number(id) },
    data: {
      // 💥 PERBAIKAN: "selesai" tidak ada di enum, ganti jadi "dilaksanakan"
      status: 'dilaksanakan', 
      // 💥 'catatan' DIHAPUS. Jika ingin pakai, tambahkan ke schema.prisma & migrasi
      // catatan: notes
    },
  });
};