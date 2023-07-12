import express from 'express';
import { getTransactionData } from '../../controllers/transactions/transaction.js';

const router = express.Router();

router.get('/', getTransactionData);

export default router;
