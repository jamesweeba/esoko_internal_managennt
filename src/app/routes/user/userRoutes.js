import express from 'express';
import { getProfile, updateProfile} from '../../controllers/user/userController.js';
import { verifyToken } from '../../middlewares/authorization/authorizationMiddleware.js';

const router = express.Router();
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

export default router;