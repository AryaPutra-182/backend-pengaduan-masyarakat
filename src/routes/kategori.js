import express from 'express';
const router = express.Router();
import * as kategoriController from '../controllers/kategoriController.js';
import middlewares from '../middlewares/index.js';

const _notImplemented = (req, res) => res.status(501).json({ message: 'Not implemented' });

// Get all categories
router.get('/', kategoriController.getAllCategories);

// Create a new category
router.post('/', middlewares.authMiddleware, middlewares.roleMiddleware(['admin', 'master']), kategoriController.createCategory);

// Get category details
router.get('/:id', middlewares.authMiddleware, middlewares.roleMiddleware(['admin', 'master']), kategoriController.getCategoryById?.bind?.(kategoriController) || _notImplemented);

// Update a category
router.put('/:id', middlewares.authMiddleware, middlewares.roleMiddleware(['admin', 'master']), kategoriController.updateCategory);

// Delete a category
router.delete('/:id', middlewares.authMiddleware, middlewares.roleMiddleware(['admin', 'master']), kategoriController.deleteCategory);

export default router;