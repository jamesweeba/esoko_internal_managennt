import { PrismaClient } from "@prisma/client";
import createError from "http-errors";

const prisma = new PrismaClient();

export function validateUserExist(user) {
  if (!user) throw createError.NotFound();
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

