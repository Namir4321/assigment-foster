import jwt from 'jsonwebtoken';
import env from '../config/env.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please provide a valid token.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    if (!payload.sub) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token: missing subject.',
      });
    }

    req.employeeId = payload.sub;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.name === 'TokenExpiredError'
        ? 'Token has expired. Please log in again.'
        : 'Invalid or malformed token.',
    });
  }
};

export default authMiddleware;
