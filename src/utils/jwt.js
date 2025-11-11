import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import config from '../config/index.js';

export const signToken = (userId) => {
  return jwt.sign({ id: userId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

export const verifyToken = async (token) => {
  const verify = promisify(jwt.verify.bind(jwt));
  return await verify(token, config.JWT_SECRET);
};

export default {
  signToken,
  verifyToken,
};