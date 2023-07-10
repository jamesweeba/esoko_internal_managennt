import createError from 'http-errors'
import { createToken } from '../../../utils/createToken.js';
import { authSchema } from '../../../utils/validation_schema.js'
import {
  createUser,
  findUserById,
  findUserByUsername,
  hashPassword,
  updateUser,
  validateCurrentPassword,
  validatePassword,
  validateUserExist,
  validateUserNotExist,
} from '../../services/userService.js';

export async function register(req, res, next) {
  try {
    const { error, value } = authSchema.validate(req.body);
    if (error) throw createError.BadRequest('Invalid input field');
    const { username, password, email } = value;
    await validateUserNotExist(email);
    const hashedPassword = await hashPassword(password);
    await createUser({ username, email, password: hashedPassword });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
   if (error.isJoi === true) error.status = 422
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { error, value } = authSchema.validate(req.body);
    if (error && error.isJoi) {
      throw createError.BadRequest('Invalid username or password field');
    }
    const { username, password } = value;
    const user = await findUserByUsername(username);
    validateUserExist(user);
    validatePassword(password, user.password);
    const token = createToken(user.id);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

export async function changePassword(req, res ,next) {
  const userId = req.userId;
  try {
    const { error, value } = authSchema.validate(req.body);
    if (error) throw createError.BadRequest('Invalid input field');
    const { currentPassword, newPassword } = value;
    const user = await findUserById(userId);
    validateUserExist(user);
    validateCurrentPassword(currentPassword, user.password);
    const hashedNewPassword = await hashPassword(newPassword);
    await updateUser(userId, { password: hashedNewPassword });
    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res) {
  return res.status(200).json({ message: 'Logged out successfully' });
}
