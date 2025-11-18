import prisma from '../utils/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

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
    { expiresIn: '1d' }
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
      role: data.role?.toLowerCase() || 'admin',
    },
  });
};

export const updateAdmin = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  if (data.role) {
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

export const getAllUsers = async () => {
  return await prisma.user.findMany({
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

export const getAllPengaduan = async (
  page = 1,
  limit = 10,
  search = "",
  role // 1. Tambahkan 'role'
) => {
  const skip = (page - 1) * limit;
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
    // Pimpinan HANYA melihat aduan yang perlu persetujuan
    roleClause.status = { in: ['diterima', 'diproses', 'dilaksanakan'] };
  }


  return prisma.pengaduan.findMany({
    skip,
    take: limit,
    where: {
      AND: [searchClause, roleClause], 
    },
    include: {
      user: { select: { nama_lengkap: true, nik: true } },
      kategori: { select: { nama_kategori: true } },
    },
    orderBy: { id: 'desc' },
  });
};

export const countPengaduan = async (search = "", role) => {
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
export const getComplaintDetails = async (id) => {
  return await prisma.pengaduan.findUnique({
    where: { id: Number(id) },
    include: {
      user: true, 
      kategori: true,
      lampiran: true,
    },
  });
};
export const verifikasiPengaduan = async (id, status) => {
  return prisma.pengaduan.update({
    where: { id: Number(id) },
    data: {
      status: status, 
    },
  });
};

export const setujuiPengaduan = async (id, status) => {
  const aduan = await prisma.pengaduan.findUnique({
    where: { id: Number(id) },
  });

  if (aduan?.status !== 'diterima' && aduan?.status !== 'diproses') {
    throw new Error(
      "Hanya aduan yang sudah 'diterima' atau 'diproses' yang bisa disetujui."
    );
  }
  return prisma.pengaduan.update({
    where: { id: Number(id) },
    data: {
      status: status, 
    },
  });
};
export const selesaikanAduan = async (id) => {
    
    const aduan = await prisma.pengaduan.findUnique({
        where: { id: Number(id) },
        select: { status: true }
    });


    if (aduan?.status !== 'dilaksanakan') {
        throw new Error(
            `Aduan hanya bisa diselesaikan jika statusnya 'dilaksanakan'. Status saat ini: ${aduan?.status}`
        );
    }

    // 3. Update status
    return prisma.pengaduan.update({
        where: { id: Number(id) },
        data: {
            status: 'selesai', 
        },
    });
};

export const respondToComplaint = async (id, notes) => {
  return prisma.pengaduan.update({
    where: { id: Number(id) },
    data: {
      status: 'dilaksanakan', 
    },
  });
};