import express from 'express';
import * as notifikasiController from '../controllers/notifikasiController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, notifikasiController.getNotifikasi);
router.post('/baca-semua', authenticate, notifikasiController.markAllAsRead);
router.patch('/:id/baca', authenticate, notifikasiController.markAsRead);

export default router;