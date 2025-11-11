import NotifikasiService from '../services/notifikasiService.js';

export const getNotifikasi = async (req, res) => {
    try {
        const { status } = req.query;
        const notifikasi = await NotifikasiService.getNotifikasi?.(req.user.id, status);
        res.status(200).json(notifikasi);
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export const markAllAsRead = async (req, res) => {
    try {
        await NotifikasiService.markAllAsRead?.(req.user.id);
        res.status(200).json({ message: 'Semua notifikasi telah ditandai dibaca' });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        await NotifikasiService.markAsRead?.(req.user.id, id);
        res.status(200).json({ message: 'Notifikasi telah ditandai dibaca' });
    } catch (error) {
        if (error.message === 'Notifikasi tidak ditemukan') {
            res.status(404).json({ message: 'Notifikasi tidak ditemukan' });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
};