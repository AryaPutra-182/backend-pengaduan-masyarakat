import express from 'express';
const router = express.Router();
import fileController from '../controllers/fileController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

// Upload file attachment for a specific complaint
router.post('/:id/lampiran', authMiddleware, fileController);

// Download a specific file attachment
router.get('/:id/lampiran/:fileId', authMiddleware, fileController);

export default router;