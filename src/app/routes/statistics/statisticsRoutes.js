import express from 'express';
import { getStatistics } from '../../controllers/statistics/statistics.js';

const router = express.Router();

router.get('/', getStatistics);

export default router;
