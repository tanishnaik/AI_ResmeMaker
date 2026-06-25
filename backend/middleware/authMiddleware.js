import User from '../models/User.js';
import { verifyToken } from '../utils/generateToken.js';

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) return res.status(401).json({ message: 'Not authorized, token missing.' });

    const payload = verifyToken(token);
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Not authorized, user not found.' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message || 'Not authorized.' });
  }
}

