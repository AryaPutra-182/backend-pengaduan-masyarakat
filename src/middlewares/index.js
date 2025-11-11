import authenticate, { authMiddleware, authenticate as authenticateNamed } from './authMiddleware.js';
import roleMiddleware, { roleMiddleware as roleMiddlewareNamed } from './roleMiddleware.js';
import errorHandler from './errorHandler.js';

export { authenticate, authMiddleware, authenticateNamed };
export { roleMiddleware, roleMiddlewareNamed };
export { errorHandler };

export default {
  authenticate,
  authMiddleware,
  roleMiddleware,
  errorHandler,
};
