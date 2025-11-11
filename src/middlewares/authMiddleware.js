import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/userModel.js';
import config from '../config/index.js';

export const authenticate = async (req, res, next) => {
    try {
        const header = req.headers.authorization || '';
        const token = header.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Backwards-compatible alias used in some files
export const authMiddleware = authenticate;

export default authenticate;