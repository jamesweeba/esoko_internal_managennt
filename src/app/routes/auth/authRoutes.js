import express from 'express'
import {
  register,
  login,
  changePassword,
  logout,
} from '../../controllers/auth/authController.js';
import { verifyToken } from '../../middlewares/authorization/authorizationMiddleware.js';

const router = express.Router();
// Public Routes
router.post('/register', register);
router.post('/login', login);
// Protected Routes
router.put('/password', verifyToken, changePassword);
router.post('/logout', verifyToken, logout);

export default router;
