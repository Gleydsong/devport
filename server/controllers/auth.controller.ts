import type { NextFunction, Request, Response } from "express";
import passport from "passport";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { AppError } from "../errors";
import { createUser } from "../services/auth.service";

const registerSchema = insertUserSchema.extend({
  username: z.string().min(3),
  password: z.string().min(8),
});

function sanitizeUser(user: { id: string; username: string }) {
  return { id: user.id, username: user.username };
}

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Invalid registration payload", 400, parsed.error.flatten());
  }

  const user = await createUser(parsed.data.username, parsed.data.password);

  req.login(user, (error) => {
    if (error) {
      return next(new AppError("Failed to establish session", 500));
    }

    res.status(201).json({ user: sanitizeUser(user) });
  });
}

export function loginController(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    req.login(user, (error) => {
      if (error) {
        return next(error);
      }

      res.status(200).json({ user: sanitizeUser(user) });
    });
  })(req, res, next);
}

export function logoutController(req: Request, res: Response, next: NextFunction) {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ success: true });
  });
}

export function meController(req: Request, res: Response) {
  if (!req.user) {
    return res.status(200).json({ user: null });
  }

  res.status(200).json({ user: sanitizeUser(req.user) });
}
