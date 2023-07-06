import {
  validateUserExist,
  updateUser,
  findUserById,
} from "../../services/userService";
import { handleError } from "../../../utils/helper.js";

export async function getProfile({ userId }, res) {
  try {
    const user = await findUserById(userId);
    validateUserExist(user);
    return res.status(200).json({ user });
  } catch (error) {
    handleError(res, error);
  }
}

export async function updateProfile(req, res) {
  const userId = req.userId;
  const { username, email } = req.body;
  try {
    const user = await findUserById(userId);
    validateUserExist(user);
    const updatedUser = await updateUser(userId, { username, email });
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    handleError(res, error);
  }
}
