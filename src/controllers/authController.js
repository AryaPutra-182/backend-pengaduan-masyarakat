import authService from '../services/authService.js';
import { validationResult } from 'express-validator';

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: 'Registration successful', data: user });
    } catch (error) {
        res.status(400).json({ message: 'Registration failed', errors: error.message });
    }
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const result = await authService.login(req.body);
        res.status(200).json({ message: 'Login successful', data: result });
    } catch (error) {
        res.status(401).json({ message: 'Login failed', errors: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        await authService.logout(req.user);
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(401).json({ message: 'Logout failed', errors: error.message });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const token = await authService.refreshToken(req.body.refresh_token);
        res.status(200).json({ message: 'Token refreshed successfully', data: token });
    } catch (error) {
        res.status(401).json({ message: 'Token refresh failed', errors: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        await authService.forgotPassword?.(req.body.username_or_email);
        res.status(200).json({ message: 'Password reset instructions sent' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to send reset instructions', errors: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        await authService.resetPassword(req.body);
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(400).json({ message: 'Password reset failed', errors: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await authService.getProfile?.(req.user.id);
        res.status(200).json({ message: 'Profile retrieved successfully', data: user });
    } catch (error) {
        res.status(401).json({ message: 'Failed to retrieve profile', errors: error.message });
    }
};

export const updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const user = await authService.updateProfile(req.user.id, req.body);
        res.status(200).json({ message: 'Profile updated successfully', data: user });
    } catch (error) {
        res.status(401).json({ message: 'Failed to update profile', errors: error.message });
    }
};

export const changePassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        await authService.changePassword(req.user.id, req.body);
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to change password', errors: error.message });
    }
};