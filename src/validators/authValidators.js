import { body, validationResult } from 'express-validator';

export const registerValidator = [
  body('nama_lengkap').notEmpty().withMessage('Nama lengkap harus diisi.'),
  body('nik').notEmpty().withMessage('NIK harus diisi.').isLength({ min: 16, max: 16 }).withMessage('NIK harus terdiri dari 16 digit.'),
  body('no_hp').notEmpty().withMessage('Nomor HP harus diisi.').isMobilePhone('id-ID').withMessage('Nomor HP tidak valid.'),
  body('alamat').notEmpty().withMessage('Alamat harus diisi.'),
  body('username').notEmpty().withMessage('Username harus diisi.'),
  body('password').notEmpty().withMessage('Password harus diisi.').isLength({ min: 8 }).withMessage('Password harus minimal 8 karakter.'),
];

export const loginValidator = [
  body('username').notEmpty().withMessage('Username harus diisi.'),
  body('password').notEmpty().withMessage('Password harus diisi.'),
];

export const resetPasswordValidator = [
  body('reset_token').notEmpty().withMessage('Token reset harus diisi.'),
  body('new_password').notEmpty().withMessage('Password baru harus diisi.').isLength({ min: 8 }).withMessage('Password baru harus minimal 8 karakter.'),
];

export const updateProfileValidator = [
  body('nama_lengkap').optional().notEmpty().withMessage('Nama lengkap tidak boleh kosong.'),
  body('no_hp').optional().isMobilePhone('id-ID').withMessage('Nomor HP tidak valid.'),
  body('alamat').optional().notEmpty().withMessage('Alamat tidak boleh kosong.'),
];

export const changePasswordValidator = [
  body('current_password').notEmpty().withMessage('Password saat ini harus diisi.'),
  body('new_password').notEmpty().withMessage('Password baru harus diisi.').isLength({ min: 8 }).withMessage('Password baru harus minimal 8 karakter.'),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error', errors: errors.array() });
  }
  next();
};

export default {
  registerValidator,
  loginValidator,
  resetPasswordValidator,
  updateProfileValidator,
  changePasswordValidator,
  validate,
};