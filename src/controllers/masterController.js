import Admin from '../models/adminModel.js';
import Pengaduan from '../models/pengaduanModel.js';

// Mendapatkan daftar semua akun Admin
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json({ message: 'Berhasil mengambil data admin', data: admins });
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data admin', error: error.message });
    }
};

// Membuat akun Admin baru
export const createAdmin = async (req, res) => {
    const { nama_lengkap, username, password } = req.body;
    try {
        const newAdmin = new Admin({ nama_lengkap, username, password });
        await newAdmin.save();
        res.status(201).json({ message: 'Akun admin berhasil dibuat', data: newAdmin });
    } catch (error) {
        res.status(400).json({ message: 'Gagal membuat akun', error: error.message });
    }
};

// Memperbarui akun Admin
export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { nama_lengkap, username } = req.body;
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, { nama_lengkap, username }, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Akun admin tidak ditemukan' });
        }
        res.status(200).json({ message: 'Akun admin berhasil diperbarui', data: updatedAdmin });
    } catch (error) {
        res.status(400).json({ message: 'Gagal memperbarui akun', error: error.message });
    }
};

// Menghapus akun Admin
export const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Akun admin tidak ditemukan' });
        }
        res.status(200).json({ message: 'Akun admin berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus akun', error: error.message });
    }
};

// Approval pengaduan
export const approvePengaduan = async (req, res) => {
    const { id } = req.params;
    const { status, catatan } = req.body;
    try {
        const pengaduan = await Pengaduan.findByIdAndUpdate(id, { status, catatan }, { new: true });
        if (!pengaduan) {
            return res.status(404).json({ message: 'Pengaduan tidak ditemukan' });
        }
        res.status(200).json({ message: 'Status approval berhasil diperbarui', data: pengaduan });
    } catch (error) {
        res.status(400).json({ message: 'Gagal memperbarui status approval', error: error.message });
    }
};