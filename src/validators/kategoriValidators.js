import { body, param } from 'express-validator';

export const kategoriValidators = {
  createKategori: [
    body('nama_kategori')
      .notEmpty()
      .withMessage('Nama kategori harus diisi.')
      .isString()
      .withMessage('Nama kategori harus berupa string.'),
    body('deskripsi')
      .optional()
      .isString()
      .withMessage('Deskripsi harus berupa string.'),
  ],

  updateKategori: [
    param('id')
      .isInt()
      .withMessage('ID kategori harus berupa angka.'),
    body('nama_kategori')
      .optional()
      .notEmpty()
      .withMessage('Nama kategori harus diisi.')
      .isString()
      .withMessage('Nama kategori harus berupa string.'),
    body('deskripsi')
      .optional()
      .isString()
      .withMessage('Deskripsi harus berupa string.'),
  ],

  deleteKategori: [
    param('id')
      .isInt()
      .withMessage('ID kategori harus berupa angka.'),
  ],
};

export default kategoriValidators;