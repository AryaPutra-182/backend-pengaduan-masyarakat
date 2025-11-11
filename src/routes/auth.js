import express from 'express';
const router = express.Router();
import * as authController from '../controllers/authController.js';
import authValidators from '../validators/authValidators.js';
import { authenticate } from '../middlewares/authMiddleware.js';

// Registration route
router.post('/register', authValidators.registerValidator, authController.register);

// Login route
router.post('/login', authValidators.loginValidator, authController.login);

// Logout route
router.post('/logout', authenticate, authController.logout);

// Refresh token route
router.post('/refresh-token', authController.refreshToken);

// Forgot password route
router.post('/forgot-password', authController.forgotPassword);

// Reset password route
router.post('/reset-password', authValidators.resetPasswordValidator, authController.resetPassword);

// Get current user profile
router.get('/me', authenticate, authController.getProfile);

// Update current user profile
router.put('/me', authenticate, authValidators.updateProfileValidator, authController.updateProfile);

// Change password route
router.put('/change-password', authenticate, authValidators.changePasswordValidator, authController.changePassword);

export default router;