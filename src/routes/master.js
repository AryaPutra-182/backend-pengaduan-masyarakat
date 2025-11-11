import express from 'express';
const router = express.Router();
import * as masterController from '../controllers/masterController.js';
import middlewares from '../middlewares/index.js';

// Route to get all admin accounts
router.get('/admin', middlewares.authMiddleware, middlewares.roleMiddleware('masterAdmin'), masterController.getAllAdmins);

// Route to create a new admin account
router.post('/admin', middlewares.authMiddleware, middlewares.roleMiddleware('masterAdmin'), masterController.createAdmin);

// Route to update an admin account
router.put('/admin/:id', middlewares.authMiddleware, middlewares.roleMiddleware('masterAdmin'), masterController.updateAdmin);

// Route to delete an admin account
router.delete('/admin/:id', middlewares.authMiddleware, middlewares.roleMiddleware('masterAdmin'), masterController.deleteAdmin);

// Route to approve a complaint
router.patch('/pengaduan/:id/approval', middlewares.authMiddleware, middlewares.roleMiddleware('masterAdmin'), masterController.approvePengaduan);

export default router;