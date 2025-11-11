import PengaduanModel from '../models/pengaduanModel.js';
import UserModel from '../models/userModel.js';
import ResponseHelper, { ErrorResponse } from '../utils/responseHelper.js';

// Create a new complaint
export const createPengaduan = async (data, userId) => {
    try {
        const pengaduan = new PengaduanModel({
            ...data,
            user: userId,
            status: 'pending',
        });
        await pengaduan.save();
        return pengaduan;
    } catch (error) {
        throw new ErrorResponse('Failed to create complaint', 500, error);
    }
};

// Get complaints by user
export const getPengaduanByUser = async (userId) => {
    try {
        const pengaduanList = await PengaduanModel.find({ user: userId });
        return pengaduanList;
    } catch (error) {
        throw new ErrorResponse('Failed to retrieve complaints', 500, error);
    }
};

// Get complaint details
export const getPengaduanDetails = async (id, userId) => {
    try {
        const pengaduan = await PengaduanModel.findById(id);
        if (!pengaduan || pengaduan.user.toString() !== userId) {
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