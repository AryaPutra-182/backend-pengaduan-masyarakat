import pengaduanService from '../services/pengaduanService.js';

export const createPengaduan = async (req, res) => {
    try {
        const newPengaduan = await pengaduanService.createPengaduan(req.body, req.user?.id);
        res.status(201).json({
            message: 'Pengaduan berhasil dikirim',
            data: newPengaduan,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Gagal mengirim pengaduan',
            errors: error.errors || [error.message],
        });
    }
};

export const getPengaduanSaya = async (req, res) => {
    try {
        const pengaduanList = await pengaduanService.getPengaduanByUser?.(req.user?.id);
        res.status(200).json({
            message: 'Berhasil mengambil riwayat pengaduan',
            data: pengaduanList,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Gagal mengambil riwayat pengaduan',
            errors: error.errors || [error.message],
        });
    }
};

export const getPengaduanDetail = async (req, res) => {
    try {
        const pengaduanDetail = await pengaduanService.getPengaduanDetails?.(req.params.id, req.user?.id);
        res.status(200).json({
            message: 'Berhasil mengambil detail pengaduan',
            data: pengaduanDetail,
        });
    } catch (error) {
        if (error.name === 'NotFoundError') {
            res.status(404).json({
                message: 'Pengaduan tidak ditemukan',
            });
        } else {
            res.status(400).json({
                message: 'Gagal mengambil detail pengaduan',
                errors: error.errors || [error.message],
            });
        }
    }
};