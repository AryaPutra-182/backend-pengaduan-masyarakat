import express from 'express';
const router = express.Router();
import * as adminController from '../controllers/adminController.js';
import middlewares from '../middlewares/index.js';

// Get all complaints
router.get('/pengaduan', middlewares.authMiddleware, middlewares.roleMiddleware(['admin', 'master']), adminController.getAllComplaints);

// Get specific complaint details
router.get('/pengaduan/:id', middlewares.authMiddleware, middlewares.roleMiddleware(['admin', 'master']), adminController.getComplaintDetails);

// Validate a complaint
router.patch('/pengaduan/:id/validasi', middlewares.authMiddleware, middlewares.roleMiddleware(['admin']), adminController.validateComplaint);

// Complete a complaint
router.post('/pengaduan/:id/selesaikan', middlewares.authMiddleware, middlewares.roleMiddleware(['admin']), adminController.respondToComplaint);

// Add response to a complaint
router.post('/pengaduan/:id/tanggapan', middlewares.authMiddleware, middlewares.roleMiddleware(['admin', 'master']), adminController.respondToComplaint);

export default router;