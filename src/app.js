import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import createError from 'http-errors';
import userRoutes from './app/routes/user/userRoutes.js';
import authRoutes from './app/routes/auth/authRoutes.js';
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
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.get('/', (req, res) => {
  res.send({
    'version': 2
  });
});
app.use(async (req, res, next) => {
  next(createError.NotFound('this route does not exist'))
});
//error handler
app.use(errorMiddleware);
// Starting the server
app.listen(PORT,'192.168.1.125',(err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.debug(`Server listening on ${PORT}`);
});