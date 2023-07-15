import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import createError from 'http-errors';
import userRoutes from './app/routes/user/userRoutes.js';
import authRoutes from './app/routes/auth/authRoutes.js';
import organizationRoutes from './app/routes/organizations/organizationRoutes.js';
import statisticsRoutes from './app/routes/statistics/statisticsRoutes.js';
import transactionRoutes from './app/routes/transactions/transactionRoutes.js';
import errorMiddleware from './app/middlewares/error/errorMiddleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
// Middleware
app.use(express.json()); 
app.use(morgan('common')); 
app.use(helmet()); 
app.use(cors());
// Routes
// app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
// app.use('/api/organization', organizationRoutes);
// app.use('/api/statistics', statisticsRoutes);
// app.use('/api/transaction', transactionRoutes);
app.get('/', (req, res) => {
  res.send({
    'version': 2
  });
});
//error handler
app.use(async (req, res, next) => {
  next(createError.NotFound('this route does not exist'))
});
app.use(errorMiddleware);
// Starting the server
// '192.168.1.125'
app.listen(PORT, (err) => {
  if (err) {
    console.debug(err);
    return;
  }
  console.log(`Server listening on ${PORT}`);
});