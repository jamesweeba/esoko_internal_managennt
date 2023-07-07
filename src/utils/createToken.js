import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const createToken = (user) => {
  const accessToken = jwt.sign({ id: user }, process.env.JWT_SECRET);
  return accessToken;
};

  