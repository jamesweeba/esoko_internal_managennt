import {
  validateUserExist,
  updateUser,
  findUserById,
} from "../../services/user/userService.js";
import createError from 'http-errors';

export async function getProfile(req, res,next) {
  try {
    const { error, value } = authSchema.validate(req.body);
    if (error) throw createError.NotFound(error.message);
    const {userId} = value;
    const user = await findUserById(userId);
    validateUserExist(user);
    return res.status(200).json({ user });
  } catch (error) {
    console.debug(error);
    next(error);
  }
}

export async function updateProfile(req, res) {
  const userId = req.userId;
  try {
    const { error, value } = authSchema.validate(req.body);
    if (error) throw createError.Conflict();
    const { username, email } = value;
    const user = await findUserById(userId);
    validateUserExist(user);
    const updatedUser = await updateUser(userId, { username, email });
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.debug(error);
  }
}
