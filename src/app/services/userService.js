import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import createError from "http-errors";

const prisma = new PrismaClient();
export async function validateUserNotExist(email) {
  const existingUser = findUserByEmail(email)
  if (existingUser)
    throw createError.Conflict(
      "Username or email already exists. Please sign in instead"
    );
}

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function createUser({ username, email, password }) {
  await prisma.Users.create({ data: { username, email, password } });
}

export async function findUserByEmail(email) {
  return prisma.Users.findUnique({
    where: { email: email },
  });
}

export function validateUserExist(user) {
  if (!user) throw createError.NotFound();
}

export function validatePassword(password, hashedPassword) {
  const isPasswordValid = bcrypt.compareSync(password, hashedPassword);
  if (!isPasswordValid)
    throw createError.Conflict("Invalid username or password");
}

export async function findUserById(userId) {
  const user = await prisma.Users.findUnique({ where: { id: userId } });
  return user;
}

export async function updateUser(userId, data) {
  const updatedUser = await prisma.Users.update({
    where: { id: userId },
    data,
  });
  return updatedUser;
}

export function validateCurrentPassword(currentPassword, hashedPassword) {
  const isCurrentPasswordValid = bcrypt.compareSync(
    currentPassword,
    hashedPassword
  )
  if (!isCurrentPasswordValid)
    throw createError.Conflict("Invalid password");
}
