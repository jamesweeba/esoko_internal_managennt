import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import createError from "http-errors";

const prisma = new PrismaClient();

export async function findUserByEmail(email) {
  try {
    return await prisma.users.findUnique({
      where: { email: email },
    });
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw createError.InternalServerError('Failed to find user');
  }
}

export async function validateUserNotExist(email) {
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw createError.Conflict(
        'Username or email already exists. Please sign in instead'
      );
    }
  } catch (error) {
    console.error('Error validating user:', error);
    throw createError.InternalServerError('Failed to validate user');
  }
}

export async function hashPassword(password) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw createError.InternalServerError('Failed to hash password');
  }
}

export async function createUser({ username, email, password }) {
  const uuid = uuidv4();
  try {
    await prisma.users.create({
      data: {
        uuid,
        username,
        email,
        password,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw createError.InternalServerError('Failed to create user');
  }
}

export function validateUserExist(user) {
  if (!user) {
    throw createError.NotFound();
  }
}

export function validatePassword(password, hashedPassword) {
  const isPasswordValid = bcrypt.compareSync(password, hashedPassword);
  if (!isPasswordValid) {
    throw createError.Conflict("Invalid username or password");
  }
}

export async function findUserById(userId) {
  try {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    return user;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw createError.InternalServerError('Failed to find user by ID');
  }
}

export async function updateUser(userId, data) {
  try {
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data,
    });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw createError.InternalServerError('Failed to update user');
  }
}

export function validateCurrentPassword(currentPassword, hashedPassword) {
  const isCurrentPasswordValid = bcrypt.compareSync(
    currentPassword,
    hashedPassword
  );
  if (!isCurrentPasswordValid) {
    throw createError.Conflict("Invalid password");
  }
}
