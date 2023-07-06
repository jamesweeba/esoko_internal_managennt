import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const createToken = (user) => {
  const accessToken = jwt.sign({ id: user }, process.env.JWT_SECRET);
  return accessToken;
};

export function handleError(res, error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
}
  