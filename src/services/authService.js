import UserModel from '../models/userModel.js';
import jwt from '../utils/jwt.js';
import bcrypt from 'bcryptjs';
import { ErrorResponse } from '../utils/responseHelper.js';

export const register = async (userData) => {
    const { username, password, ...rest } = userData;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
        throw new ErrorResponse('Username already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword, ...rest });
    await newUser.save();

    return newUser;
};

export const login = async (credentials) => {
    const { username, password } = credentials;
    const user = await UserModel.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new ErrorResponse('Invalid username or password', 401);
    }

    const token = jwt.signToken(user._id);
    return { user, token };
};

export const logout = async (userId) => {
    // Implement logout logic if needed (e.g., token invalidation)
    return { message: 'Logout successful' };
};

export const refreshToken = async (token) => {
    const decoded = await jwt.verifyToken(token);
    if (!decoded) {
        throw new ErrorResponse('Invalid token', 401);
    }

    const newToken = jwt.signToken(decoded.id);
    return { token: newToken };
};

export const resetPassword = async (resetData) => {
    const { reset_token, new_password } = resetData;
    // Placeholder: implement reset token verification if applicable
    const userId = null;

    if (!userId) {
        throw new ErrorResponse('Invalid or expired reset token', 400);
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });

    return { message: 'Password successfully reset' };
};

export const updateProfile = async (userId, profileData) => {
    await UserModel.findByIdAndUpdate(userId, profileData);
    return { message: 'Profile successfully updated' };
};

export const changePassword = async (userId, passwords) => {
    const { current_password, new_password } = passwords;
    const user = await UserModel.findById(userId);

    if (!user || !(await bcrypt.compare(current_password, user.password))) {
        throw new ErrorResponse('Current password is incorrect', 400);
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });

    return { message: 'Password successfully changed' };
};

export default {
    register,
    login,
    logout,
    refreshToken,
    resetPassword,
    updateProfile,
    changePassword,
};