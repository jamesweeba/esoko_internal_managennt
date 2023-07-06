import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to verify the access token
export const verifyToken = (req, res, next) => {
  const token = extractTokenFromHeader(req.headers.authorization);

  try {
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = verifyAccessToken(token);
    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid access token' });
    }

    attachUserAndAuthFlagToRequest(decodedToken.id, req);
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

function extractTokenFromHeader(authorizationHeader) {
  if (!authorizationHeader) {
    return null;
  }

  const bearerArray = authorizationHeader.split(' ');
  if (bearerArray.length !== 2 || bearerArray[0] !== 'Bearer') {
    return null;
  }

  return bearerArray[1];
}

function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

function attachUserAndAuthFlagToRequest(userId, req) {
  req.userId = userId;
  req.authenticated = true;
}

export const authorize = (role) => {
  return function (req, res, next) {
    const { role: userRole } = req.user;

    if (userRole !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};

