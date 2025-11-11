import kategoriService from '../services/kategoriService.js';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await kategoriService.getAllCategories();
        res.status(200).json({
            message: 'Berhasil mengambil daftar kategori',
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal mengambil daftar kategori',
            errors: error.message,
        });
    }
};

export const createCategory = async (req, res) => {
    try {
        const newCategory = await kategoriService.createCategory(req.body);
        res.status(201).json({
            message: 'Kategori baru berhasil ditambahkan',
            data: newCategory,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Gagal menambahkan kategori',
            errors: error.message,
        });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCategory = await kategoriService.updateCategory(id, req.body);
        res.status(200).json({
            message: 'Kategori berhasil diperbarui',
            data: updatedCategory,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Kategori tidak ditemukan',
            errors: error.message,
        });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await kategoriService.deleteCategory(id);
        res.status(200).json({
            message: 'Kategori berhasil dihapus',
        });
    } catch (error) {
        res.status(404).json({
            message: 'Kategori tidak ditemukan',
            errors: error.message,
        });
    }
};

export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await kategoriService.getCategoryById(id);
        res.status(200).json({ message: 'Berhasil mengambil kategori', data: category });
    } catch (error) {
        res.status(404).json({ message: 'Kategori tidak ditemukan', errors: error.message });
    }
};