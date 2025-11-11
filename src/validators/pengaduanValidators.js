import { body, param } from 'express-validator';

export const pengaduanValidators = {
  createPengaduan: [
    body('kategori_id')
      .isInt().withMessage('Kategori ID harus berupa angka.')
      .notEmpty().withMessage('Kategori ID tidak boleh kosong.'),
    body('judul')
      .isString().withMessage('Judul harus berupa teks.')
      .notEmpty().withMessage('Judul tidak boleh kosong.'),
    body('deskripsi')
      .isString().withMessage('Deskripsi harus berupa teks.')
      .notEmpty().withMessage('Deskripsi tidak boleh kosong.'),
    body('lokasi')
      .isString().withMessage('Lokasi harus berupa teks.')
      .notEmpty().withMessage('Lokasi tidak boleh kosong.'),
  ],

  getPengaduanById: [
    param('id')
      .isInt().withMessage('ID harus berupa angka.')
      .notEmpty().withMessage('ID tidak boleh kosong.'),
  ],
};

export default pengaduanValidators;