import { storage } from "../storage";
import type { User } from "@shared/schema";
import { AppError } from "../errors";
import { hashPassword, verifyPassword } from "../utils/passwords";

export async function createUser(
  username: string,
  password: string
): Promise<User> {
  const existing = await storage.getUserByUsername(username);
  if (existing) {
    throw new AppError("Username already in use", 409);
  }

  const hashedPassword = await hashPassword(password);
  return storage.createUser({ username, password: hashedPassword });
}

export async function validateUser(
  username: string,
  password: string
): Promise<User | null> {
  const user = await storage.getUserByUsername(username);
  if (!user) return null;

  const isValid = await verifyPassword(user.password, password);
  if (!isValid) return null;

  return user;
}

export async function getUserById(id: string): Promise<User | undefined> {
  return storage.getUser(id);
}
