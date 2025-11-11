import Admin from '../models/adminModel.js';
import Pengaduan from '../models/pengaduanModel.js';

export const getAllAdmins = async () => {
    try {
        return await Admin.find();
    } catch (error) {
        throw new Error('Error fetching admins: ' + error.message);
    }
};

export const createAdmin = async (adminData) => {
    try {
        const newAdmin = new Admin(adminData);
        return await newAdmin.save();
    } catch (error) {
        throw new Error('Error creating admin: ' + error.message);
    }
};

export const updateAdmin = async (id, adminData) => {
    try {
        return await Admin.findByIdAndUpdate(id, adminData, { new: true });
    } catch (error) {
        throw new Error('Error updating admin: ' + error.message);
    }
};

export const deleteAdmin = async (id) => {
    try {
        return await Admin.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error deleting admin: ' + error.message);
    }
};

export const validatePengaduan = async (id, status, catatan) => {
    try {
        return await Pengaduan.findByIdAndUpdate(id, { status, catatan }, { new: true });
    } catch (error) {
        throw new Error('Error validating pengaduan: ' + error.message);
    }
};

export const completePengaduan = async (id, catatan) => {
    try {
        return await Pengaduan.findByIdAndUpdate(id, { status: 'selesai', catatan }, { new: true });
    } catch (error) {
        throw new Error('Error completing pengaduan: ' + error.message);
    }
};

export default {
    getAllAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    validatePengaduan,
    completePengaduan,
};

// Backwards-compatible complaint-related methods expected by controllers
export const getAllComplaints = async () => {
    try {
        return await Pengaduan.find();
    } catch (error) {
        throw new Error('Error fetching complaints: ' + error.message);
    }
};

export const getComplaintDetails = async (id) => {
    try {
        return await Pengaduan.findById(id);
    } catch (error) {
        throw new Error('Error fetching complaint details: ' + error.message);
    }
};

export const validateComplaint = async (id, status, notes) => {
    // delegate to validatePengaduan
    return await validatePengaduan(id, status, notes);
};

export const respondToComplaint = async (id, notes) => {
    // store notes and optionally change status; here we mark as completed with notes
    return await completePengaduan(id, notes);
};