import prisma from '../utils/prisma.js';
import { ErrorResponse } from '../utils/responseHelper.js';

// Create a new complaint
export const createPengaduan = async (data, userId) => {
    try {
        const payload = {
            kategoriId: Number(data.kategori_id || data.kategoriId || data.kategoriId),
            judul: data.judul,
            deskripsi: data.deskripsi || data.isi || '',
            lokasi: data.lokasi || '',
            status: 'pending',
            userId: userId ? Number(userId) : undefined,
        };

        const pengaduan = await prisma.pengaduan.create({ data: payload });
        return pengaduan;
    } catch (error) {
        throw new ErrorResponse('Failed to create complaint', 500, error);
    }
};

// Get complaints by user
export const getPengaduanByUser = async (userId) => {
    try {
        const list = await prisma.pengaduan.findMany({ where: { userId: Number(userId) } });
        return list;
    } catch (error) {
        throw new ErrorResponse('Failed to retrieve complaints', 500, error);
    }
};

// Get complaint details
export const getPengaduanDetails = async (id, userId) => {
    try {
        const pengaduan = await prisma.pengaduan.findUnique({ where: { id: Number(id) } });
        if (!pengaduan || (pengaduan.userId && String(pengaduan.userId) !== String(userId))) {
            throw new ErrorResponse('Complaint not found or access denied', 404);
        }
        return pengaduan;
    } catch (error) {
        throw new ErrorResponse('Failed to retrieve complaint details', 500, error);
    }
};

export default {
    createPengaduan,
    getPengaduanByUser,
    getPengaduanDetails,
};