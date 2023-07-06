import dotenv from 'dotenv'

dotenv.config();

const errorMiddleware = (err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!';
      console.error(err.stack);
    if (process.env.NODE_ENV === 'development') {
      res.status(errorStatus).json({
        message: errorMessage,
        error: err,
        stack: err.stack,
      });
    } else {
      res.status(errorStatus).json({ message: errorMessage });
    }
  };
  
  export default errorMiddleware;
  