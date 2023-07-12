import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import createError from "http-errors";

dotenv.config();
export const createToken = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
  return accessToken;
};


