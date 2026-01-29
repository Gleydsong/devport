import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  throw new AppError("Unauthorized", 401);
}
