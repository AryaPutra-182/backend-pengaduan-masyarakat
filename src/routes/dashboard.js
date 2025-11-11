import express from 'express';
const router = express.Router();
import * as dashboardController from '../controllers/dashboardController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

// Route to get statistics for admins
router.get('/statistik-laporan', authMiddleware, dashboardController.getStatistics);

// Route to get system statistics for master admins
router.get('/statistik-sistem', authMiddleware, dashboardController.getSystemStatistics);

export default router;