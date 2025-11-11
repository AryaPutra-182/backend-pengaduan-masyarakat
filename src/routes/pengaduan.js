import express from 'express';
const router = express.Router();
import * as pengaduanController from '../controllers/pengaduanController.js';
import { authMiddleware, authenticate } from '../middlewares/authMiddleware.js';
import pengaduanValidators from '../validators/pengaduanValidators.js';

const _notImplemented = (req, res) => res.status(501).json({ message: 'Not implemented' });

// Route to submit a new complaint
router.post('/', authMiddleware, pengaduanValidators.createPengaduan, pengaduanController.createPengaduan);

// Route to get the user's complaint history
router.get('/saya', authMiddleware, pengaduanController.getPengaduanSaya);

// Route to get details of a specific complaint
router.get('/saya/:id', authMiddleware, pengaduanController.getPengaduanDetail);

// Route to get responses for a specific complaint
router.get('/:id/tanggapan', authMiddleware, pengaduanController.getTanggapanPengaduan?.bind?.(pengaduanController) || _notImplemented);

// Route to upload an attachment for a complaint
router.post('/:id/lampiran', authMiddleware, pengaduanController.uploadLampiran?.bind?.(pengaduanController) || _notImplemented);

// Route to download a specific attachment
router.get('/:id/lampiran/:fileId', authMiddleware, pengaduanController.downloadLampiran?.bind?.(pengaduanController) || _notImplemented);

export default router;