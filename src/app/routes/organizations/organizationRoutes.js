import express from 'express';
import { getOrganizationData } from '../../controllers/Organizations/organization.js';

const router = express.Router();
router.get('/', getOrganizationData);
export default router;
