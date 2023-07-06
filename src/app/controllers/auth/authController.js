import { createToken, handleError } from '../../../utils/helper.js';
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

export async function register(req, res) {
  let { username, password, email } = req.body;
  try {
    await validateUserNotExist(email);
    const hashedPassword = await hashPassword(password);
    await createUser({ username, email, password: hashedPassword });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    handleError(res, error);
  }
}

export async function login(req, res) {
  let { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    validateUserExist(user);
    validatePassword(password, user.password);
    const token = createToken(user.id);
    return res.status(200).json({ token });
  } catch (error) {
    console.log('Error during login:', error);
    handleError(res, error);
  }
}

export async function changePassword(req, res) {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;
    const user = await findUserById(userId);
    validateUserExist(user);
    validateCurrentPassword(currentPassword, user.password);
    const hashedNewPassword = await hashPassword(newPassword);
    await updateUser(userId, { password: hashedNewPassword });
    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    handleError(res, error);
  }
}

export function logout(req, res) {
  return res.status(200).json({ message: 'Logged out successfully' });
}
