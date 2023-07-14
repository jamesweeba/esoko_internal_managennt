import express from 'express';
import { getProfile, updateProfile} from '../../controllers/users/userController.js';
import { verifyToken } from '../../middlewares/authorization/authorizationMiddleware.js';

const router = express.Router();
router.get('/profile:id', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

export default router;
